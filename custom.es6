window.addEventListener('load', () => {
	if (!localStorage.hasOwnProperty('units')) {
		localStorage.setItem('units', 'imperial');
	}
	var weather = new OpenWeatherMap(localStorage.getItem('units'));
	weather.getFromCoords(data => {
		var main = document.querySelector('main');
		var city = document.createElement('div');
		var temp = document.createElement('div');
		var sky = document.createElement('div');
		var wind = document.createElement('div');
		var dir = OpenWeatherMap.getDirectionFromDegree(data.wind);
		temp.appendChild(OpenWeatherMap.getIcon(data.weather[0]));
		temp.appendChild(document.createTextNode(`${data.main.temp.toFixed(1)}°${weather.units.temp}`));
		city.appendChild(document.createTextNode(data.name));
		sky.appendChild(document.createTextNode(`Current conditions: ${data.weather[0].description}`));
		wind.appendChild(document.createTextNode(`${data.wind.speed}${weather.units.speed} ${dir}`));
		main.appendChild(temp);
		main.appendChild(city);
		main.appendChild(sky);
		main.appendChild(wind);
		console.dir(data);
	});
});
