(function(definition) {
  if (typeof module !== 'undefined') {
    module.exports = definition(require('kefir'));
  } else if (typeof define === 'function' && define.amd) {
    define(['kefir'], definition);
  } else {
    definition(Kefir);
  }
})(function(Kefir) {
	// Web-worker: Receive incoming events.
	Kefir.fromMessage = function(){
		return Kefir.fromEvent(self,'message')
			.withHandler(function(emitter,event){
				// event.value is a native MessageEvent
				if(event.type === 'value') {
					// extract the Kefir 'event' object 
					event = event.value.data;
				}

				// Emit events!
				if(event.type === 'end'){
					emitter.end();
				} else if(event.type === 'value'){
					emitter.emit(event.value);
				} else {
					emitter.error(event.value);
				}
			})
			// Destroy Worker when Stream ends
			.onEnd(function(){
				// Emit 'end' to output stream
				self.postMessage({type:'end',value:null});
				self.close();
			});
	};

	// Web-worker: Send events back to context JS
	Kefir.Stream.prototype.toMessage = function(){
		this.onAny(function(event){
			self.postMessage(event);
		});
		return this;
	};

	// Context: Create a WebWorker
	Kefir.Stream.prototype.mapWithWorker = function KefirWorker(file){
		var worker = file instanceof Worker? file: new Worker(file);
		var emitter = Kefir.emitter();

		// Send events TO Worker
		this.onAny(function WorkerOnAny(event){
			worker.postMessage(event);
		});

		// Retrieve events FROM Worker
		worker.addEventListener('message',function(nativeEvent){
			var event = nativeEvent.data || {};
			if(event.type === 'end'){
				emitter.end();
				worker.terminate();
				worker = null;
			} else if(event.type === 'value'){
				emitter.emit(event.value);
			} else {
				emitter.error(event.value);
			}
		});

		return emitter;
	};

	return Kefir;
});