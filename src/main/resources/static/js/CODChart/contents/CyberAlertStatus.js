(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"file_01_atlas_1", frames: [[992,78,14,14],[876,150,114,72],[876,224,42,29],[1008,78,14,14],[920,224,42,29],[522,0,468,148],[0,617,519,168],[992,94,14,14],[1008,94,14,14],[964,224,42,29],[992,110,14,14],[876,255,42,29],[920,255,42,29],[964,255,33,33],[992,0,24,24],[522,150,352,119],[992,26,24,24],[992,52,24,24],[522,271,33,33],[0,0,520,615]]}
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



(lib.CachedBmp_21 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_153 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_139 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_152 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["file_01_atlas_1"]);
	this.gotoAndStop(19);
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


(lib.심볼5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_4 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_37 = new cjs.Graphics().p("ANpHMIAAhkIM0AAIAABkg");
	var mask_graphics_38 = new cjs.Graphics().p("AMsHOIAAh+INqAAIAAB+g");
	var mask_graphics_39 = new cjs.Graphics().p("ALvHPIAAiYIOgAAIAACYg");
	var mask_graphics_40 = new cjs.Graphics().p("AKyHQIAAixIPXAAIAACxg");
	var mask_graphics_41 = new cjs.Graphics().p("AJ1HSIAAjLIQNAAIAADLg");
	var mask_graphics_42 = new cjs.Graphics().p("AI4HTIAAjkIREAAIAADkg");
	var mask_graphics_43 = new cjs.Graphics().p("AH7HUIAAj+IR6AAIAAD+g");
	var mask_graphics_44 = new cjs.Graphics().p("AG9HWIAAkYISxAAIAAEYg");
	var mask_graphics_45 = new cjs.Graphics().p("AGAHXIAAkxIToAAIAAExg");
	var mask_graphics_46 = new cjs.Graphics().p("AFDHYIAAlLIUeAAIAAFLg");
	var mask_graphics_47 = new cjs.Graphics().p("AEGHaIAAllIVUAAIAAFlg");
	var mask_graphics_48 = new cjs.Graphics().p("ADJHbIAAl+IWLAAIAAF+g");
	var mask_graphics_49 = new cjs.Graphics().p("ACMHcIAAmXIXBAAIAAGXg");
	var mask_graphics_50 = new cjs.Graphics().p("ABPHeIAAmyIX3AAIAAGyg");
	var mask_graphics_51 = new cjs.Graphics().p("AARHfIAAnLIYvAAIAAHLg");
	var mask_graphics_52 = new cjs.Graphics().p("AgrHgIAAnjIZkAAIAAHjg");
	var mask_graphics_53 = new cjs.Graphics().p("AhoHiIAAn+IabAAIAAH+g");
	var mask_graphics_54 = new cjs.Graphics().p("AilHjIAAoXIbRAAIAAIXg");
	var mask_graphics_55 = new cjs.Graphics().p("AjiHkIAAowIcHAAIAAIwg");
	var mask_graphics_56 = new cjs.Graphics().p("AkfHlIAApJIc+AAIAAJJg");
	var mask_graphics_57 = new cjs.Graphics().p("AlcHnIAApkId0AAIAAJkg");
	var mask_graphics_58 = new cjs.Graphics().p("AmZHoIAAp9IeqAAIAAJ9g");
	var mask_graphics_59 = new cjs.Graphics().p("AnXHpIAAqWIfiAAIAAKWg");
	var mask_graphics_60 = new cjs.Graphics().p("AoUHrIAAqwMAgYAAAIAAKwg");
	var mask_graphics_61 = new cjs.Graphics().p("ApRHsIAArKMAhPAAAIAALKg");
	var mask_graphics_62 = new cjs.Graphics().p("AqOHtIAArjMAiFAAAIAALjg");
	var mask_graphics_63 = new cjs.Graphics().p("ArLHvIAAr9MAi7AAAIAAL9g");
	var mask_graphics_64 = new cjs.Graphics().p("AsIHwIAAsXMAjyAAAIAAMXg");
	var mask_graphics_65 = new cjs.Graphics().p("AtFHxIAAswMAkoAAAIAAMwg");
	var mask_graphics_66 = new cjs.Graphics().p("AuDHzIAAtKMAlfAAAIAANKg");
	var mask_graphics_67 = new cjs.Graphics().p("AvAH0IAAtjMAmWAAAIAANjg");
	var mask_graphics_68 = new cjs.Graphics().p("Av6H3IAAt+MAnMAAAIAAN+g");
	var mask_graphics_69 = new cjs.Graphics().p("AvTH3IAAt+MAl+AAAIAAN+g");
	var mask_graphics_70 = new cjs.Graphics().p("AusH3IAAt+MAkwAAAIAAN+g");
	var mask_graphics_71 = new cjs.Graphics().p("AuFH3IAAt+MAjjAAAIAAN+g");
	var mask_graphics_72 = new cjs.Graphics().p("AteH3IAAt+MAiVAAAIAAN+g");
	var mask_graphics_73 = new cjs.Graphics().p("As3H3IAAt+MAhHAAAIAAN+g");
	var mask_graphics_74 = new cjs.Graphics().p("AsQH3IAAt+If5AAIAAN+g");
	var mask_graphics_75 = new cjs.Graphics().p("ArqH3IAAt+IesAAIAAN+g");
	var mask_graphics_76 = new cjs.Graphics().p("ArDH3IAAt+IdeAAIAAN+g");
	var mask_graphics_77 = new cjs.Graphics().p("AqcH3IAAt+IcQAAIAAN+g");
	var mask_graphics_78 = new cjs.Graphics().p("Ap1H3IAAt+IbCAAIAAN+g");
	var mask_graphics_79 = new cjs.Graphics().p("ApOH3IAAt+IZ1AAIAAN+g");
	var mask_graphics_80 = new cjs.Graphics().p("AonH3IAAt+IYnAAIAAN+g");
	var mask_graphics_81 = new cjs.Graphics().p("AoAH3IAAt+IXZAAIAAN+g");
	var mask_graphics_82 = new cjs.Graphics().p("AnZH3IAAt+IWLAAIAAN+g");
	var mask_graphics_83 = new cjs.Graphics().p("AmzH3IAAt+IU+AAIAAN+g");
	var mask_graphics_84 = new cjs.Graphics().p("AmMH3IAAt+ITwAAIAAN+g");
	var mask_graphics_85 = new cjs.Graphics().p("AllH3IAAt+ISiAAIAAN+g");
	var mask_graphics_86 = new cjs.Graphics().p("Ak+H3IAAt+IRVAAIAAN+g");
	var mask_graphics_87 = new cjs.Graphics().p("AkXH3IAAt+IQHAAIAAN+g");
	var mask_graphics_88 = new cjs.Graphics().p("AjwH3IAAt+IO5AAIAAN+g");
	var mask_graphics_89 = new cjs.Graphics().p("AjJH3IAAt+INrAAIAAN+g");
	var mask_graphics_90 = new cjs.Graphics().p("AiiH3IAAt+IMdAAIAAN+g");
	var mask_graphics_91 = new cjs.Graphics().p("Ah7H3IAAt+ILPAAIAAN+g");
	var mask_graphics_92 = new cjs.Graphics().p("AhVH3IAAt+IKCAAIAAN+g");
	var mask_graphics_93 = new cjs.Graphics().p("AguH3IAAt+II0AAIAAN+g");
	var mask_graphics_94 = new cjs.Graphics().p("AgHH3IAAt+IHnAAIAAN+g");
	var mask_graphics_95 = new cjs.Graphics().p("AAfH3IAAt+IGaAAIAAN+g");
	var mask_graphics_96 = new cjs.Graphics().p("ABGH3IAAt+IFMAAIAAN+g");
	var mask_graphics_97 = new cjs.Graphics().p("ABtH3IAAt+ID+AAIAAN+g");
	var mask_graphics_98 = new cjs.Graphics().p("ACUH3IAAt+ICwAAIAAN+g");
	var mask_graphics_99 = new cjs.Graphics().p("AC6H3IAAt+IBjAAIAAN+g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(37).to({graphics:mask_graphics_37,x:169.2677,y:46.0484}).wait(1).to({graphics:mask_graphics_38,x:168.6047,y:46.1799}).wait(1).to({graphics:mask_graphics_39,x:167.9418,y:46.3114}).wait(1).to({graphics:mask_graphics_40,x:167.2788,y:46.4429}).wait(1).to({graphics:mask_graphics_41,x:166.6158,y:46.5744}).wait(1).to({graphics:mask_graphics_42,x:165.9529,y:46.7059}).wait(1).to({graphics:mask_graphics_43,x:165.2899,y:46.8374}).wait(1).to({graphics:mask_graphics_44,x:164.627,y:46.9689}).wait(1).to({graphics:mask_graphics_45,x:163.964,y:47.1004}).wait(1).to({graphics:mask_graphics_46,x:163.301,y:47.232}).wait(1).to({graphics:mask_graphics_47,x:162.6381,y:47.3635}).wait(1).to({graphics:mask_graphics_48,x:161.9751,y:47.495}).wait(1).to({graphics:mask_graphics_49,x:161.3122,y:47.6265}).wait(1).to({graphics:mask_graphics_50,x:160.6492,y:47.758}).wait(1).to({graphics:mask_graphics_51,x:159.9862,y:47.8895}).wait(1).to({graphics:mask_graphics_52,x:159.3233,y:48.021}).wait(1).to({graphics:mask_graphics_53,x:158.6603,y:48.1525}).wait(1).to({graphics:mask_graphics_54,x:157.9974,y:48.284}).wait(1).to({graphics:mask_graphics_55,x:157.3344,y:48.4155}).wait(1).to({graphics:mask_graphics_56,x:156.6714,y:48.547}).wait(1).to({graphics:mask_graphics_57,x:156.0085,y:48.6785}).wait(1).to({graphics:mask_graphics_58,x:155.3455,y:48.81}).wait(1).to({graphics:mask_graphics_59,x:154.6826,y:48.9415}).wait(1).to({graphics:mask_graphics_60,x:154.0196,y:49.073}).wait(1).to({graphics:mask_graphics_61,x:153.3567,y:49.2045}).wait(1).to({graphics:mask_graphics_62,x:152.6937,y:49.336}).wait(1).to({graphics:mask_graphics_63,x:152.0307,y:49.4675}).wait(1).to({graphics:mask_graphics_64,x:151.3678,y:49.599}).wait(1).to({graphics:mask_graphics_65,x:150.7048,y:49.7305}).wait(1).to({graphics:mask_graphics_66,x:150.0419,y:49.862}).wait(1).to({graphics:mask_graphics_67,x:149.3789,y:49.9935}).wait(1).to({graphics:mask_graphics_68,x:149.024,y:50.25}).wait(1).to({graphics:mask_graphics_69,x:145.1366,y:50.25}).wait(1).to({graphics:mask_graphics_70,x:141.2492,y:50.25}).wait(1).to({graphics:mask_graphics_71,x:137.3618,y:50.25}).wait(1).to({graphics:mask_graphics_72,x:133.4744,y:50.25}).wait(1).to({graphics:mask_graphics_73,x:129.5869,y:50.25}).wait(1).to({graphics:mask_graphics_74,x:125.6995,y:50.25}).wait(1).to({graphics:mask_graphics_75,x:121.8121,y:50.25}).wait(1).to({graphics:mask_graphics_76,x:117.9247,y:50.25}).wait(1).to({graphics:mask_graphics_77,x:114.0373,y:50.25}).wait(1).to({graphics:mask_graphics_78,x:110.1499,y:50.25}).wait(1).to({graphics:mask_graphics_79,x:106.2624,y:50.25}).wait(1).to({graphics:mask_graphics_80,x:102.375,y:50.25}).wait(1).to({graphics:mask_graphics_81,x:98.4876,y:50.25}).wait(1).to({graphics:mask_graphics_82,x:94.6002,y:50.25}).wait(1).to({graphics:mask_graphics_83,x:90.7128,y:50.25}).wait(1).to({graphics:mask_graphics_84,x:86.8253,y:50.25}).wait(1).to({graphics:mask_graphics_85,x:82.9379,y:50.25}).wait(1).to({graphics:mask_graphics_86,x:79.0505,y:50.25}).wait(1).to({graphics:mask_graphics_87,x:75.1631,y:50.25}).wait(1).to({graphics:mask_graphics_88,x:71.2757,y:50.25}).wait(1).to({graphics:mask_graphics_89,x:67.3883,y:50.25}).wait(1).to({graphics:mask_graphics_90,x:63.5008,y:50.25}).wait(1).to({graphics:mask_graphics_91,x:59.6134,y:50.25}).wait(1).to({graphics:mask_graphics_92,x:55.726,y:50.25}).wait(1).to({graphics:mask_graphics_93,x:51.8386,y:50.25}).wait(1).to({graphics:mask_graphics_94,x:47.9512,y:50.25}).wait(1).to({graphics:mask_graphics_95,x:44.0637,y:50.25}).wait(1).to({graphics:mask_graphics_96,x:40.1763,y:50.25}).wait(1).to({graphics:mask_graphics_97,x:36.2889,y:50.25}).wait(1).to({graphics:mask_graphics_98,x:32.4015,y:50.25}).wait(1).to({graphics:mask_graphics_99,x:28.504,y:50.25}).wait(1));

	// 격리_모드
	this.instance = new lib.CachedBmp_139();
	this.instance.setTransform(61.05,58.6,0.5,0.5);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(37).to({_off:false},0).wait(63));

	// 레이어_1 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_0 = new cjs.Graphics().p("ADmkMIAqAAIAAWLIgqAAg");
	var mask_1_graphics_1 = new cjs.Graphics().p("ADEkMIBtAAIAAWLIhtAAg");
	var mask_1_graphics_2 = new cjs.Graphics().p("ACikLICxAAIAAWLIixAAg");
	var mask_1_graphics_3 = new cjs.Graphics().p("ACAkLID0AAIAAWLIj0AAg");
	var mask_1_graphics_4 = new cjs.Graphics().p("ABekKIE3AAIAAWLIk3AAg");
	var mask_1_graphics_5 = new cjs.Graphics().p("AA7kKIF7AAIAAWLIl7AAg");
	var mask_1_graphics_6 = new cjs.Graphics().p("AAZkJIG/AAIAAWLIm/AAg");
	var mask_1_graphics_7 = new cjs.Graphics().p("AgIkJIIBAAIAAWLIoBAAg");
	var mask_1_graphics_8 = new cjs.Graphics().p("AgqkJIJEAAIAAWMIpEAAg");
	var mask_1_graphics_9 = new cjs.Graphics().p("AhMkIIKHAAIAAWLIqHAAg");
	var mask_1_graphics_10 = new cjs.Graphics().p("AhukIILLAAIAAWLIrLAAg");
	var mask_1_graphics_11 = new cjs.Graphics().p("AiQkHIMOAAIAAWLIsOAAg");
	var mask_1_graphics_12 = new cjs.Graphics().p("AiykHINRAAIAAWLItRAAg");
	var mask_1_graphics_13 = new cjs.Graphics().p("AjUkGIOUAAIAAWLIuUAAg");
	var mask_1_graphics_14 = new cjs.Graphics().p("Aj2kGIPYAAIAAWLIvYAAg");
	var mask_1_graphics_15 = new cjs.Graphics().p("AkYkFIQbAAIAAWLIwbAAg");
	var mask_1_graphics_16 = new cjs.Graphics().p("Ak6kFIReAAIAAWLIxeAAg");
	var mask_1_graphics_17 = new cjs.Graphics().p("AlckFIShAAIAAWMIyhAAg");
	var mask_1_graphics_18 = new cjs.Graphics().p("Al+kEITlAAIAAWLIzlAAg");
	var mask_1_graphics_19 = new cjs.Graphics().p("AmgkEIUoAAIAAWLI0oAAg");
	var mask_1_graphics_20 = new cjs.Graphics().p("AnCkDIVrAAIAAWLI1rAAg");
	var mask_1_graphics_21 = new cjs.Graphics().p("AnkkDIWuAAIAAWLI2uAAg");
	var mask_1_graphics_22 = new cjs.Graphics().p("AoGkCIXyAAIAAWLI3yAAg");
	var mask_1_graphics_23 = new cjs.Graphics().p("AopkCIY2AAIAAWLI42AAg");
	var mask_1_graphics_24 = new cjs.Graphics().p("ApLkBIZ5AAIAAWLI55AAg");
	var mask_1_graphics_25 = new cjs.Graphics().p("AptkBIa8AAIAAWLI68AAg");
	var mask_1_graphics_26 = new cjs.Graphics().p("AqPkBIcAAAIAAWMI8AAAg");
	var mask_1_graphics_27 = new cjs.Graphics().p("AqxkAIdDAAIAAWLI9DAAg");
	var mask_1_graphics_28 = new cjs.Graphics().p("ArTkAIeGAAIAAWLI+GAAg");
	var mask_1_graphics_29 = new cjs.Graphics().p("Ar1j/IfJAAIAAWLI/JAAg");
	var mask_1_graphics_30 = new cjs.Graphics().p("AsXj/MAgNAAAIAAWLMggNAAAg");
	var mask_1_graphics_31 = new cjs.Graphics().p("As5j+MAhQAAAIAAWLMghQAAAg");
	var mask_1_graphics_32 = new cjs.Graphics().p("Atbj+MAiTAAAIAAWLMgiTAAAg");
	var mask_1_graphics_33 = new cjs.Graphics().p("At9j+MAjWAAAIAAWMMgjWAAAg");
	var mask_1_graphics_34 = new cjs.Graphics().p("Aufj9MAkaAAAIAAWLMgkaAAAg");
	var mask_1_graphics_35 = new cjs.Graphics().p("AvBj9MAldAAAIAAWLMgldAAAg");
	var mask_1_graphics_36 = new cjs.Graphics().p("Avjj8MAmgAAAIAAWLMgmgAAAg");
	var mask_1_graphics_37 = new cjs.Graphics().p("AwFj8MAnjAAAIAAWLMgnjAAAg");
	var mask_1_graphics_38 = new cjs.Graphics().p("Awoj7MAonAAAIAAWLMgonAAAg");
	var mask_1_graphics_39 = new cjs.Graphics().p("AvFjiMAnEAAAIAAVZMgnEAAAg");
	var mask_1_graphics_40 = new cjs.Graphics().p("AtjjJMAliAAAIAAUmMgliAAAg");
	var mask_1_graphics_41 = new cjs.Graphics().p("AsAivMAj+AAAIAATzMgj+AAAg");
	var mask_1_graphics_42 = new cjs.Graphics().p("AqeiWMAicAAAIAATBMgicAAAg");
	var mask_1_graphics_43 = new cjs.Graphics().p("Ao8h9MAg6AAAIAASPMgg6AAAg");
	var mask_1_graphics_44 = new cjs.Graphics().p("AnZhjIfXAAIAARcI/XAAg");
	var mask_1_graphics_45 = new cjs.Graphics().p("Al3hKId0AAIAAQqI90AAg");
	var mask_1_graphics_46 = new cjs.Graphics().p("AkUgxIcRAAIAAP3I8RAAg");
	var mask_1_graphics_47 = new cjs.Graphics().p("AiygXIavAAIAAPEI6vAAg");
	var mask_1_graphics_48 = new cjs.Graphics().p("AhPABIZMAAIAAOTI5MAAg");
	var mask_1_graphics_49 = new cjs.Graphics().p("AASAaIXqAAIAANhI3qAAg");
	var mask_1_graphics_50 = new cjs.Graphics().p("AB1A0IWHAAIAAMuI2HAAg");
	var mask_1_graphics_51 = new cjs.Graphics().p("ADXBNIUlAAIAAL8I0lAAg");
	var mask_1_graphics_52 = new cjs.Graphics().p("AE6BmITCAAIAALJIzCAAg");
	var mask_1_graphics_53 = new cjs.Graphics().p("AGcCAIRfAAIAAKWIxfAAg");
	var mask_1_graphics_54 = new cjs.Graphics().p("AH/CZIP8AAIAAJkIv8AAg");
	var mask_1_graphics_55 = new cjs.Graphics().p("AJhCyIOaAAIAAIyIuaAAg");
	var mask_1_graphics_56 = new cjs.Graphics().p("ALDDMIM4AAIAAH/Is4AAg");
	var mask_1_graphics_57 = new cjs.Graphics().p("AMmDlILVAAIAAHNIrVAAg");
	var mask_1_graphics_58 = new cjs.Graphics().p("AOID+IJyAAIAAGaIpyAAg");
	var mask_1_graphics_59 = new cjs.Graphics().p("AOIEOIJyAAIAAF6IpyAAg");
	var mask_1_graphics_60 = new cjs.Graphics().p("AOIEfIJyAAIAAFZIpyAAg");
	var mask_1_graphics_61 = new cjs.Graphics().p("AOIEvIJyAAIAAE5IpyAAg");
	var mask_1_graphics_62 = new cjs.Graphics().p("AOIE/IJyAAIAAEZIpyAAg");
	var mask_1_graphics_63 = new cjs.Graphics().p("AOIFPIJyAAIAAD5IpyAAg");
	var mask_1_graphics_64 = new cjs.Graphics().p("AOIFfIJyAAIAADZIpyAAg");
	var mask_1_graphics_65 = new cjs.Graphics().p("AOIFvIJyAAIAAC5IpyAAg");
	var mask_1_graphics_66 = new cjs.Graphics().p("AOIGAIJyAAIAACYIpyAAg");
	var mask_1_graphics_67 = new cjs.Graphics().p("AOIGQIJyAAIAAB4IpyAAg");
	var mask_1_graphics_68 = new cjs.Graphics().p("AOIGgIJyAAIAABYIpyAAg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:27.211,y:115.1052}).wait(1).to({graphics:mask_1_graphics_1,x:30.5361,y:115.1493}).wait(1).to({graphics:mask_1_graphics_2,x:33.8612,y:115.1934}).wait(1).to({graphics:mask_1_graphics_3,x:37.1863,y:115.2375}).wait(1).to({graphics:mask_1_graphics_4,x:40.5114,y:115.2815}).wait(1).to({graphics:mask_1_graphics_5,x:43.8365,y:115.3256}).wait(1).to({graphics:mask_1_graphics_6,x:47.1616,y:115.3697}).wait(1).to({graphics:mask_1_graphics_7,x:50.4867,y:115.4138}).wait(1).to({graphics:mask_1_graphics_8,x:53.8118,y:115.4578}).wait(1).to({graphics:mask_1_graphics_9,x:57.1369,y:115.5019}).wait(1).to({graphics:mask_1_graphics_10,x:60.462,y:115.546}).wait(1).to({graphics:mask_1_graphics_11,x:63.7871,y:115.5901}).wait(1).to({graphics:mask_1_graphics_12,x:67.1122,y:115.6342}).wait(1).to({graphics:mask_1_graphics_13,x:70.4373,y:115.6782}).wait(1).to({graphics:mask_1_graphics_14,x:73.7624,y:115.7223}).wait(1).to({graphics:mask_1_graphics_15,x:77.0875,y:115.7664}).wait(1).to({graphics:mask_1_graphics_16,x:80.4126,y:115.8105}).wait(1).to({graphics:mask_1_graphics_17,x:83.7377,y:115.8546}).wait(1).to({graphics:mask_1_graphics_18,x:87.0628,y:115.8986}).wait(1).to({graphics:mask_1_graphics_19,x:90.3879,y:115.9427}).wait(1).to({graphics:mask_1_graphics_20,x:93.713,y:115.9868}).wait(1).to({graphics:mask_1_graphics_21,x:97.0381,y:116.0309}).wait(1).to({graphics:mask_1_graphics_22,x:100.3632,y:116.075}).wait(1).to({graphics:mask_1_graphics_23,x:103.6883,y:116.119}).wait(1).to({graphics:mask_1_graphics_24,x:107.0134,y:116.1631}).wait(1).to({graphics:mask_1_graphics_25,x:110.3385,y:116.2072}).wait(1).to({graphics:mask_1_graphics_26,x:113.6636,y:116.2513}).wait(1).to({graphics:mask_1_graphics_27,x:116.9887,y:116.2953}).wait(1).to({graphics:mask_1_graphics_28,x:120.3138,y:116.3394}).wait(1).to({graphics:mask_1_graphics_29,x:123.6389,y:116.3835}).wait(1).to({graphics:mask_1_graphics_30,x:126.964,y:116.4276}).wait(1).to({graphics:mask_1_graphics_31,x:130.2891,y:116.4717}).wait(1).to({graphics:mask_1_graphics_32,x:133.6142,y:116.5157}).wait(1).to({graphics:mask_1_graphics_33,x:136.9393,y:116.5598}).wait(1).to({graphics:mask_1_graphics_34,x:140.2644,y:116.6039}).wait(1).to({graphics:mask_1_graphics_35,x:143.5895,y:116.648}).wait(1).to({graphics:mask_1_graphics_36,x:146.9146,y:116.6921}).wait(1).to({graphics:mask_1_graphics_37,x:150.2397,y:116.7361}).wait(1).to({graphics:mask_1_graphics_38,x:153.5107,y:116.7802}).wait(1).to({graphics:mask_1_graphics_39,x:153.4866,y:114.2631}).wait(1).to({graphics:mask_1_graphics_40,x:153.4625,y:111.746}).wait(1).to({graphics:mask_1_graphics_41,x:153.4384,y:109.2289}).wait(1).to({graphics:mask_1_graphics_42,x:153.4144,y:106.7118}).wait(1).to({graphics:mask_1_graphics_43,x:153.3903,y:104.1947}).wait(1).to({graphics:mask_1_graphics_44,x:153.3662,y:101.6776}).wait(1).to({graphics:mask_1_graphics_45,x:153.3421,y:99.1605}).wait(1).to({graphics:mask_1_graphics_46,x:153.3181,y:96.6434}).wait(1).to({graphics:mask_1_graphics_47,x:153.294,y:94.1264}).wait(1).to({graphics:mask_1_graphics_48,x:153.2699,y:91.6093}).wait(1).to({graphics:mask_1_graphics_49,x:153.2458,y:89.0922}).wait(1).to({graphics:mask_1_graphics_50,x:153.2217,y:86.5751}).wait(1).to({graphics:mask_1_graphics_51,x:153.1977,y:84.058}).wait(1).to({graphics:mask_1_graphics_52,x:153.1736,y:81.5409}).wait(1).to({graphics:mask_1_graphics_53,x:153.1495,y:79.0238}).wait(1).to({graphics:mask_1_graphics_54,x:153.1254,y:76.5067}).wait(1).to({graphics:mask_1_graphics_55,x:153.1014,y:73.9896}).wait(1).to({graphics:mask_1_graphics_56,x:153.0773,y:71.4725}).wait(1).to({graphics:mask_1_graphics_57,x:153.0532,y:68.9554}).wait(1).to({graphics:mask_1_graphics_58,x:153.0291,y:66.4383}).wait(1).to({graphics:mask_1_graphics_59,x:153.0291,y:64.8317}).wait(1).to({graphics:mask_1_graphics_60,x:153.0291,y:63.225}).wait(1).to({graphics:mask_1_graphics_61,x:153.0291,y:61.6184}).wait(1).to({graphics:mask_1_graphics_62,x:153.0291,y:60.0118}).wait(1).to({graphics:mask_1_graphics_63,x:153.0291,y:58.4051}).wait(1).to({graphics:mask_1_graphics_64,x:153.0291,y:56.7985}).wait(1).to({graphics:mask_1_graphics_65,x:153.0291,y:55.1918}).wait(1).to({graphics:mask_1_graphics_66,x:153.0291,y:53.5852}).wait(1).to({graphics:mask_1_graphics_67,x:153.0291,y:51.9786}).wait(1).to({graphics:mask_1_graphics_68,x:153.0291,y:50.3719}).wait(32));

	// 레이어_9
	this.instance_1 = new lib.CachedBmp_139();
	this.instance_1.setTransform(61.05,58.6,0.5,0.5);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},69).wait(31));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,295.1,132.6);


