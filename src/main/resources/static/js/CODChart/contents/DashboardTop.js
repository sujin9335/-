(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"top_line_atlas_1", frames: [[1166,342,44,33],[1221,194,26,19],[1103,523,64,49],[1119,274,87,66],[1103,382,100,78],[1208,274,32,23],[1119,342,45,34],[1119,194,100,78],[0,570,63,46],[1103,462,77,59],[0,382,1101,92],[0,0,1660,95],[0,194,1117,92],[0,476,1101,92],[0,288,1117,92],[0,97,1660,95]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_28 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["top_line_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.심볼25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,9.5);


(lib.심볼24 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,22,16.5);


(lib.심볼23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,32,24.5);


(lib.심볼22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,43.5,33);


(lib.심볼21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,16,11.5);


(lib.심볼12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,22.5,17);


(lib.심볼11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,31.5,23);


(lib.심볼10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38.5,29.5);


(lib.심볼9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.심볼2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,39);


(lib.Path_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-1,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_7, new cjs.Rectangle(-1,0,550.5,46), null);


(lib.Path_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(-0.35,-0.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6, new cjs.Rectangle(-0.3,-0.3,830,47.5), null);


(lib.Path_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(-1,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5, new cjs.Rectangle(-1,0,558.5,46), null);


(lib.Path_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_6_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance_1 = new lib.CachedBmp_3();
	this.instance_1.setTransform(-0.35,-0.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_1, new cjs.Rectangle(-0.3,-0.3,830,47.5), null);


(lib.Path_5_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(-1,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_1, new cjs.Rectangle(-1,0,558.5,46), null);


(lib.Path_4_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(-1,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(-1,0,550.5,46), null);


(lib.심볼14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_2
	this.instance = new lib.심볼25("synched",0);
	this.instance.setTransform(169.85,35.4,1,1,0,0,0,6.5,4.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(55).to({_off:false},0).to({alpha:0},59).to({alpha:1},60).to({alpha:0},60).wait(66));

	// 레이어_3
	this.instance_1 = new lib.심볼24("synched",0);
	this.instance_1.setTransform(160.2,31.95,1,1,0,0,0,11,8.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50).to({_off:false},0).to({alpha:0},59).to({alpha:1},60).to({alpha:0},60).wait(71));

	// 레이어_4
	this.instance_2 = new lib.심볼23("synched",0);
	this.instance_2.setTransform(149.15,28.05,1,1,0,0,0,16,12.2);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(45).to({_off:false},0).to({alpha:0},59).to({alpha:1},60).to({alpha:0},60).wait(76));

	// 레이어_5
	this.instance_3 = new lib.심볼22("synched",0);
	this.instance_3.setTransform(138,23.85,1,1,0,0,0,21.9,16.4);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(40).to({_off:false},0).to({alpha:0},59).to({alpha:1},60).to({alpha:0},60).wait(81));

	// 레이어_6
	this.instance_4 = new lib.심볼21("synched",0);
	this.instance_4.setTransform(124.15,20.7,1,1,0,0,0,25.1,19.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(34).to({_off:false},0).to({alpha:0},59).to({alpha:1},60).to({alpha:0},60).wait(87));

	// 레이어_7
	this.instance_5 = new lib.심볼20("synched",0);
	this.instance_5.setTransform(108.1,20.7,1,1,0,0,0,25.1,19.5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(28).to({_off:false},0).to({alpha:0},59).to({alpha:1},60).to({alpha:0},60).wait(93));

	// 레이어_8
	this.instance_6 = new lib.심볼19("synched",0);
	this.instance_6.setTransform(91.05,20.7,1,1,0,0,0,25.1,19.5);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(22).to({_off:false},0).to({alpha:0},59).to({alpha:1},60).to({alpha:0},60).wait(99));

	// 레이어_9
	this.instance_7 = new lib.심볼18("synched",0);
	this.instance_7.setTransform(74,20.7,1,1,0,0,0,25.1,19.5);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(17).to({_off:false},0).to({alpha:0},59).to({alpha:1},60).to({alpha:0},60).wait(104));

	// 레이어_10
	this.instance_8 = new lib.심볼17("synched",0);
	this.instance_8.setTransform(57.95,20.7,1,1,0,0,0,25.1,19.5);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(12).to({_off:false},0).to({alpha:0},59).to({alpha:1},60).to({alpha:0},60).wait(109));

	// 레이어_11
	this.instance_9 = new lib.심볼16("synched",0);
	this.instance_9.setTransform(40.9,20.7,1,1,0,0,0,25.1,19.5);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(6).to({_off:false},0).to({alpha:0},59).to({alpha:1},60).to({alpha:0},60).wait(115));

	// 레이어_12
	this.instance_10 = new lib.심볼15("synched",0);
	this.instance_10.setTransform(23.85,20.7,1,1,0,0,0,25.1,19.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({alpha:0},59).to({alpha:1},60).to({alpha:0},60).to({startPosition:0},88).to({alpha:1},32).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.2,1.2,177.6,39.3);


(lib.심볼1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.심볼13("synched",0);
	this.instance.setTransform(14.6,37.65,1,1,0,0,0,7.9,5.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(54).to({_off:false},0).to({alpha:0},69).to({alpha:1},61).to({alpha:0},55).wait(61));

	// 레이어_2
	this.instance_1 = new lib.심볼12("synched",0);
	this.instance_1.setTransform(24.05,34.95,1,1,0,0,0,11.3,8.6);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(49).to({_off:false},0).to({alpha:0},69).to({alpha:1},61).to({alpha:0},55).wait(66));

	// 레이어_3
	this.instance_2 = new lib.심볼11("synched",0);
	this.instance_2.setTransform(34.1,31.95,1,1,0,0,0,15.7,11.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(44).to({_off:false},0).to({alpha:0},69).to({alpha:1},61).to({alpha:0},55).wait(71));

	// 레이어_4
	this.instance_3 = new lib.심볼10("synched",0);
	this.instance_3.setTransform(44.65,28.65,1,1,0,0,0,19.1,14.8);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(39).to({_off:false},0).to({alpha:0},69).to({alpha:1},61).to({alpha:0},56).wait(75));

	// 레이어_5
	this.instance_4 = new lib.심볼9("synched",0);
	this.instance_4.setTransform(55.75,23.95,1,1,0,0,0,25,19.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(34).to({_off:false},0).to({alpha:0},69).to({alpha:1},61).to({alpha:0},56).wait(80));

	// 레이어_6
	this.instance_5 = new lib.심볼8("synched",0);
	this.instance_5.setTransform(72.75,23.95,1,1,0,0,0,25,19.5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(29).to({_off:false},0).to({alpha:0},69).to({alpha:1},61).to({alpha:0},56).wait(85));

	// 레이어_7
	this.instance_6 = new lib.심볼7("synched",0);
	this.instance_6.setTransform(88.75,23.95,1,1,0,0,0,25,19.5);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(24).to({_off:false},0).to({alpha:0},69).to({alpha:1},61).to({alpha:0},55).wait(91));

	// 레이어_8
	this.instance_7 = new lib.심볼6("synched",0);
	this.instance_7.setTransform(105.75,23.95,1,1,0,0,0,25,19.5);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(19).to({_off:false},0).to({alpha:0},69).to({alpha:1},61).to({alpha:0},55).wait(96));

	// 레이어_9
	this.instance_8 = new lib.심볼5("synched",0);
	this.instance_8.setTransform(122.75,23.95,1,1,0,0,0,25,19.5);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(14).to({_off:false},0).to({alpha:0},69).to({alpha:1},61).to({alpha:0},55).wait(101));

	// 레이어_10
	this.instance_9 = new lib.심볼4("synched",0);
	this.instance_9.setTransform(138.75,23.95,1,1,0,0,0,25,19.5);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(9).to({_off:false},0).to({alpha:0},69).to({alpha:1},61).to({alpha:0},55).wait(106));

	// 레이어_11
	this.instance_10 = new lib.심볼3("synched",0);
	this.instance_10.setTransform(155.75,23.95,1,1,0,0,0,25,19.5);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(4).to({_off:false},0).to({alpha:0},69).to({alpha:1},61).to({alpha:0},54).wait(112));

	// 레이어_12
	this.instance_11 = new lib.심볼2("synched",0);
	this.instance_11.setTransform(172.75,23.95,1,1,0,0,0,25,19.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({alpha:0},69).to({alpha:1},61).to({alpha:0},53).to({startPosition:0},82).to({alpha:1},34).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(6.7,4.5,191.10000000000002,39);


// stage content:
(lib.top_line = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(300));

	// 레이어_5
	this.instance = new lib.심볼14("synched",0);
	this.instance.setTransform(1441.35,25.3,1,1,0,0,0,88.9,19.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(300));

	// 레이어_8
	this.instance_1 = new lib.심볼1("synched",0);
	this.instance_1.setTransform(497.15,29.4,1,1,0,0,0,98.2,26.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(300));

	// 상단_타이틀 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AqeQbQjNhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDNhXQDThZDoAAQDnAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjnAAQjoAAjThZg");
	var mask_graphics_1 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_2 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_3 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_4 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_5 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_6 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_7 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_8 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_9 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_10 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_11 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_12 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_13 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_14 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_15 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_16 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_17 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_18 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_19 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_20 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_21 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_22 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_23 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_24 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_25 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_26 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_27 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_28 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_29 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_30 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_31 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_32 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_33 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_34 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_35 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_36 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_37 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_38 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_39 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_40 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_41 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_42 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_43 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_44 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_45 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_46 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_47 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_48 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_49 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_50 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_51 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_52 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_53 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_54 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_55 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_56 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_57 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_58 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_59 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_60 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_61 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_62 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_63 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_64 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_65 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_66 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_67 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_68 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_69 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_70 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_71 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_72 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_73 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_74 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_75 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_76 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_77 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_78 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_79 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_80 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_81 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_82 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_83 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_84 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_85 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_86 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_87 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_88 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_89 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_90 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_91 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_92 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_93 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_94 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_95 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_96 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_97 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_98 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_99 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_100 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_101 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_102 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_103 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_104 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_105 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_106 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_107 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_108 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_109 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_110 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_111 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_112 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_113 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_114 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_115 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_116 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_117 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_118 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_119 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_120 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_121 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_122 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_123 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_124 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_125 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_126 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_127 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_128 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_129 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_130 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_131 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_132 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_133 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_134 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_135 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_136 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_137 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_138 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_139 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_140 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_141 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_142 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_143 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_144 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_145 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_146 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_147 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_148 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_149 = new cjs.Graphics().p("ECU+AQbQjNhXieieQididhXjOQhajTAAjoQAAjnBajUQBXjMCdieQCeieDNhXQDUhZDoAAQDnAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjnAAQjoAAjUhZg");
	var mask_graphics_150 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_151 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_152 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_153 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_154 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_155 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_156 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_157 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_158 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_159 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_160 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_161 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_162 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_163 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_164 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_165 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_166 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_167 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_168 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_169 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_170 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_171 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_172 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_173 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_174 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_175 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_176 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_177 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_178 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_179 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_180 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_181 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_182 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_183 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_184 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_185 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_186 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_187 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_188 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_189 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_190 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_191 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_192 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_193 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_194 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_195 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_196 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_197 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_198 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_199 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_200 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_201 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_202 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_203 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_204 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_205 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_206 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_207 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_208 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_209 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_210 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_211 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_212 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_213 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_214 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_215 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_216 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_217 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_218 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_219 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_220 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_221 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_222 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_223 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_224 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_225 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_226 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_227 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_228 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_229 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_230 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_231 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_232 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_233 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_234 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_235 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_236 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_237 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_238 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_239 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_240 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_241 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_242 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_243 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_244 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_245 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_246 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_247 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_248 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_249 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_250 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_251 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_252 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_253 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_254 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_255 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_256 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_257 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_258 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_259 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_260 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_261 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_262 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_263 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_264 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_265 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_266 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_267 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_268 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_269 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_270 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_271 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_272 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_273 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_274 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_275 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_276 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_277 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_278 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_279 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_280 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_281 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_282 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_283 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_284 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_285 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_286 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_287 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_288 = new cjs.Graphics().p("Am7QbQjNhXidieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCdieDNhXQDUhZDnAAQDoAADUBZQDNBXCdCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQidCejNBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_289 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_290 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCeCeQCeCeBWDMQBaDUAADnQAADohaDTQhWDOieCdQieCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_291 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_292 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_293 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_294 = new cjs.Graphics().p("Am7QbQjMhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDMhXQDUhZDnAAQDoAADUBZQDMBXCfCeQCdCeBWDMQBaDUAADnQAADohaDTQhWDOidCdQifCejMBXQjUBZjoAAQjnAAjUhZg");
	var mask_graphics_295 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_296 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_297 = new cjs.Graphics().p("Am6QbQjOhXidieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCdieDOhXQDThZDnAAQDoAADUBZQDNBXCdCeQCeCeBXDMQBZDUAADnQAADohZDTQhXDOieCdQidCejNBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_298 = new cjs.Graphics().p("Am6QbQjNhXieieQieidhXjOQhZjTAAjoQAAjnBZjUQBXjMCeieQCeieDNhXQDThZDnAAQDoAADUBZQDMBXCfCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQifCejMBXQjUBZjoAAQjnAAjThZg");
	var mask_graphics_299 = new cjs.Graphics().p("AqeQbQjNhXieieQieidhWjOQhajTAAjoQAAjnBajUQBWjMCeieQCeieDNhXQDThZDoAAQDnAADUBZQDNBXCeCeQCdCeBXDMQBZDUAADnQAADohZDTQhXDOidCdQieCejNBXQjUBZjnAAQjoAAjThZg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-136.775,y:13.55}).wait(1).to({graphics:mask_graphics_1,x:-144.3,y:13.55}).wait(1).to({graphics:mask_graphics_2,x:-129.1,y:13.55}).wait(1).to({graphics:mask_graphics_3,x:-113.85,y:13.55}).wait(1).to({graphics:mask_graphics_4,x:-98.65,y:13.55}).wait(1).to({graphics:mask_graphics_5,x:-83.4,y:13.55}).wait(1).to({graphics:mask_graphics_6,x:-68.2,y:13.55}).wait(1).to({graphics:mask_graphics_7,x:-52.95,y:13.55}).wait(1).to({graphics:mask_graphics_8,x:-37.7,y:13.55}).wait(1).to({graphics:mask_graphics_9,x:-22.5,y:13.55}).wait(1).to({graphics:mask_graphics_10,x:-7.3,y:13.55}).wait(1).to({graphics:mask_graphics_11,x:7.95,y:13.55}).wait(1).to({graphics:mask_graphics_12,x:23.2,y:13.55}).wait(1).to({graphics:mask_graphics_13,x:38.4,y:13.55}).wait(1).to({graphics:mask_graphics_14,x:53.65,y:13.55}).wait(1).to({graphics:mask_graphics_15,x:68.9,y:13.55}).wait(1).to({graphics:mask_graphics_16,x:84.1,y:13.55}).wait(1).to({graphics:mask_graphics_17,x:99.35,y:13.55}).wait(1).to({graphics:mask_graphics_18,x:114.55,y:13.55}).wait(1).to({graphics:mask_graphics_19,x:129.8,y:13.55}).wait(1).to({graphics:mask_graphics_20,x:145.05,y:13.55}).wait(1).to({graphics:mask_graphics_21,x:160.25,y:13.55}).wait(1).to({graphics:mask_graphics_22,x:175.45,y:13.55}).wait(1).to({graphics:mask_graphics_23,x:190.7,y:13.55}).wait(1).to({graphics:mask_graphics_24,x:205.95,y:13.55}).wait(1).to({graphics:mask_graphics_25,x:221.15,y:13.55}).wait(1).to({graphics:mask_graphics_26,x:236.4,y:13.55}).wait(1).to({graphics:mask_graphics_27,x:251.65,y:13.55}).wait(1).to({graphics:mask_graphics_28,x:266.85,y:13.55}).wait(1).to({graphics:mask_graphics_29,x:282.05,y:13.55}).wait(1).to({graphics:mask_graphics_30,x:297.3,y:13.55}).wait(1).to({graphics:mask_graphics_31,x:312.55,y:13.55}).wait(1).to({graphics:mask_graphics_32,x:327.75,y:13.55}).wait(1).to({graphics:mask_graphics_33,x:343,y:13.55}).wait(1).to({graphics:mask_graphics_34,x:358.25,y:13.55}).wait(1).to({graphics:mask_graphics_35,x:373.45,y:13.55}).wait(1).to({graphics:mask_graphics_36,x:388.65,y:13.55}).wait(1).to({graphics:mask_graphics_37,x:403.9,y:13.55}).wait(1).to({graphics:mask_graphics_38,x:419.15,y:13.55}).wait(1).to({graphics:mask_graphics_39,x:434.35,y:13.55}).wait(1).to({graphics:mask_graphics_40,x:449.6,y:13.55}).wait(1).to({graphics:mask_graphics_41,x:464.8,y:13.55}).wait(1).to({graphics:mask_graphics_42,x:480.05,y:13.55}).wait(1).to({graphics:mask_graphics_43,x:495.25,y:13.55}).wait(1).to({graphics:mask_graphics_44,x:510.5,y:13.55}).wait(1).to({graphics:mask_graphics_45,x:525.75,y:13.55}).wait(1).to({graphics:mask_graphics_46,x:541,y:13.55}).wait(1).to({graphics:mask_graphics_47,x:556.2,y:13.55}).wait(1).to({graphics:mask_graphics_48,x:571.4,y:13.55}).wait(1).to({graphics:mask_graphics_49,x:586.65,y:13.55}).wait(1).to({graphics:mask_graphics_50,x:601.9,y:13.55}).wait(1).to({graphics:mask_graphics_51,x:617.1,y:13.55}).wait(1).to({graphics:mask_graphics_52,x:632.35,y:13.55}).wait(1).to({graphics:mask_graphics_53,x:647.55,y:13.55}).wait(1).to({graphics:mask_graphics_54,x:662.8,y:13.55}).wait(1).to({graphics:mask_graphics_55,x:678,y:13.55}).wait(1).to({graphics:mask_graphics_56,x:693.25,y:13.55}).wait(1).to({graphics:mask_graphics_57,x:708.5,y:13.55}).wait(1).to({graphics:mask_graphics_58,x:723.7,y:13.55}).wait(1).to({graphics:mask_graphics_59,x:738.9,y:13.55}).wait(1).to({graphics:mask_graphics_60,x:754.15,y:13.55}).wait(1).to({graphics:mask_graphics_61,x:769.4,y:13.55}).wait(1).to({graphics:mask_graphics_62,x:784.6,y:13.55}).wait(1).to({graphics:mask_graphics_63,x:799.85,y:13.55}).wait(1).to({graphics:mask_graphics_64,x:815.1,y:13.55}).wait(1).to({graphics:mask_graphics_65,x:830.3,y:13.55}).wait(1).to({graphics:mask_graphics_66,x:845.5,y:13.55}).wait(1).to({graphics:mask_graphics_67,x:860.75,y:13.55}).wait(1).to({graphics:mask_graphics_68,x:876,y:13.55}).wait(1).to({graphics:mask_graphics_69,x:891.2,y:13.55}).wait(1).to({graphics:mask_graphics_70,x:906.45,y:13.55}).wait(1).to({graphics:mask_graphics_71,x:921.7,y:13.55}).wait(1).to({graphics:mask_graphics_72,x:936.9,y:13.55}).wait(1).to({graphics:mask_graphics_73,x:952.1,y:13.55}).wait(1).to({graphics:mask_graphics_74,x:967.35,y:13.55}).wait(1).to({graphics:mask_graphics_75,x:982.6,y:13.55}).wait(1).to({graphics:mask_graphics_76,x:997.85,y:13.55}).wait(1).to({graphics:mask_graphics_77,x:1013.05,y:13.55}).wait(1).to({graphics:mask_graphics_78,x:1028.25,y:13.55}).wait(1).to({graphics:mask_graphics_79,x:1043.5,y:13.55}).wait(1).to({graphics:mask_graphics_80,x:1058.75,y:13.55}).wait(1).to({graphics:mask_graphics_81,x:1073.95,y:13.55}).wait(1).to({graphics:mask_graphics_82,x:1089.2,y:13.55}).wait(1).to({graphics:mask_graphics_83,x:1104.45,y:13.55}).wait(1).to({graphics:mask_graphics_84,x:1119.65,y:13.55}).wait(1).to({graphics:mask_graphics_85,x:1134.85,y:13.55}).wait(1).to({graphics:mask_graphics_86,x:1150.1,y:13.55}).wait(1).to({graphics:mask_graphics_87,x:1165.35,y:13.55}).wait(1).to({graphics:mask_graphics_88,x:1180.55,y:13.55}).wait(1).to({graphics:mask_graphics_89,x:1195.8,y:13.55}).wait(1).to({graphics:mask_graphics_90,x:1211.05,y:13.55}).wait(1).to({graphics:mask_graphics_91,x:1226.25,y:13.55}).wait(1).to({graphics:mask_graphics_92,x:1241.45,y:13.55}).wait(1).to({graphics:mask_graphics_93,x:1256.7,y:13.55}).wait(1).to({graphics:mask_graphics_94,x:1271.95,y:13.55}).wait(1).to({graphics:mask_graphics_95,x:1287.15,y:13.55}).wait(1).to({graphics:mask_graphics_96,x:1302.4,y:13.55}).wait(1).to({graphics:mask_graphics_97,x:1317.6,y:13.55}).wait(1).to({graphics:mask_graphics_98,x:1332.85,y:13.55}).wait(1).to({graphics:mask_graphics_99,x:1348.05,y:13.55}).wait(1).to({graphics:mask_graphics_100,x:1363.3,y:13.55}).wait(1).to({graphics:mask_graphics_101,x:1378.55,y:13.55}).wait(1).to({graphics:mask_graphics_102,x:1393.75,y:13.55}).wait(1).to({graphics:mask_graphics_103,x:1408.95,y:13.55}).wait(1).to({graphics:mask_graphics_104,x:1424.2,y:13.55}).wait(1).to({graphics:mask_graphics_105,x:1439.45,y:13.55}).wait(1).to({graphics:mask_graphics_106,x:1454.7,y:13.55}).wait(1).to({graphics:mask_graphics_107,x:1469.9,y:13.55}).wait(1).to({graphics:mask_graphics_108,x:1485.15,y:13.55}).wait(1).to({graphics:mask_graphics_109,x:1500.35,y:13.55}).wait(1).to({graphics:mask_graphics_110,x:1515.6,y:13.55}).wait(1).to({graphics:mask_graphics_111,x:1530.8,y:13.55}).wait(1).to({graphics:mask_graphics_112,x:1546.05,y:13.55}).wait(1).to({graphics:mask_graphics_113,x:1561.3,y:13.55}).wait(1).to({graphics:mask_graphics_114,x:1576.5,y:13.55}).wait(1).to({graphics:mask_graphics_115,x:1591.7,y:13.55}).wait(1).to({graphics:mask_graphics_116,x:1606.95,y:13.55}).wait(1).to({graphics:mask_graphics_117,x:1622.2,y:13.55}).wait(1).to({graphics:mask_graphics_118,x:1637.4,y:13.55}).wait(1).to({graphics:mask_graphics_119,x:1652.65,y:13.55}).wait(1).to({graphics:mask_graphics_120,x:1667.9,y:13.55}).wait(1).to({graphics:mask_graphics_121,x:1683.1,y:13.55}).wait(1).to({graphics:mask_graphics_122,x:1698.3,y:13.55}).wait(1).to({graphics:mask_graphics_123,x:1713.55,y:13.55}).wait(1).to({graphics:mask_graphics_124,x:1728.8,y:13.55}).wait(1).to({graphics:mask_graphics_125,x:1744,y:13.55}).wait(1).to({graphics:mask_graphics_126,x:1759.25,y:13.55}).wait(1).to({graphics:mask_graphics_127,x:1774.5,y:13.55}).wait(1).to({graphics:mask_graphics_128,x:1789.7,y:13.55}).wait(1).to({graphics:mask_graphics_129,x:1804.9,y:13.55}).wait(1).to({graphics:mask_graphics_130,x:1820.15,y:13.55}).wait(1).to({graphics:mask_graphics_131,x:1835.4,y:13.55}).wait(1).to({graphics:mask_graphics_132,x:1850.6,y:13.55}).wait(1).to({graphics:mask_graphics_133,x:1865.85,y:13.55}).wait(1).to({graphics:mask_graphics_134,x:1881.05,y:13.55}).wait(1).to({graphics:mask_graphics_135,x:1896.3,y:13.55}).wait(1).to({graphics:mask_graphics_136,x:1911.55,y:13.55}).wait(1).to({graphics:mask_graphics_137,x:1926.75,y:13.55}).wait(1).to({graphics:mask_graphics_138,x:1942,y:13.55}).wait(1).to({graphics:mask_graphics_139,x:1957.25,y:13.55}).wait(1).to({graphics:mask_graphics_140,x:1972.45,y:13.55}).wait(1).to({graphics:mask_graphics_141,x:1987.65,y:13.55}).wait(1).to({graphics:mask_graphics_142,x:2002.9,y:13.55}).wait(1).to({graphics:mask_graphics_143,x:2018.15,y:13.55}).wait(1).to({graphics:mask_graphics_144,x:2033.35,y:13.55}).wait(1).to({graphics:mask_graphics_145,x:2048.6,y:13.55}).wait(1).to({graphics:mask_graphics_146,x:2063.8,y:13.55}).wait(1).to({graphics:mask_graphics_147,x:2079.05,y:13.55}).wait(1).to({graphics:mask_graphics_148,x:2094.25,y:13.55}).wait(1).to({graphics:mask_graphics_149,x:1111.75,y:13.55}).wait(1).to({graphics:mask_graphics_150,x:2094.35,y:13.55}).wait(1).to({graphics:mask_graphics_151,x:2079.25,y:13.55}).wait(1).to({graphics:mask_graphics_152,x:2064.1,y:13.55}).wait(1).to({graphics:mask_graphics_153,x:2049,y:13.55}).wait(1).to({graphics:mask_graphics_154,x:2033.85,y:13.55}).wait(1).to({graphics:mask_graphics_155,x:2018.75,y:13.55}).wait(1).to({graphics:mask_graphics_156,x:2003.6,y:13.55}).wait(1).to({graphics:mask_graphics_157,x:1988.5,y:13.55}).wait(1).to({graphics:mask_graphics_158,x:1973.35,y:13.55}).wait(1).to({graphics:mask_graphics_159,x:1958.25,y:13.55}).wait(1).to({graphics:mask_graphics_160,x:1943.1,y:13.55}).wait(1).to({graphics:mask_graphics_161,x:1927.95,y:13.55}).wait(1).to({graphics:mask_graphics_162,x:1912.85,y:13.55}).wait(1).to({graphics:mask_graphics_163,x:1897.7,y:13.55}).wait(1).to({graphics:mask_graphics_164,x:1882.6,y:13.55}).wait(1).to({graphics:mask_graphics_165,x:1867.45,y:13.55}).wait(1).to({graphics:mask_graphics_166,x:1852.35,y:13.55}).wait(1).to({graphics:mask_graphics_167,x:1837.25,y:13.55}).wait(1).to({graphics:mask_graphics_168,x:1822.1,y:13.55}).wait(1).to({graphics:mask_graphics_169,x:1806.95,y:13.55}).wait(1).to({graphics:mask_graphics_170,x:1791.85,y:13.55}).wait(1).to({graphics:mask_graphics_171,x:1776.7,y:13.55}).wait(1).to({graphics:mask_graphics_172,x:1761.55,y:13.55}).wait(1).to({graphics:mask_graphics_173,x:1746.45,y:13.55}).wait(1).to({graphics:mask_graphics_174,x:1731.3,y:13.55}).wait(1).to({graphics:mask_graphics_175,x:1716.2,y:13.55}).wait(1).to({graphics:mask_graphics_176,x:1701.1,y:13.55}).wait(1).to({graphics:mask_graphics_177,x:1685.95,y:13.55}).wait(1).to({graphics:mask_graphics_178,x:1670.85,y:13.55}).wait(1).to({graphics:mask_graphics_179,x:1655.7,y:13.55}).wait(1).to({graphics:mask_graphics_180,x:1640.55,y:13.55}).wait(1).to({graphics:mask_graphics_181,x:1625.45,y:13.55}).wait(1).to({graphics:mask_graphics_182,x:1610.3,y:13.55}).wait(1).to({graphics:mask_graphics_183,x:1595.2,y:13.55}).wait(1).to({graphics:mask_graphics_184,x:1580.05,y:13.55}).wait(1).to({graphics:mask_graphics_185,x:1564.9,y:13.55}).wait(1).to({graphics:mask_graphics_186,x:1549.8,y:13.55}).wait(1).to({graphics:mask_graphics_187,x:1534.7,y:13.55}).wait(1).to({graphics:mask_graphics_188,x:1519.55,y:13.55}).wait(1).to({graphics:mask_graphics_189,x:1504.45,y:13.55}).wait(1).to({graphics:mask_graphics_190,x:1489.3,y:13.55}).wait(1).to({graphics:mask_graphics_191,x:1474.15,y:13.55}).wait(1).to({graphics:mask_graphics_192,x:1459.05,y:13.55}).wait(1).to({graphics:mask_graphics_193,x:1443.9,y:13.55}).wait(1).to({graphics:mask_graphics_194,x:1428.8,y:13.55}).wait(1).to({graphics:mask_graphics_195,x:1413.65,y:13.55}).wait(1).to({graphics:mask_graphics_196,x:1398.5,y:13.55}).wait(1).to({graphics:mask_graphics_197,x:1383.4,y:13.55}).wait(1).to({graphics:mask_graphics_198,x:1368.3,y:13.55}).wait(1).to({graphics:mask_graphics_199,x:1353.15,y:13.55}).wait(1).to({graphics:mask_graphics_200,x:1338.05,y:13.55}).wait(1).to({graphics:mask_graphics_201,x:1322.9,y:13.55}).wait(1).to({graphics:mask_graphics_202,x:1307.75,y:13.55}).wait(1).to({graphics:mask_graphics_203,x:1292.65,y:13.55}).wait(1).to({graphics:mask_graphics_204,x:1277.5,y:13.55}).wait(1).to({graphics:mask_graphics_205,x:1262.4,y:13.55}).wait(1).to({graphics:mask_graphics_206,x:1247.25,y:13.55}).wait(1).to({graphics:mask_graphics_207,x:1232.1,y:13.55}).wait(1).to({graphics:mask_graphics_208,x:1217,y:13.55}).wait(1).to({graphics:mask_graphics_209,x:1201.9,y:13.55}).wait(1).to({graphics:mask_graphics_210,x:1186.75,y:13.55}).wait(1).to({graphics:mask_graphics_211,x:1171.65,y:13.55}).wait(1).to({graphics:mask_graphics_212,x:1156.5,y:13.55}).wait(1).to({graphics:mask_graphics_213,x:1141.35,y:13.55}).wait(1).to({graphics:mask_graphics_214,x:1126.25,y:13.55}).wait(1).to({graphics:mask_graphics_215,x:1111.1,y:13.55}).wait(1).to({graphics:mask_graphics_216,x:1096,y:13.55}).wait(1).to({graphics:mask_graphics_217,x:1080.85,y:13.55}).wait(1).to({graphics:mask_graphics_218,x:1065.7,y:13.55}).wait(1).to({graphics:mask_graphics_219,x:1050.65,y:13.55}).wait(1).to({graphics:mask_graphics_220,x:1035.5,y:13.55}).wait(1).to({graphics:mask_graphics_221,x:1020.35,y:13.55}).wait(1).to({graphics:mask_graphics_222,x:1005.25,y:13.55}).wait(1).to({graphics:mask_graphics_223,x:990.1,y:13.55}).wait(1).to({graphics:mask_graphics_224,x:975,y:13.55}).wait(1).to({graphics:mask_graphics_225,x:959.85,y:13.55}).wait(1).to({graphics:mask_graphics_226,x:944.7,y:13.55}).wait(1).to({graphics:mask_graphics_227,x:929.6,y:13.55}).wait(1).to({graphics:mask_graphics_228,x:914.45,y:13.55}).wait(1).to({graphics:mask_graphics_229,x:899.3,y:13.55}).wait(1).to({graphics:mask_graphics_230,x:884.25,y:13.55}).wait(1).to({graphics:mask_graphics_231,x:869.1,y:13.55}).wait(1).to({graphics:mask_graphics_232,x:853.95,y:13.55}).wait(1).to({graphics:mask_graphics_233,x:838.85,y:13.55}).wait(1).to({graphics:mask_graphics_234,x:823.7,y:13.55}).wait(1).to({graphics:mask_graphics_235,x:808.6,y:13.55}).wait(1).to({graphics:mask_graphics_236,x:793.45,y:13.55}).wait(1).to({graphics:mask_graphics_237,x:778.3,y:13.55}).wait(1).to({graphics:mask_graphics_238,x:763.2,y:13.55}).wait(1).to({graphics:mask_graphics_239,x:748.05,y:13.55}).wait(1).to({graphics:mask_graphics_240,x:732.95,y:13.55}).wait(1).to({graphics:mask_graphics_241,x:717.85,y:13.55}).wait(1).to({graphics:mask_graphics_242,x:702.7,y:13.55}).wait(1).to({graphics:mask_graphics_243,x:687.55,y:13.55}).wait(1).to({graphics:mask_graphics_244,x:672.45,y:13.55}).wait(1).to({graphics:mask_graphics_245,x:657.3,y:13.55}).wait(1).to({graphics:mask_graphics_246,x:642.2,y:13.55}).wait(1).to({graphics:mask_graphics_247,x:627.05,y:13.55}).wait(1).to({graphics:mask_graphics_248,x:611.9,y:13.55}).wait(1).to({graphics:mask_graphics_249,x:596.8,y:13.55}).wait(1).to({graphics:mask_graphics_250,x:581.65,y:13.55}).wait(1).to({graphics:mask_graphics_251,x:566.55,y:13.55}).wait(1).to({graphics:mask_graphics_252,x:551.45,y:13.55}).wait(1).to({graphics:mask_graphics_253,x:536.3,y:13.55}).wait(1).to({graphics:mask_graphics_254,x:521.15,y:13.55}).wait(1).to({graphics:mask_graphics_255,x:506.05,y:13.55}).wait(1).to({graphics:mask_graphics_256,x:490.9,y:13.55}).wait(1).to({graphics:mask_graphics_257,x:475.8,y:13.55}).wait(1).to({graphics:mask_graphics_258,x:460.65,y:13.55}).wait(1).to({graphics:mask_graphics_259,x:445.5,y:13.55}).wait(1).to({graphics:mask_graphics_260,x:430.4,y:13.55}).wait(1).to({graphics:mask_graphics_261,x:415.25,y:13.55}).wait(1).to({graphics:mask_graphics_262,x:400.15,y:13.55}).wait(1).to({graphics:mask_graphics_263,x:385.05,y:13.55}).wait(1).to({graphics:mask_graphics_264,x:369.9,y:13.55}).wait(1).to({graphics:mask_graphics_265,x:354.75,y:13.55}).wait(1).to({graphics:mask_graphics_266,x:339.65,y:13.55}).wait(1).to({graphics:mask_graphics_267,x:324.5,y:13.55}).wait(1).to({graphics:mask_graphics_268,x:309.4,y:13.55}).wait(1).to({graphics:mask_graphics_269,x:294.25,y:13.55}).wait(1).to({graphics:mask_graphics_270,x:279.1,y:13.55}).wait(1).to({graphics:mask_graphics_271,x:264,y:13.55}).wait(1).to({graphics:mask_graphics_272,x:248.85,y:13.55}).wait(1).to({graphics:mask_graphics_273,x:233.75,y:13.55}).wait(1).to({graphics:mask_graphics_274,x:218.65,y:13.55}).wait(1).to({graphics:mask_graphics_275,x:203.5,y:13.55}).wait(1).to({graphics:mask_graphics_276,x:188.4,y:13.55}).wait(1).to({graphics:mask_graphics_277,x:173.25,y:13.55}).wait(1).to({graphics:mask_graphics_278,x:158.1,y:13.55}).wait(1).to({graphics:mask_graphics_279,x:143,y:13.55}).wait(1).to({graphics:mask_graphics_280,x:127.85,y:13.55}).wait(1).to({graphics:mask_graphics_281,x:112.7,y:13.55}).wait(1).to({graphics:mask_graphics_282,x:97.6,y:13.55}).wait(1).to({graphics:mask_graphics_283,x:82.5,y:13.55}).wait(1).to({graphics:mask_graphics_284,x:67.35,y:13.55}).wait(1).to({graphics:mask_graphics_285,x:52.25,y:13.55}).wait(1).to({graphics:mask_graphics_286,x:37.1,y:13.55}).wait(1).to({graphics:mask_graphics_287,x:22,y:13.55}).wait(1).to({graphics:mask_graphics_288,x:6.85,y:13.55}).wait(1).to({graphics:mask_graphics_289,x:-8.3,y:13.55}).wait(1).to({graphics:mask_graphics_290,x:-23.4,y:13.55}).wait(1).to({graphics:mask_graphics_291,x:-38.55,y:13.55}).wait(1).to({graphics:mask_graphics_292,x:-53.65,y:13.55}).wait(1).to({graphics:mask_graphics_293,x:-68.8,y:13.55}).wait(1).to({graphics:mask_graphics_294,x:-83.9,y:13.55}).wait(1).to({graphics:mask_graphics_295,x:-99.05,y:13.55}).wait(1).to({graphics:mask_graphics_296,x:-114.15,y:13.55}).wait(1).to({graphics:mask_graphics_297,x:-129.3,y:13.55}).wait(1).to({graphics:mask_graphics_298,x:-144.4,y:13.55}).wait(1).to({graphics:mask_graphics_299,x:-136.775,y:13.55}).wait(1));

	// 상단_타이틀
	this.instance_2 = new lib.Path();
	this.instance_2.setTransform(1658.05,23.5,1,1,0,0,0,274.3,22.9);
	this.instance_2.alpha = 0.5;

	this.instance_3 = new lib.Path_1();
	this.instance_3.setTransform(1362.75,23.4);
	this.instance_3.alpha = 0.5;

	this.instance_4 = new lib.Path_2();
	this.instance_4.setTransform(1354.95,33.4);
	this.instance_4.alpha = 0.5;

	this.instance_5 = new lib.Path_3_1();
	this.instance_5.setTransform(1384,0.65);
	this.instance_5.alpha = 0.5;

	this.instance_6 = new lib.Path_4_1();
	this.instance_6.setTransform(567.5,11.15);
	this.instance_6.alpha = 0.5;

	this.instance_7 = new lib.Path_5_1();
	this.instance_7.setTransform(278.3,23.4,1,1,0,0,0,278.3,22.9);
	this.instance_7.alpha = 0.5;

	this.instance_8 = new lib.Path_6_1();
	this.instance_8.setTransform(971.05,23.8,1,1,0,0,0,414.7,23.4);
	this.instance_8.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_2,this.instance_3,this.instance_4,this.instance_5,this.instance_6,this.instance_7,this.instance_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8,p:{y:23.8}},{t:this.instance_7,p:{y:23.4}},{t:this.instance_6,p:{y:11.15}},{t:this.instance_5,p:{y:0.65}},{t:this.instance_4,p:{y:33.4}},{t:this.instance_3,p:{y:23.4}},{t:this.instance_2,p:{y:23.5}}]}).to({state:[{t:this.instance_8,p:{y:24.25}},{t:this.instance_7,p:{y:23.85}},{t:this.instance_6,p:{y:11.6}},{t:this.instance_5,p:{y:1.1}},{t:this.instance_4,p:{y:33.85}},{t:this.instance_3,p:{y:23.85}},{t:this.instance_2,p:{y:23.95}}]},299).wait(1));

	// 상단_타이틀
	this.instance_9 = new lib.Path_7();
	this.instance_9.setTransform(1659.05,23.4,1,1,0,0,0,274.3,22.9);
	this.instance_9.alpha = 0.5;

	this.instance_10 = new lib.Path_1_1();
	this.instance_10.setTransform(1363.75,23.3);
	this.instance_10.alpha = 0.5;

	this.instance_11 = new lib.Path_2_1();
	this.instance_11.setTransform(1355.95,33.3);
	this.instance_11.alpha = 0.5;

	this.instance_12 = new lib.Path_3();
	this.instance_12.setTransform(1385,0.55);
	this.instance_12.alpha = 0.5;

	this.instance_13 = new lib.Path_4();
	this.instance_13.setTransform(568.5,11.05);
	this.instance_13.alpha = 0.5;

	this.instance_14 = new lib.Path_5();
	this.instance_14.setTransform(279.3,23.3,1,1,0,0,0,278.3,22.9);
	this.instance_14.alpha = 0.5;

	this.instance_15 = new lib.Path_6();
	this.instance_15.setTransform(972.05,23.7,1,1,0,0,0,414.7,23.4);
	this.instance_15.alpha = 0.5;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9}]}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9}]},299).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(966,23.5,968.3,24.1);
