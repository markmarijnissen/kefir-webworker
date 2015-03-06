var Kefir = require('kefir');
require('../kefir-webworker');

Kefir
	.fromMessage()
	.delay(1000)
	.toMessage();