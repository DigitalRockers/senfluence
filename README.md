#Senfluence
[![Build Status via Travis CI](https://travis-ci.org/DigitalRockers/senfluence.svg?branch=master)](https://travis-ci.org/DigitalRockers/senfluence)
[![NPM version](http://img.shields.io/npm/v/senfluence.svg)](https://www.npmjs.org/package/senfluence)

[Senfluence](senfluence.com) api module for [nodejs](nodejs.org)

Senfluence API documentation: [http://senfluence.com/apis](http://senfluence.com/apis)

This software is released under the MIT license. See `LICENSE` for more details

## Download and Installation

From the command line

	$ npm install senfluence

package.json

	dependencies: {
      ...
      "senfluence": "*$version*",
      ...
    }
    ...

## Example use

```javascript
var Senfluence = require('senfluence');

var sen = new Senfluence({
	apiKey: 'YOUR_API_KEY',
});

sen.socialMediaMonitoring({keyword: 'obama'}, function(error, results){
	if(error) return console.error(error);
	...
});
```

## Documentation
Initialize Senfluence object:

```javascript
var Senfluence = require('senfluence');

var sen = new Senfluence({
	apiKey: 'YOUR_API_KEY' || process.env.SenfluenceApiKey,
	debug: false //optional
});
```

### socialMediaMonitoring(query, callback)
```javascript
sen.socialMediaMonitoring({keyword: 'obama'}, function(error, results){
	if(error) return console.error(error);

	...
});
```

### sentimentAndInfluence(query, callback)
```javascript
sen.sentimentAndInfluence({keyword: 'obama', url: 'http://www.newsday.com%2Fnews%2Fnation%2Fbarack-obama-approval-rating-at-15-month-high-poll-says-1.3982365'}, function(error, results){
	if(error) return console.error(error);

	...
});
```


LICENSE
---
The MIT License (MIT)

Copyright (c) 2015 Digital Rockers s.r.l.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
