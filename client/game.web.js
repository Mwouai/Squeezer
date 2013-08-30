var Game = Class.create({

	initialize: function() {
		//Connection au serveur node
		this.socket = io.connect('http://localhost:1337');
		this.gameScreen = new GameScreen();

    this.player = new Player();

    this.toWiretap();//On se met sur ecoute des evenement
  	},
    toWiretap: function(){
      this.socket.on('refreshXY', this.player.setXY);
    },
    getPlayer: function() {
      return this.player;
    },
  	getSocket: function() {
  		return this.socket;
  	},
  	getGameScreen: function() {
  		return this.gameScreen;
  	},
  	gameScreenChange: function(screenName) {
  		this.gameScreen.switchGameScreen(screenName);
  	},


});

var gameApp, engine;

jQuery(document).ready(function(){
	//Instance du game client
	gameApp = new Game();
	engine = new Engine(gameApp);
});