var GS_pickSqueez = Class.create({

	initialize: function(gameScreenObject) {
		this.gameScreenObject = gameScreenObject;
		this.nickname = '';
		this.choice = 'blue';
		this.InputNickname = new InputText(330,100,300,75,"#265325",12);
		this.btn_next = new Btn("next.png", 240, 80, 350, 450);
		this.eventHandler();

	},
	draw: function() {
		ctx.fillStyle = "rgb(200,200,200)";
		ctx.fillRect(0, 0, 980, 580);


		this.InputNickname.drawInputText();



		this.btn_next.drawBtnImg();
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
		if(this.btn_next.checkClick(e))
			gameApp.getGameScreen().switchGameScreen('battle');
	},
	eKey: function(e){

	}
});