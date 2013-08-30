var GS_battle = Class.create({

	initialize: function(gameScreenObject) {
		this.gameScreenObject = gameScreenObject;
		this.eventHandler();
		
		
		this.click_x = null;
		this.click_y = null;
	},
	draw: function() {
		ctx.fillStyle = "rgb(8,8,8)";
		ctx.fillRect(0, 0, 980, 580);

		gameApp.getPlayer().draw();

	},
	update: function(){
		gameApp.getPlayer().update();
	},
	eventHandler: function(){
		c_game.unbind();
		c_game.click(function(e){
			this.eClick(e);
		}.bind(this));

		jQuery(document).keydown(function(e){
			gameApp.getPlayer().eKeyDown(e);
			gameApp.getSocket().emit('keyDown', e.keyCode);
		}.bind(this));

		jQuery(document).keyup(function(e){
			gameApp.getPlayer().eKeyUp(e);
			gameApp.getSocket().emit('keyUp', e.keyCode);
		}.bind(this));

	},
	eClick : function(e){
		this.click_x = e.pageX - e.target.offsetLeft;
      	this.click_y = e.pageY - e.target.offsetTop;
      	gameApp.getPlayer().toShoot(this.click_x, this.click_y);
	}
});


		