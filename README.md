kefir-webworker
===============

Map a Kefir stream to a WebWorker

## Getting started

Install using bower or npm

```bash
  bower install kefir-webworker
  npm install kefir-webworker
```

## Usage

User `mapWithWorker` in your main javascript:

```javascript
Kefir.emitter()
	.mapWithWorker(new Worker('echo-worker-bundle.js'))
	.log('web-worker');

emitter.emit('hello');
emitter.error('oh no!');
```

Use `Kefir.fromMessage` and `toMessage` in your webworker:

```javascript
// Make sure you include Kefir and kefir-webworker:
var Kefir = require('kefir');
require('kefir-webworker');

Kefir
	.fromMessage()   	// Create stream from incoming messages
	.delay(1000)
	.toMessage();		// Post messages back to main javascript
```

## Creating a webworker javascript file

You have to bundle your code (i.e. `example/echo-worker.js`) with Kefir and kefir-webworker.

In the example, I am using webpack to bundle the files:

```bash
npm install # install dependencies
npm install webpack -g
webpack --entry ./example/echo-worker --output-file ./example/echo-worker-bundle.js
```

## Changelog

### 0.1.0 - (6/3/2015)

* Initial Release

## Contribute

Feel free to contribute to this project in any way. The easiest way to support this project is by giving it a star.

## Contact
-   @markmarijnissen
-   http://www.madebymark.nl
-   info@madebymark.nl

© 2015 - Mark Marijnissen
