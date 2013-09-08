var Game = Class.create({

	initialize: function() {
		//Connection au serveur node
		this.socket = io.connect('http://localhost:1337');
		this.gameScreen = new GameScreen();
    this.player = new Player();
    this.enemies = {};
    this.toWiretap();//On se met sur ecoute des evenement
  	},
    toWiretap: function(){
      this.socket.on('setSocketId', this.onSetSocketId.bind(this));
      this.socket.on('refreshAll', this.refreshAll.bind(this));
      this.socket.on('playerConnected', this.playerConnected.bind(this));
    },
    onSetSocketId: function(socketId){
      this.player.setSocketId(socketId);
    },
    getPlayer: function() {
      return this.player;
    },
    getEnemies: function() {
      return this.enemies;
    },
    getEnemy: function(socketId){
      for(var i in this.enemies){
        if(i == socketId)
          return this.enemies[i];
      }
      return false;
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
    playerConnected: function(socketId){
      console.log('New Enemy has connected');
      this.enemies[socketId] = new Enemy(socketId);
      //Helper.debug(enemies);
    },
    refreshAll : function(data){
      if(!this.getEnemy(data.socketId)){
        console.log('personne');
      }else{
        console.log('qqu');
      }
      //console.log(data.socketId+' x:'+data.x);
      this.enemies[data.socketId].setXY(data);
    },
    refreshPlayer: function(player){
      this.player.setXY(player);
    }


});

var gameApp, engine;

jQuery(document).ready(function(){
	//Instance du game client
	gameApp = new Game();
	engine = new Engine(gameApp);
});