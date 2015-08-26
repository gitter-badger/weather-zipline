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
		temp.appendChild(OpenWeatherMap.getIcon(data.weather[0]));
		temp.appendChild(document.createTextNode(`${data.main.temp.toFixed(1)}°${weather.units.temp}`));
		city.appendChild(document.createTextNode(data.name));
		sky.appendChild(document.createTextNode(`Sky is ${data.weather[0].main}`));
		wind.appendChild(document.createTextNode(`${dir} ${data.wind.speed} ${weather.units.speed}`));
		temp.classList.add('temp');
		[city, sky, wind].forEach(el => {
			el.classList.add('tile');
		});
		main.appendChild(temp);
		main.appendChild(city);
		main.appendChild(sky);
		main.appendChild(wind);
		switch(data.weather[0].main.toLowerCase) {
			default:
				document.body.dataset.cond = 'clear';
		}
		console.dir(data);
	});
}

window.addEventListener('load', () => {
	if (!localStorage.hasOwnProperty('units')) {
		localStorage.setItem('units', 'imperial');
	}
	document.getElementById('switch-units').addEventListener('click', event => {
		switch (localStorage.getItem('units')) {
			case 'imperial':
				localStorage.setItem('units', 'metric');
				break;

			case 'metric':
				localStorage.setItem('units', 'imperial');
				break;
		}
		updateWeather();
	});
	updateWeather();
});
