			function  move(el,dir,seed,destination,callback){ 
						let objel = document.getElementById(el);
						var initdir;
						var timer;
						 this.timer = setInterval(() =>{ 
							if('left right'.indexOf(dir) != -1 ){
								initdir = objel.offsetLeft;
								if(destination <= initdir){
									  seed = -Math.abs(seed);
									};
								objel.style.left = initdir +   seed +'px';
								if((destination > initdir && objel.offsetLeft >= destination ) || (destination < initdir && objel.offsetLeft <= destination )){
									objel.style.left = destination + 'px';
								};
								if(objel.offsetLeft == destination){
									clearInterval(this.timer);
								}	
						};
						callback&&callback();
						},
									 100
						);	
					}
		
				
				

			
		