'use strict';

var should = require('should');

var Senfluence = require('./index');

var sen = new Senfluence();

describe('Senfluence unit tests', function() {
	it('socialMediaMonitoring', function(done) {
		sen.socialMediaMonitoring({
			keyword: 'google',
			limit: 50,
			//skip: 100,
			//includes: [],
			excludes: ['tech', 'technology'],
			//domains: [],
			sources: ['Blogs', 'Facebook'],
			//dateStart: new Date(2015,0,1),
			//dateEnd: new Date()
		}, function(err, res){
			should.not.exist(err);
			res.should.not.have.property('errors');
			res.should.have.property('results').be.instanceof(Array);
			done();
		});
	});

	/*it('sentimentAndInfluence', function(done) {
		sen.sentimentAndInfluence({
			keyword: 'obama',
			url: 'http://www.newsday.com%2Fnews%2Fnation%2Fbarack-obama-approval-rating-at-15-month-high-poll-says-1.3982365'
		}, function(err, res){
			should.not.exist(err);
			res.result.should.not.have.property('error');
			res.result.should.have.property('sentiment influece');
			done();
		});
	});*/
});
