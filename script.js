const body = document.body;

const getRGBColor = (element, propertyName) => {
	return window
	.getComputedStyle(element)
	.getPropertyValue(propertyName)
	.match(/\d+/g)
	.map(Number);
}

const [red, green, blue] = getRGBColor(body, "--main-color");

const [redSun, greenSun, blueSun] = getRGBColor(body, "--sun-color");

const blackOrWhite = function (red, green, blue) {
	let brightness = red * 299 + green * 587 + blue * 114;
	brightness = brightness / 255000;
	if (brightness >= 0.5) {
		return "black";
	} else {
		return "white";
	}
};

const changedColor = (start, end, percentage) => {
	const channels = ['r', 'g', 'b'];
	return channels.map(channel => start[channel] + (end[channel] - start[channel]) * percentage);
}

const startColor = {r: red, g: green, b: blue};
const endColor = {r: 6, g: 20, b: 41};
const startColorSun = {r: redSun, g: greenSun, b: blueSun};
const endColorSun = {r: 250, g: 141, b: 69};
let maxScroll = body.scrollHeight - window.innerHeight;

window.addEventListener('resize', () => {
	maxScroll = body.scrollHeight - window.innerHeight;
})

window.addEventListener("scroll", () => {
	const scrollPosition = window.scrollY;

	const scrollPercentage = Math.min(scrollPosition / maxScroll, 1);

	const [r, g, b] = changedColor(startColor, endColor, scrollPercentage);

	const [rSun, gSun, bSun] = changedColor(startColorSun, endColorSun, scrollPercentage*2);

	body.style.setProperty('--y-coordinate', Math.round(scrollPosition/1.5)+'px');
	body.style.setProperty('--sun-color', `rgb(${rSun}, ${gSun}, ${bSun})`);
	body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

	body.style.color = blackOrWhite(r, g, b);
});

const justAppendNewImage = (query, imgSrc) => {
	const parentNode = document.querySelector(query);
	const img = document.createElement('img');
	img.src = imgSrc;
	img.alt = '';
	parentNode.appendChild(img);
}

const insertImgAfterNode = (query, imgSrc) => {
	const referenceNode = document.querySelector(query);
	const img = document.createElement('img');
	img.src = imgSrc;
	img.alt = '';
	referenceNode.parentNode.insertBefore(img, referenceNode.nextSibling);
}

justAppendNewImage('#introduction', 'images/winter.svg');
insertImgAfterNode('#science h2', 'images/globe.svg');
insertImgAfterNode('#northern-hemisphere h3', 'images/campfire.svg');
justAppendNewImage('#southern-hemisphere', 'images/dance.svg');