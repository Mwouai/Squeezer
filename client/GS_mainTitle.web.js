var GS_mainTitle = Class.create({

	initialize: function(gameScreenObject) {
		this.gameScreenObject = gameScreenObject;
		this.btn_start = new Btn("start.png", 240, 80, 350, 200);
		this.eventHandler();
	},
	draw: function() {
		ctx.fillStyle = "rgb(200,200,200)";
		ctx.fillRect(0, 0, 980, 580);

		//Helper.drawTextNeon('START',"#ff0", "bold 20px Pirulen Normal",100, 100);
		this.btn_start.drawBtnImg();
	},
	update: function(){

	},
	eventHandler: function(){
		c_game.unbind();
		c_game.click(function(e){
			this.eClick(e);
		}.bind(this));
	},
	eClick : function(e){
		if(this.btn_start.checkClick(e))
			gameApp.getGameScreen().switchGameScreen('pickSqueez');
	}
});