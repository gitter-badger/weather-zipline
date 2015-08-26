window.addEventListener('load', () => {
	if (!localStorage.hasOwnProperty('units')) {
		localStorage.setItem('units', 'imperial');
	}
	new OpenWeatherMap(localStorage.getItem('units'));
});
