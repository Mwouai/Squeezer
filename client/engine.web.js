var stage;

var Engine = Class.create({

	initialize: function(gameInstance) {
		this.FPS = 60;
		this.milliWait = 1000/this.FPS;
		this.gameInstance = gameInstance;
		this.txtFPS = null;


		this.canvas = jQuery('#game');
		this.actualGS = gameInstance.getGameScreen();

		this.prev_tick = new Date().getTime();
		this.ms = this.milliWait;
		this.gameLoop();
	},
	gameLoop: function(){
		//AUTO RESIZE THE CANVAS
	  this.autoResize();
			
			//DRAW FPS
	  this.txtFPS = Math.round(1000/this.ms,0)+" fps";
	  Helper.drawText(this.txtFPS, null, null, 910, 20)

	  //GAME ENGINE
	  this.update(); // each 16ms
	  this.draw();
	  
	  //Interval entre les deux tick
	  this.tick = new Date().getTime();
	  this.lostTime = this.tick - this.prev_tick;
	  
	  if(this.lostTime > this.milliWait)
		this.ms = (this.milliWait *2) - this.lostTime;
	  else
		this.ms = this.milliWait - (this.milliWait - this.lostTime);

	  if(this.ms < 0)
		this.ms = 0;
	  this.prev_tick = new Date().getTime();

	  setTimeout(this.gameLoop.bind(this), this.ms);
	},
	update: function(){

		this.actualGS.update();
	},
	draw: function(){

	  	this.actualGS.draw();
	},
	autoResize : function(){
		this.w_h = window.innerHeight;
		this.w_w = window.innerWidth;
		this.mt = (this.w_h - CANVAS_HEIGHT)/2;
		this.ml = (this.w_w - CANVAS_WIDTH)/2;
		this.canvas.css("marginLeft" , this.ml);
		this.canvas.css("marginTop" , this.mt);
		this.margin_left = parseInt(this.canvas.css("marginLeft"));
		this.margin_top = parseInt(this.canvas.css("marginTop"));

	}

});

