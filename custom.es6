window.addEventListener('load', () => {
	if (!localStorage.hasOwnProperty('units')) {
		localStorage.setItem('units', 'imperial');
	}
	var weather = new OpenWeatherMap(localStorage.getItem('units'));
	weather.getFromCoords(showWeather);
});
function showWeather(data) {
	var system = localStorage.getItem('units') === 'imperial' ? 'F' : 'C';
	var main = document.querySelector('main');
	var city = document.createElement('div');
	var temp = document.createElement('div');
	var sky = document.createElement('div');
	var wind = document.createElement('div');
	temp.textContent = `Current temperature: ${data.main.temp.toFixed(1)}°${system}`;
	city.textContent = data.name;
	sky.textContent = `Current conditions: ${data.weather[0].description}`;
	wind.textContent = `${data.wind.speed} ${data.wind.deg}°`;
	temp.appendChild(OpenWeatherMap.getIcon(data.weather[0]));
	main.appendChild(temp);
	main.appendChild(city);
	main.appendChild(sky);
	main.appendChild(wind);
	console.dir(data);
}
