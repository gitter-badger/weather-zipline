/**
 * Class for getting weather data using OpenWeatherMap
 * @see http://openweathermap.org/current
 */
class OpenWeatherMap {
	constructor(version = 2.5) {
		let url = new URL(`http://api.openweathermap.org/data/${version}/weather`);
		let headers = new Headers();
		this.getLocation().then(location => {
			console.log(location);
			url.searchParams.set('lat', location.coords.latitude);
			url.searchParams.set('lon', location.coords.longitude);
			fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers
			}).then(resp => {
				if (resp.ok) {
					let type = resp.headers.get('Content-Type').toLowerCase();
					if (type.startsWith('application/json')) {
						return resp.json();
					} else {
						throw new Error(`Unsupported Content-Type: ${type}`);
					}
				} else {
					throw new Error(`${resp.status}: ${resp.statusText}`);
				}
			}).then(data => {
				let main = document.querySelector('main');
				let city = document.createElement('h2');
				let pre = document.createElement('pre');
				let temp = document.createElement('samp');
				temp.textContent = `Current temperature: ${OpenWeatherMap.getTemp(data.main.temp).toFixed(1)}°`;
				city.textContent = `Current weather in ${data.name}`;
				pre.textContent = JSON.stringify(data);
				main.appendChild(city);
				main.appendChild(temp);
				main.appendChild(pre);
				console.dir(data);
			});
		}).catch(err => console.error(err));
	}

	static getTemp(temp, to = 'Fahrenheit', from = 'Kelvin') {
		if (from === to) {
			return temp;
		} else {
			switch(to) {
				case 'Fahrenheit':
					switch(from) {
						case 'Kelvin':
							return (temp - 273.15) * 1.8 + 32;

						case 'Celsius':
							return temp * 1.8 + 32;
					}
				case 'Celsius':
					switch(from) {
						case 'Fahrenheit':
							return (temp - 32) / 1.8;

						case 'Kelvin':
							return temp + 273.15;
					}
				case 'Kelvin':
					switch(from) {
						case 'Fahrenheit':
							return (temp - 32) / 1.8 + 273.15;

						case 'Celsius':
							return temp + 273.15;
					}
			}
		}
	}

	getLocation(options = {}) {
		return new Promise(function(success, fail) {
			if (!('geolocation' in navigator)) {
				fail('Your browser does not support GeoLocation');
			}
			navigator.geolocation.getCurrentPosition(success, fail, options);
		});
	}
}
