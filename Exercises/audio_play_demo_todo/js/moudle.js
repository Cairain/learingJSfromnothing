(function(){
	var draging = function(el ,axis ,lf ,auDio ){
		let El = el;
		let parent = El.parentNode;
		let fb = axis === "x"?'.font-bar':"#v-font-bar";
		let fontbar = parent.querySelector(fb);
		let audio = auDio;
		let alltimes = audio.duration;
		var upSite;
		El.onmousedown = function(){	
			document.onmousemove = function(e){
				e = e||event;
				if(axis === "x"){
						if(!isNaN(alltimes)){
						let stanrdlf = lf+520;
						var elle = e.clientX - stanrdlf -15;
					if(elle<=0){
						El.style.left = 0+"px";
						fontbar.style.width = 0+"px";
						// audio.currentTime = 0;
						upSite = 0 ;
					}else if(elle>=560){
						El.style.left = 555+"px";
						fontbar.style.width = 560 +'px';
						// audio.currentTime = alltimes;
						upSite = 555;
					}else{
						El.style.left = elle+"px";
						fontbar.style.width = elle + 5 +'px';
						// audio.currentTime = (elle +5)/560 * alltimes;
						upSite = elle + 5;
						}
					}
					} else if (axis === 'y') {
						let stanrdlf = lf+400-27.5-45;
						var	ellt = stanrdlf - e.pageY -5 ;
							if(ellt<= 0){
								El.style.bottom = 0 +'px';
								fontbar.style.height = 0+'px'; 
							}
							else if(ellt>= 90){
								El.style.bottom = 90 +'px';
								fontbar.style.height = 90+'px'; 
							}else{
								El.style.bottom = ellt  +'px';
								fontbar.style.height =ellt+'px'; 
							}	
					};
				document.onmouseup = function(){
					if(!!upSite) {
						audio.currentTime = upSite *560/alltimes ;
					} 
					document.onmousemove = document.onmouseup = null;
				}	
			};
		}
	}
	
	
	window.draging = draging;
}());

(function(){
	var _end = function(audio,pbel,poel ,option) {
		var buf, now;
		alt = audio.duration
		if(audio.readyState === 4){
			if(!isNaN(alt)){
				audio.addEventListener('playing',() =>{
					poel.style.left = audio.currentTime/alt * 555 - 5 +'px';
					pbel.style.width = audio.currentTime/alt * 560 + 'px';
				} );
				audio.addEventListener('paused',() =>{
					poel.style.left = audio.currentTime/alt * 555 - 5 + 'px';
					pbel.style.width = audio.currentTime/alt * 560 + 'px';
				} )
				
			}
		}
		callback&&callback();
	}
	

	
	window._end = _end;
}());

(function(){
	var myajax = function(){
		
	}
	window.myajax = myajax;
}())