// library properties:
lib.properties = {
	id: '6D12BB3A7B875D4585DF6945D4DF6CB6',
	width: 1934,
	height: 47,
	fps: 30,
	color: "#000000",
	opacity: 0.00,
	manifest: [
		{src:"/js/CODChart/contents/images/top_line_atlas_1.png", id:"top_line_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['6D12BB3A7B875D4585DF6945D4DF6CB6'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(stage, isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, adobeDashboardTop = adobeDashboardTop||{});
var createjs, adobeDashboardTop;



var CODChart= CODChart||{};
	
CODChart.DashboardTop = function () {

	var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation, div;

	this.getDiv = function()
	{
		div.startAnim = this.startAnim;
		return div;
	};

	this.startAnim = function()
	{
		fnStartAnimation();
	};
	
	this.graph_init = function(id, width,height) {

		var innerHTML = 
			"<div id='"+id+"' style='background-color:rgba(0, 0, 0, 0.00);'> " +
			"<canvas id='"+id+"_canvas' style='position: absolute; display: block; background-color:rgba(0, 0, 0, 0.00);'></canvas> " +
			"<div id='"+id+"_dom_overlay_container' style='pointer-events:none; overflow:hidden;  position: absolute; left: 0px; top: 0px; display: block;'></div> " +
			"</div> ";

		div = document.createElement( 'div' );
		div.innerHTML = innerHTML;       
		document.body.appendChild(div);

		div.style.position = 'absolute';
		div.style.top = '40px';

		canvas = document.getElementById(id+"_canvas");
		anim_container = document.getElementById(id);
		dom_overlay_container = document.getElementById(id+"_dom_overlay_container");

		var comp=adobeDashboardTop.getComposition("6D12BB3A7B875D4585DF6945D4DF6CB6");
		var lib=comp.getLibrary();
		var loader = new createjs.LoadQueue(false);
		loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
		loader.addEventListener("complete", function(evt){handleComplete(evt,comp,width,height)});
		var lib=comp.getLibrary();
		loader.loadManifest(lib.properties.manifest);
	}
	function handleFileLoad(evt, comp) {
		var images=comp.getImages();	
		if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
	}
	function handleComplete(evt,comp, width,height) {
		//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
		var lib=comp.getLibrary();
		var ss=comp.getSpriteSheet();
		var queue = evt.target;
		var ssMetadata = lib.ssMetadata;
		for(i=0; i<ssMetadata.length; i++) {
			ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
		}
		exportRoot = new lib.top_line();
		stage = new lib.Stage(canvas);	
		//Registers the "tick" event listener.
		fnStartAnimation = function() {
			stage.addChild(exportRoot);
			createjs.Ticker.framerate = lib.properties.fps;
			createjs.Ticker.addEventListener("tick", stage);
		}	    
		//Code to support hidpi screens and responsive scaling.
		var domContainers = [canvas,anim_container,dom_overlay_container];
		adobeDashboardTop.makeResponsive(stage, false,'both',false,1,domContainers);	
		adobeDashboardTop.compositionLoaded(lib.properties.id);
		
		
		domContainers.forEach(function(container) {				
			container.style.width = width * 1 + 'px';				
			container.style.height = height * 1 + 'px';			
		});			
		fnStartAnimation();
	}
}


