(function(){
const setbanner = (msg, x, y) => {
	let banner = document.querySelector('#banner');

	if (msg === '') {
		banner.style.display = 'none'
	} else {
		banner.style.display = 'initial'
	}
	banner.querySelector('span').innerText = msg;
	let textwidth = banner.querySelector('span').offsetWidth;
	if (x + textwidth > screen.width) { x = (screen.width - textwidth) - 50;}
	banner.style.top = y + "px";
	banner.style.left = x + "px";
}
const seteventhandlers = () => {
	let elements = document.querySelector('#elements');

	let interactiveNodes = Array.from(elements.querySelectorAll(['path','polygon','g']))

	let nodesToBeProcessed = interactiveNodes.filter((el, index) => {
		return el.getAttribute('id') !== null;
	})

	nodesToBeProcessed.map((el) => {
		let coordinates = el.getBoundingClientRect()
		let info = information[el.id]

		let setAccessibleEventHandler = (ev) => {
			ev.preventDefault();
			setbanner(info, parseInt(coordinates.x) + parseInt(coordinates.width), parseInt(coordinates.top))
		}

		let resetbanner = (ev) => {
			ev.preventDefault();
			setbanner('', 0, 0)
		}

		el.setAttribute('tabindex', '0')
		el.setAttribute('aria-label', info)

		el.addEventListener('focus', setAccessibleEventHandler)
		el.addEventListener('blur', resetbanner)

	})
}
const handleselect = (ev) => {
	if (['path','polygon','g'].indexOf(ev.target.nodeName.toLowerCase()) !== -1){
		setbanner((information[ev.target.id]), ev.pageX, ev.pageY);
		ev.preventDefault();
	}
};
const init = () => {
	seteventhandlers();
}
init();
})();