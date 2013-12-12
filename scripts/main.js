var deck = bespoke.horizontal.from('article', {
  bullets: 'li, .bullet',
  progress: true,
  state: true,
  hash: true
});

deck.on('activate',bgColor);

function bgColor() {

	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	document.body.style.background = color;

}