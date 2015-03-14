I've recently started a MTGO account and have been enjoying myself immensely.  I haven't played Magic in over 15 years and I feel like I never left.  That being said, I am still re-learning how to build decks and have been absorbing as much as I can.  It's not easy though because I don't know the cards like I used to (of course not, there's thousands of them now).

One of the things I noticed from reading both official and unofficial Magic site is that when describing a deck, there seems to be a standard format.  Simply list the cards and then provide links to either Gatherer or one of the trading websites for the actual card information.  To me, this interface was clunky and could use some Web 2.0 action.  So I borrowed an idea from a World of Warcaft community site called Wowhead.com, and built a script that would provide the card images from Gatherer when you hover over the links; effictively creating Card Tooltips, or "Cardtips".

At the core of this project was the need to leverage a simple database with all of the cards in it, specifically storing the Gatherer's multiverse ID for each card, as well as the name of the set and card.  The script then leverages this database by accessing a JSON-based web service (currently hosted at Google App Engine) that provides the multiverse ID for a card given that it is wrapped in an anchor tag and affixed a CSS class of "cardtip".  This attaches a mouseover event to the hyperlink on the page that will render the card image right next to the link.

Websites that want to include this functionality would simply have to include a reference to my script somewhere on their page:

```
<script type="text/javascript" 
src="http://domain-to-be-determined.com/cardtips.js">
</script>
```

...and then make sure their hyperlinks include the class attribute "cardtip":

```
<a href="http://wherever.com" class="cardtip">Serra Angel</a>
```