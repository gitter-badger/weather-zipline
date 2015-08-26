/**
 * Class for getting weather data using OpenWeatherMap
 * @see http://openweathermap.org/current
 */
class OpenWeatherMap {
	constructor(units = 'imperial', lang = 'en', version = 2.5) {
		this.units = units;
		this.url = new URL(`http://api.openweathermap.org/data/${version}/weather`);
		this.url.searchParams.set('units', units);
		this.url.searchParams.set('lang', lang);
	}

	getFromCoords(callback = data => {console.log(data)}) {
		OpenWeatherMap.getLocation().then(location => {
			this.url.searchParams.set('lat', location.coords.latitude);
			this.url.searchParams.set('lon', location.coords.longitude);
			fetch(this.url, {
				method: 'GET',
				mode: 'cors'
			}).then(resp =>  this.parseResponse(resp)).then(callback);
		}).catch(err => {
			console.error(err);
		});
	}

	getFromCity(city, callback = data => console.log(data)) {
		this.url.searchParams.set('q', city);
		fetch(this.url, {
			method: 'GET',
			mode: 'cors'
		}).then(resp =>  this.parseResponse(resp)).then(callback).catch(err => {
			console.error(err);
		});
	}

	getFromZip(zip, callback = data => console.log(data)) {
		this.url.searchParams.set('zip', `${zip},us`);
		fetch(this.url, {
			method: 'GET',
			mode: 'cors'
		}).then(resp =>  this.parseResponse(resp)).then(callback).catch(err => {
			console.error(err);
		});
	}

	getFromID(id, callback = data => console.log(data)) {
		this.url.searchParams.set('id', id);
		fetch(this.url, {
			method: 'GET',
			mode: 'cors'
		}).then(resp =>  this.parseResponse(resp)).then(callback).catch(err => {
			console.error(err);
		});
	}

	parseResponse(resp) {
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

	static getLocation(options = {}) {
		return new Promise(function(success, fail) {
			if (!('geolocation' in navigator)) {
				fail('Your browser does not support GeoLocation');
			}
			navigator.geolocation.getCurrentPosition(success, fail, options);
		});
	}
}