(lib.Path_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,12,12), null);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-0.35,-0.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(-0.3,-0.3,16.5,16.5), null);


(lib.Path_2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance_1 = new lib.CachedBmp_8();
	this.instance_1.setTransform(-0.05,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_1, new cjs.Rectangle(0,0,12,12), null);


(lib.Path_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance_1 = new lib.CachedBmp_9();
	this.instance_1.setTransform(-0.35,-0.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_1, new cjs.Rectangle(-0.3,-0.3,16.5,16.5), null);


(lib.Path_2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance_2 = new lib.CachedBmp_10();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_2, new cjs.Rectangle(0,0,12,12), null);


(lib.Path_1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance_2 = new lib.CachedBmp_5();
	this.instance_2.setTransform(-0.35,-0.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_2, new cjs.Rectangle(-0.3,-0.4,16.5,16.5), null);


(lib.Path_2_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance_3 = new lib.CachedBmp_4();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_3, new cjs.Rectangle(0,0,12,12), null);


(lib.Path_1_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance_3 = new lib.CachedBmp_9();
	this.instance_3.setTransform(-0.35,-0.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_3, new cjs.Rectangle(-0.3,-0.3,16.5,16.5), null);


(lib.Path_2_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance_4 = new lib.CachedBmp_8();
	this.instance_4.setTransform(-0.05,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_4, new cjs.Rectangle(0,0,12,12), null);


(lib.Path_1_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 레이어_1
	this.instance_4 = new lib.CachedBmp_9();
	this.instance_4.setTransform(-0.35,-0.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_4, new cjs.Rectangle(-0.3,-0.3,16.5,16.5), null);


(lib.심볼3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 격리_모드
	this.instance = new lib.CachedBmp_152();
	this.instance.setTransform(-89.05,22.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(100));

	// 레이어_9
	this.instance_1 = new lib.CachedBmp_13();
	this.instance_1.setTransform(127,66.1,0.5,0.5);

	this.instance_2 = new lib.Path_1_1();
	this.instance_2.setTransform(130.65,69.7,1,1,0,0,0,7.8,7.8);
	this.instance_2.alpha = 0.5;

	this.instance_3 = new lib.Path_2_1();
	this.instance_3.setTransform(129.75,69.7,1,1,0,0,0,5,5.9);
	this.instance_3.alpha = 0.5;

	this.instance_4 = new lib.CachedBmp_12();
	this.instance_4.setTransform(120.1,79.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]}).wait(100));

	// 레이어_9
	this.instance_5 = new lib.CachedBmp_15();
	this.instance_5.setTransform(89.35,91.1,0.5,0.5);

	this.instance_6 = new lib.Path_1_2();
	this.instance_6.setTransform(92.95,94.75,1,1,0,0,0,7.8,7.8);
	this.instance_6.alpha = 0.5;

	this.instance_7 = new lib.Path_2_2();
	this.instance_7.setTransform(92.95,94.7,1,1,0,0,0,5.9,5.9);
	this.instance_7.alpha = 0.5;

	this.instance_8 = new lib.CachedBmp_14();
	this.instance_8.setTransform(69.2,106.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5}]}).wait(100));

	// 레이어_9
	this.instance_9 = new lib.CachedBmp_17();
	this.instance_9.setTransform(2.25,103.55,0.5,0.5);

	this.instance_10 = new lib.Path_1_3();
	this.instance_10.setTransform(5.9,107.15,1,1,0,0,0,7.8,7.8);
	this.instance_10.alpha = 0.5;

	this.instance_11 = new lib.Path_2_3();
	this.instance_11.setTransform(5.9,107.15,1,1,0,0,0,5.9,5.9);
	this.instance_11.alpha = 0.5;

	this.instance_12 = new lib.CachedBmp_16();
	this.instance_12.setTransform(-4.65,115.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9}]}).wait(100));

	// 레이어_9
	this.instance_13 = new lib.CachedBmp_19();
	this.instance_13.setTransform(-86.95,91.1,0.5,0.5);

	this.instance_14 = new lib.Path_1_4();
	this.instance_14.setTransform(-83.3,94.7,1,1,0,0,0,7.8,7.8);
	this.instance_14.alpha = 0.5;

	this.instance_15 = new lib.Path_2_4();
	this.instance_15.setTransform(-84.2,94.7,1,1,0,0,0,5,5.9);
	this.instance_15.alpha = 0.5;

	this.instance_16 = new lib.CachedBmp_18();
	this.instance_16.setTransform(-84.6,107.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13}]}).wait(100));

	// 레이어_9
	this.instance_17 = new lib.CachedBmp_21();
	this.instance_17.setTransform(-130.05,66.1,0.5,0.5);

	this.instance_18 = new lib.Path_1();
	this.instance_18.setTransform(-126.45,69.7,1,1,0,0,0,7.8,7.8);
	this.instance_18.alpha = 0.5;

	this.instance_19 = new lib.Path_2();
	this.instance_19.setTransform(-126.45,70.5,1,1,0,0,0,5.9,6.7);
	this.instance_19.alpha = 0.5;

	this.instance_20 = new lib.CachedBmp_20();
	this.instance_20.setTransform(-137.9,78.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17}]}).wait(100));

	// 레이어_2
	this.instance_21 = new lib.CachedBmp_153();
	this.instance_21.setTransform(-27.7,21.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(100));

	// 레이어_13
	this.instance_22 = new lib.심볼5("synched",0);
	this.instance_22.setTransform(-167.25,-21.6,1,1,0,0,0,11.5,11.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(100));

	// 레이어_1
	this.instance_23 = new lib.CachedBmp_24();
	this.instance_23.setTransform(-127.1,23.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(100));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-137.9,21.6,279,108.9);


