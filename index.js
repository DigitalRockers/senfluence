var util = require('util');
var eyes = require('eyes');
var request = require('request');
var _ = require('lodash');


var Senfluence = function(options){
	if(!options)
		options = {};

	this.apiKey = options.apiKey || process.env.SenfluenceApiKey;

	if(options.debug){
		this.debug = true;
		this.__inspect = eyes.inspector({maxLength: false, stream: null});
	}

	return this;
};

/**
 * Call Social Media Monitoring API v1 (deprecated)
 *
 * @param brand 	String,Array 	brand name
 * @param options 	Object 			option object
 * @param callback 	function 		callback function called with two parameters err, result
 */
Senfluence.prototype.socialMediaMonitoringV1 = function(brand, options, callback){
	if(!callback){
		callback = options;
		options = {};
	}

	options = _.merge(defaults, options);

	var self = this;
	var prec = false;
	var path = '';

	if (options.dateStart && options.dateEnd){
		path = '/' + options.dateStart + '/' + options.dateEnd;
		prec = true;
	}
	if(prec || options.sources){
		path = '/' + (options.sources && options.sources.length ? options.sources.join(',') : 'null') + path;
		prec = true;
	}
	if(prec || options.domains){
		path = '/' + (options.domains && options.domains.length ? options.domains.join(',') : 'null') + path;
		prec = true;
	}
	if(prec || options.excludes){
		path = '/' + (options.excludes && options.excludes.length ? options.excludes.join(',') : 'null') + path;
		prec = true;
	}
	if(prec || options.includes){
		path = '/' + (options.includes && options.includes.length ? options.includes.join(',') : 'null') + path;
		prec = true;
	}
	if(prec || options.skip){
		path = '/' + (options.skip ? options.skip : 'null') + path;
		prec = true;
	}
	path = 'http://api.trackur.com/index.php/api/json/' + self.apiKey + '/' + brand + '/' + options.limit + path;
	
	var t = Date.now();
	request(path, function(error, response, json){
		self.__debug('GET - ' + path + ' - ' + (Date.now() - t) + ' ms');
		if(error) return callback(error);	

		self.__debugInspect(JSON.parse(json));

		callback(null, json);
	});
};

/**
 * Call Social Media Monitoring API v2
 *
 * @param brand 	String,Array 	brand name
 * @param options 	Object 			option object
 * @param callback 	function 		callback function called with two parameters err, result
 */
Senfluence.prototype.socialMediaMonitoring = function(options, callback){
	if(!callback){
		callback = options;
		options = {};
	}

	var defaults = {
		api_key: this.apiKey,
		//format: 'json',
		//limit: 100,
		//offset: 0,
		//includes: ,
		//excludes: ,
		//sources: , (Valid sources are Facebook, Forums, GooglePlus, Images/Video, News/Blogs, Reddit, Reviews, Tumblr, Twitter)
		//start_time: ,
		//end_time: ,
		//influence: ,
		//timestamp_format: ,
		//sentiment: ,
		//countries: ,
	};
	options = _.merge(defaults, options);

	if(options.includes && util.isArray(options.includes))
		options.includes = options.includes.join(',');
	if(options.excludes && util.isArray(options.excludes))
		options.excludes = options.excludes.join(',');
	if(options.sources && util.isArray(options.sources))
		options.sources = options.sources.join(',');
	if(options.countries && util.isArray(options.countries))
		options.countries = options.countries.join(',');

	var path = 'http://api.trackur.com/api/v2/';
	var self = this;

	var t = Date.now();
	request({url: path, qs: options}, function(error, response, data){
		self.__debug('GET - ' + path + ' - ' + (Date.now() - t) + ' ms');
		if(error) return callback(error);	
		
		var json = JSON.parse(data);

		self.__debugInspect(json);

		callback(null, json);
	});
};

/**
 * Call Sentiment and Influence API
 *
 * @param options 	Object 			option object {keyword: String, url: String}
 * @param callback 	function 		callback function called with two parameters err, result
 */
Senfluence.prototype.sentimentAndInfluence = function(options, callback){
	if(!callback){
		callback = options;
		options = {};
	}

	var defaults = {
		key: this.apiKey,		
	};
	options = _.merge(defaults, options);

	var path = 'http://api.trackur.com/index.php/api/sentiment/';
	var self = this;

	var t = Date.now();
	request({url: path, qs: options}, function(error, response, json){
		self.__debug('GET - ' + path + ' - ' + (Date.now() - t) + ' ms');
		if(error) return callback(error);	

		self.__debugInspect(JSON.parse(json));

		callback(null, json);
	});
};

/**  Debug  **/
Senfluence.prototype.__debug = function (str) {
	if(this.debug)
		console.log('Senfluence - ' + new Date().toISOString() + ' - ' + str);
};

Senfluence.prototype.__debugInspect = function (str, obj) {
	if(this.debug){
		if(obj)
			console.log('Senfluence - ' + new Date().toISOString() + ' - ' + str + ' - ' + this.__inspect(obj));
		else
			console.log('Senfluence - ' + new Date().toISOString() + ' - ' + this.__inspect(str));
	}
};


module.exports = Senfluence;