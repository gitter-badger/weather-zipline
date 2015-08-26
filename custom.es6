window.addEventListener('load', () => {
	if (!localStorage.hasOwnProperty('units')) {
		localStorage.setItem('units', 'imperial');
	}
	var weather = new OpenWeatherMap(localStorage.getItem('units'));
	weather.getFromCoords(data => {
		var system = localStorage.getItem('units') === 'imperial' ? 'F' : 'C';
		var main = document.querySelector('main');
		var city = document.createElement('h3');
		var temp = document.createElement('samp');
		temp.textContent = `Current temperature: ${data.main.temp.toFixed(1)}°${system}`;
		city.textContent = `Current weather in ${data.name}`;
		main.appendChild(city);
		main.appendChild(temp);
		console.dir(data);
	});
});
