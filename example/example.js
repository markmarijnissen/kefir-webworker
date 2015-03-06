var emitter = window.emitter = Kefir.emitter();

emitter
	.mapWithWorker(new Worker('echo-worker-bundle.js'))
	.log('web-worker');

emitter.emit('hello');
emitter.error('oh no!');