// stage content:
(lib.file_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(101));

	// 레이어_9
	this.instance = new lib.심볼3("synched",0);
	this.instance.setTransform(241.8,37.9,0.9046,0.9046,0,0,0,129.4,41.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(101));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(126,85,126.4,33.400000000000006);
// library properties:
lib.properties = {
	id: '3C762DF11E974B468E776B2165621171',
	width: 252,
	height: 130,
	fps: 30,
	color: "#000000",
	opacity: 0.00,
	manifest: [
		{src:"/js/CODChart/contents/images/file_01_atlas_1.png", id:"file_01_atlas_1"}
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
an.compositions['3C762DF11E974B468E776B2165621171'] = {
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


})(createjs = createjs||{}, adobeCyberAlertStatus = adobeCyberAlertStatus||{});
var createjs, adobeCyberAlertStatus;


var CODChart= CODChart||{};
	
CODChart.CyberAlertStatus = function () {

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
		div.style.top = '0px';

		canvas = document.getElementById(id+"_canvas");
		anim_container = document.getElementById(id);
		dom_overlay_container = document.getElementById(id+"_dom_overlay_container");

		var comp=adobeCyberAlertStatus.getComposition("3C762DF11E974B468E776B2165621171");
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
	function handleComplete(evt,comp,width,height) {
		//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
		var lib=comp.getLibrary();
		var ss=comp.getSpriteSheet();
		var queue = evt.target;
		var ssMetadata = lib.ssMetadata;
		for(i=0; i<ssMetadata.length; i++) {
			ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
		}
		exportRoot = new lib.file_01();
		stage = new lib.Stage(canvas);	
		//Registers the "tick" event listener.
		fnStartAnimation = function() {
			stage.addChild(exportRoot);
			createjs.Ticker.framerate = lib.properties.fps;
			createjs.Ticker.addEventListener("tick", stage);
		}	    
		//Code to support hidpi screens and responsive scaling.
		var domContainers = [canvas,anim_container,dom_overlay_container];
		adobeCyberAlertStatus.makeResponsive(stage, false,'both',false,1,domContainers);	
		adobeCyberAlertStatus.compositionLoaded(lib.properties.id);

		domContainers.forEach(function(container) {				
			container.style.width = width * 1 + 'px';				
			container.style.height = height * 1 + 'px';			
		});			
		fnStartAnimation();
	}
}
