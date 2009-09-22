jQuery(function($) {
	alert('i work inside the jquery');
  $(".cardtip").hover(
    function (e) {
	  var obj = $(this);
	  
	  
	  var Cardtip
	  
	  $WowheadPower.registerItem('28288', 0, {
			name_enus: 'Abacus of Violent Odds',
			quality: 3,
			icon: 'INV_Misc_EngGizmos_18',
			tooltip_enus: '<table><tr><td><b class="q3">Abacus of Violent Odds</b><br /><!--bo-->Binds when picked up<br />Unique-Equipped<br />Trinket<!--e--><!--ps--><br />Requires Level 70<br />Item Level 115</td></tr></table><table><tr><td><span class="q2">Equip: Increases attack power by 64.</span><br /><span class="q2">Use: Increases haste rating by 260 for 10 sec. (2 Min Cooldown)</span><br />Sell Price: <span class="moneygold">1</span> &nbsp;</td></tr></table>'
		});
	  
	  
	  $.getJSON("/cardtip", {n: $(this).text()}, function(data) {
	    obj.after("<div class=\"cardtip-hover\"><img src=\"http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + data.id +"&type=card\" /></div>");
	    $(".cardtip-hover").css( { 'display':'none', 'position':'relative', 'left':'150px', 'top':'-10' } );
	    $(".cardtip-hover").fadeIn(500);
	  });
	},
	function (e) {
	  $(".cardtip-hover").remove();
	});
});

alert('i work outside the jquery');