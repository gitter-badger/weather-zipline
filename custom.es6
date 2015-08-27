NodeList.prototype.filter = Array.prototype.filter;
NodeList.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.map = Array.prototype.map;
function $(selector) {
	return document.querySelectorAll(selector);
}
function updateWeather() {
	var weather = new OpenWeatherMap(localStorage.getItem('units'));
	var main = document.querySelector('main');
	while (main.hasChildNodes()) {
		main.firstChild.remove();
	}
	weather.getFromCoords(data => {
		var city = document.createElement('div');
		var temp = document.createElement('div');
		var sky = document.createElement('div');
		var wind = document.createElement('div');
		var dir = OpenWeatherMap.getDirectionFromDegree(data.wind);
		var container = document.createElement('div');
		temp.appendChild(OpenWeatherMap.getIcon(data.weather[0]));
		temp.appendChild(document.createTextNode(`${data.main.temp.toFixed(1)}°${weather.units.temp}`));
		city.appendChild(document.createTextNode(data.name));
		sky.appendChild(document.createTextNode(`Sky is ${data.weather[0].main}`));
		wind.appendChild(document.createTextNode(`${dir} ${data.wind.speed} ${weather.units.speed}`));
		temp.classList.add('temp');
		temp.classList.add('flex');
		temp.classList.add('center');
		container.classList.add('flex');
		container.classList.add('center');
		[city, sky, wind].forEach(el => {
			el.classList.add('tile');
			container.appendChild(el);
		});
		main.appendChild(temp);
		main.appendChild(container);
		document.body.dataset.cond = data.weather[0].main.toLowerCase();
	});
}

window.addEventListener('load', () => {
	document.documentElement.classList.remove('loading');
	if (!localStorage.hasOwnProperty('units')) {
		localStorage.setItem('units', 'imperial');
	}
	$('.toggle').map(button => {
		button.addEventListener('click', event => {
			event.target.disabled = true;
			localStorage.setItem('units', event.target.dataset.value);
			updateWeather();
			event.target.parentElement.querySelectorAll('.toggle').filter(toggle => {
				return toggle !== event.target;
			}).forEach(btn => {
				btn.disabled = false;
			});
		});
		return button;
	}).filter(button => {
		return button.dataset.value !== localStorage.getItem('units');
	}).forEach(button => {
		button.disabled = false;
	});
	updateWeather();
});
