/**
 * Class for getting weather data using OpenWeatherMap
 * @see http://openweathermap.org/current
 */'use strict';var _createClass=(function(){function defineProperties(target,props){for(var i=0;i < props.length;i++) {var descriptor=props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if('value' in descriptor)descriptor.writable = true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};})();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var OpenWeatherMap=(function(){ /**
	 * Creates new instance and sets class properties
	 *
	 * @param  {string}                   imperial or metric
	 * @param  {string}                   language code
	 * @param  {float}                    API version number
	 */function OpenWeatherMap(){var units=arguments.length <= 0 || arguments[0] === undefined?'imperial':arguments[0];var lang=arguments.length <= 1 || arguments[1] === undefined?'en':arguments[1];var version=arguments.length <= 2 || arguments[2] === undefined?2.5:arguments[2];_classCallCheck(this,OpenWeatherMap);this.url = new URL('http://api.openweathermap.org/data/' + version + '/weather');this.url.searchParams.set('units',units);this.url.searchParams.set('lang',lang);} /**
	 * Get weather using GeoLocation API
	 *
	 * @param  {callable} callback     Callback to call with response
	 *
	 * @return {void}
	 */_createClass(OpenWeatherMap,[{key:'getFromCoords',value:function getFromCoords(){var _this=this;var callback=arguments.length <= 0 || arguments[0] === undefined?function(data){console.log(data);}:arguments[0];OpenWeatherMap.getLocation().then(function(location){_this.url.searchParams.set('lat',location.coords.latitude);_this.url.searchParams.set('lon',location.coords.longitude);fetch(_this.url,{method:'GET',mode:'cors'}).then(function(resp){return _this.parseResponse(resp);}).then(callback);})['catch'](function(err){console.error(err);});} /**
	 * Get weather using city name
	 *
	 * @param  {string}   city             City name to get weather for
	 * @param  {callable} callback         Callback to call with response
	 *
	 * @return {void}
	 */},{key:'getFromCity',value:function getFromCity(city){var _this2=this;var callback=arguments.length <= 1 || arguments[1] === undefined?function(data){return console.log(data);}:arguments[1];this.url.searchParams.set('q',city);fetch(this.url,{method:'GET',mode:'cors'}).then(function(resp){return _this2.parseResponse(resp);}).then(callback)['catch'](function(err){console.error(err);});} /**
	 * Get weather from zip code
	 *
	 * @param  {integer}  zip      Zip code
	 * @param  {[type]}   callback Callback to call with response
	 *
	 * @return {void}
	 */},{key:'getFromZip',value:function getFromZip(zip){var _this3=this;var callback=arguments.length <= 1 || arguments[1] === undefined?function(data){return console.log(data);}:arguments[1];this.url.searchParams.set('zip',zip + ',us');fetch(this.url,{method:'GET',mode:'cors'}).then(function(resp){return _this3.parseResponse(resp);}).then(callback)['catch'](function(err){console.error(err);});} /**
	 * Get weather from city ID
	 *
	 * @param  {integer} id       City ID number
	 * @param  {[type]}  callback Callback to call with response
	 *
	 * @return {void}
	 */},{key:'getFromID',value:function getFromID(id){var _this4=this;var callback=arguments.length <= 1 || arguments[1] === undefined?function(data){return console.log(data);}:arguments[1];this.url.searchParams.set('id',id);fetch(this.url,{method:'GET',mode:'cors'}).then(function(resp){return _this4.parseResponse(resp);}).then(callback)['catch'](function(err){console.error(err);});} /**
	 * Parse response from fetch request
	 *
	 * @param  {Response} resp Reponse object from fetch
	 *
	 * @return {void}
	 */},{key:'parseResponse',value:function parseResponse(resp){if(resp.ok){var type=resp.headers.get('Content-Type').toLowerCase();if(type.startsWith('application/json')){return resp.json();}else {throw new Error('Unsupported Content-Type: "' + type + '"');}}else {throw new Error('<' + this.url.origin + '> ' + resp.status + ': ' + resp.statusText);}} /**
	 * Static method to get location using GeoLocation API
	 *
	 * @param  {object} options    GeoLocation options object
	 *
	 * @return {Promise}           A promise which resolves with GeoLocation coords
	 */}],[{key:'getLocation',value:function getLocation(){var options=arguments.length <= 0 || arguments[0] === undefined?{}:arguments[0];return new Promise(function(success,fail){if(!('geolocation' in navigator)){fail('Your browser does not support GeoLocation');}navigator.geolocation.getCurrentPosition(success,fail,options);});}}]);return OpenWeatherMap;})();

//# sourceMappingURL=weather.js.map