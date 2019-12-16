(function(window){
	var self, wrapLeft,wraptop, timer;
	function Player(option){
		this._init(option);
	};
	Player.prototype = {
		constructor : Player,
		_init : function(option){
			this.option = option;
			this.el = option.el;
			this.flag = true;
			self = this;
			this.initer();
			this.funcall();
		},
		initer : function(){
			this.wraper = document.querySelector(this.el);
			wrapLeft = this.wraper.offsetLeft;
			wraptop = this.wraper.offsetTop;
			this.playbtn = this.wraper.querySelector('.right>.interface >.play-et>#play');
			this.audio = this.wraper.querySelector('audio');
			this.playbtnSvg = this.playbtn.querySelector('use');
			this.transImg = this.wraper.querySelector('.right>.trans>img');
			this.buff =  this.wraper.querySelector('.bufferbar');
			this.pbPointer = this.wraper.querySelector('.right>.interface >.procrssbar>#pro-bar>.pointer');
			this.pbfontBar =  this.pbPointer.parentNode.querySelector('.font-bar');
			this.volPointer = this.wraper.querySelector('.right>.interface >.volume>#v-pb>#point-v');
		},
		funcall :function(){
			this.playEct();
			this.proceBar();
			this.volpbar();
			this.loadBuffer();
		},
		playEct : function (){
			this.playbtn.onclick = this.myplay.bind(this);
		},
		myplay :function(){
			if(this.flag){
				this.playbar();
				this.transImg.classList.add('trans-img');
				this.transImg.style.animationPlayState ="running";
				this.playbtnSvg.setAttribute("xlink:href","#icon-play");
			}else{
				this.pausedbar();
				this.transImg.style.animationPlayState ="paused";
				this.playbtnSvg.setAttribute("xlink:href","#icon-pause");
			};
			this.flag = !this.flag;
		},
		proceBar : function(){
				draging( this.pbPointer, 'x', wrapLeft ,this.audio);
		},
		volpbar : function(){
				draging(this.volPointer, 'y' ,wraptop ,this.audio);
		},
		loadBuffer : function(){
		   
		  
		},
		playbar : function() {
			this.audio.play();
			_end(self.audio, self.pbfontBar , self.pbPointer, () => {
				while(!self.audio.paused){
					_end(self.audio, self.pbfontBar , self.pbPointer)
				}
			});
	
		},
		pausedbar : function() {
			this.audio.pause();
			_end(self.audio, self.pbfontBar , self.pbPointer);
		}
		
	};
	
	new Player({
		el:'.wrap'
	})
	
}(window));




/* 
  网易云音乐播放逻辑
  1.网速慢时:缓冲到canplay?才播放    ps.某个事件
  2.读取到duration 才可以拖拽进度条
  3.拖拽时不放 音乐流畅播放
  4.拖拽放开鼠标  缓冲到鼠标处一定范围 canplay 才播放
  5.播放时进度条照常滑动
  
 */