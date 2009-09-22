var $Cardtips = new function() {
  this.registerCard = function (card) {
    if($Cardtips.cache === undefined){
      $Cardtips.cache = {};
    }
    $Cardtips.setCard(card);
    $Cardtips.hoverShow(card.name);
  };
  this.getCard = function (name) {
    return $Cardtips.cache[name];
  };
  this.setCard = function (card) {
    $Cardtips.cache[card.name] = card;
    //console.log("cached card: %s (%s) cache-entry: %o", card.name, typeof(card.name), card);
  };
  this.hoverLoad = function (evt) {
    var sourceElement;
    if(document.all) {
        sourceElement = evt.srcElement; // for IE
    } else {
        sourceElement = evt.target;
    }
    // build placeholder card
    $Cardtips.placeholder.style.cssText = "background-color: #000; border: 2px solid #ccc; color: #fff; position: absolute; top: "+sourceElement.offsetTop+"px; left: "+ (sourceElement.offsetLeft  + sourceElement.offsetWidth + 50) +"px; height: 310px; width: 223px; visibility: visible; display: inline;";
    sourceElement.parentNode.insertBefore($Cardtips.placeholder, sourceElement);
    var elements = document.getElementsByTagName("script");
    var found = false;
    for (var i=0;i<elements.length;i++) {
      var elem = elements[i];
      // tiger uppercut
      if(elem.type === "text/javascript") {
        //alert(sourceElement.innerHTML);
        /*
        var x1 = "http://cardtips.appspot.com/cardtip?n="+sourceElement.innerHTML;
        var x2 = elem.src;
        if(x1 === x2) {

        }
        */
        //if(elem.src === "http://cardtips.appspot.com/cardtip?n="+escape(sourceElement.innerHTML)) {
        if(elem.src === "http://cardtips.appspot.com/cardtip?n="+escape(sourceElement.innerHTML)) {
          found = true;
          break;
        }
      }
    }
    if(!found) {
      var e = document.createElement("script");
      e.src = "http://cardtips.appspot.com/cardtip?n="+sourceElement.innerHTML;
      e.type="text/javascript";
      document.getElementsByTagName("head")[0].appendChild(e);
    } else {
      $Cardtips.hoverShow(sourceElement.innerHTML);
    }
  };
  this.hoverShow = function (name) {
    var imgElements = document.getElementsByTagName("img");
    for (var i=0;i<imgElements.length;i++) {
        var e = imgElements[i];
        if(e.id.indexOf("cardtip-") > -1) {
            if(document.all) {
                e.style.display = "none";
                e.style.visibility = "hidden";
            } else {
                e.style.cssText = "display: none; visibility: hidden;";
            }
        }
    }
    var placeHolderElement = document.getElementById("cardtip-placeholder");
    var elements = document.getElementsByTagName("a");
    for (var i=0;i<elements.length;i++) {
      var elem = elements[i];
      if(elem.innerHTML === name) {
        var obj = null;
        //console.log("card: %s (%s) cache-entry: %o", name, typeof($Cardtips.cache[name]), $Cardtips.cache[name]);
        if(typeof($Cardtips.cache[name]) !== "undefined") {
          obj = document.getElementById("cardtip-" + $Cardtips.cache[name].id);
        }
        if(obj === null) { // does this exist yet in the DOM?
          if(typeof($Cardtips.cache[name]) !== "undefined") {
              var ct = document.createElement("img");
              try {
                ct.src = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid="+$Cardtips.cache[name].id+"&type=card";
              } catch (ex) { 
                //console.log("exception: %s", ex);
              }
              ct.id = "cardtip-" + $Cardtips.cache[name].id;
              ct.style.cssText = "position: absolute; top: "+elem.offsetTop+"px; left: "+ (elem.offsetLeft + elem.offsetWidth + 50) +"px; height: 310px; width: 223px; visibility: visible; display: inline;";
              elem.parentNode.insertBefore(ct, elem);
          }
        } else {
          if(obj.id !== "cardtip-placeholder") {
            obj.style.cssText = "position: absolute; top: "+elem.offsetTop+"px; left: "+ (elem.offsetLeft + elem.offsetWidth + 50) +"px; height: 310px; width: 223px; visibility: visible; display: inline;";
          }
        }
        try {
            if(document.all) {
                document.getElementById(placeHolderElement.id).removeNode(true);
            } else {
                elem.parentNode.removeChild(placeHolderElement);
            }
        }catch(e){
            // do nothing; if we tried to eliminate the placeholder and it's already gone, that's ok
        }
      }
    }
  };
  this.fadeOut = function (evt) {
    var sourceElement;
    if(document.all) {
        sourceElement = evt.srcElement;
    } else {
        sourceElement = evt.target;
    }
    var card = $Cardtips.cache[sourceElement.innerHTML];
    if(card !== undefined) { // not sure why this is needed yet
      var id = $Cardtips.cache[sourceElement.innerHTML].id;
      var element = document.getElementById("cardtip-" + id);
      if (element !== null) {  // placeholder will be null
        if(document.all) {
            element.style.display = "none";
            element.style.visibility = "hidden";
        } else {
            element.style.cssText = "display: none; visibility: hidden;";
        }
      }
    }
  };
};
$Cardtips.cache = {};
$Cardtips.placeholder = document.createElement("div");
$Cardtips.placeholder.id = "cardtip-placeholder";
$Cardtips.placeholder.innerHTML = "Loading ...";
//$Cardtips.cache["cardtip-placeholder"] = { "id" : "cardtip-placeholder", "set" : "na", "name":"cardtip-placeholder"};

var cardLinks = document.getElementsByTagName("a");
for (var i=0;i<cardLinks.length;i++) {
  var elem = cardLinks[i];
  if(elem.className === "cardtip") {
    if(elem.attachEvent) {
        elem.attachEvent('onmouseover', $Cardtips.hoverLoad);
        elem.attachEvent('onmouseout', $Cardtips.fadeOut);
    } else {
        elem.addEventListener('mouseover', $Cardtips.hoverLoad, false);
        elem.addEventListener('mouseout', $Cardtips.fadeOut, false);
    }
  }
}