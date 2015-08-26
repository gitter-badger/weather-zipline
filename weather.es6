/**
 * Class for getting weather data using OpenWeatherMap
 * @see http://openweathermap.org/current
 */
class OpenWeatherMap {
	/**
	 * Creates new instance and sets class properties
	 *
	 * @param  {string}                   imperial or metric
	 * @param  {string}                   language code
	 * @param  {float}                    API version number
	 */
	constructor(units = 'imperial', lang = 'en', version = 2.5) {
		this.url = new URL(`http://api.openweathermap.org/data/${version}/weather`);
		this.url.searchParams.set('units', units);
		this.url.searchParams.set('lang', lang);
	}

	/**
	 * Get weather using GeoLocation API
	 *
	 * @param  {callable} callback     Callback to call with response
	 *
	 * @return {void}
	 */
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

	/**
	 * Get weather using city name
	 *
	 * @param  {string}   city             City name to get weather for
	 * @param  {callable} callback         Callback to call with response
	 *
	 * @return {void}
	 */
	getFromCity(city, callback = data => console.log(data)) {
		this.url.searchParams.set('q', city);
		fetch(this.url, {
			method: 'GET',
			mode: 'cors'
		}).then(resp =>  this.parseResponse(resp)).then(callback).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Get weather from zip code
	 *
	 * @param  {integer}  zip      Zip code
	 * @param  {[type]}   callback Callback to call with response
	 *
	 * @return {void}
	 */
	getFromZip(zip, callback = data => console.log(data)) {
		this.url.searchParams.set('zip', `${zip},us`);
		fetch(this.url, {
			method: 'GET',
			mode: 'cors'
		}).then(resp =>  this.parseResponse(resp)).then(callback).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Get weather from city ID
	 *
	 * @param  {integer} id       City ID number
	 * @param  {[type]}  callback Callback to call with response
	 *
	 * @return {void}
	 */
	getFromID(id, callback = data => console.log(data)) {
		this.url.searchParams.set('id', id);
		fetch(this.url, {
			method: 'GET',
			mode: 'cors'
		}).then(resp =>  this.parseResponse(resp)).then(callback).catch(err => {
			console.error(err);
		});
	}

	/**
	 * Parse response from fetch request
	 *
	 * @param  {Response} resp Reponse object from fetch
	 *
	 * @return {void}
	 */
	parseResponse(resp) {
		if (resp.ok) {
			let type = resp.headers.get('Content-Type').toLowerCase();
			if (type.startsWith('application/json')) {
				return resp.json();
			} else {
				throw new Error(`Unsupported Content-Type: "${type}"`);
			}
		} else {
			throw new Error(`<${this.url.origin}> ${resp.status}: ${resp.statusText}`);
		}
	}

	/**
	 * Static method to get location using GeoLocation API
	 *
	 * @param  {object} options    GeoLocation options object
	 *
	 * @return {Promise}           A promise which resolves with GeoLocation coords
	 */
	static getLocation(options = {}) {
		return new Promise(function(success, fail) {
			if (!('geolocation' in navigator)) {
				fail('Your browser does not support GeoLocation');
			}
			navigator.geolocation.getCurrentPosition(success, fail, options);
		});
	}
}
