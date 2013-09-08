var io = require('socket.io');
	prototype = require('prototype4node'),
	Player = require('./Player.node'),	
	players = {},
	everysecond = 0, second = 0;


var Server = Class.create({

	initialize: function(port) {
		this.port = port;
		this.socket = io.listen(port);
		this.socket.set('log level', 1); // reduce logging

		this.FPS = 20;
		this.milliWait = 1000/this.FPS;

		this.prev_tick = new Date().getTime();
		this.ms = this.milliWait;
		this.serverLoop();

		this.socket.on("connection", this.onSocketConnection);
	},
	update: function(){
		for(var i in players){
			players[i].update();
		}
	},
	serverLoop: function(){
		this.update();



		if(everysecond == this.FPS){ // 1s
			console.log(second++);
			everysecond = 0;
		}

		if(everysecond % (this.FPS/10) == 0){ // 100ms
			//this.socket.emit('sendToAllXY', players);
			for(var i in players){
				players[i].getSocket().broadcast.emit('refreshAll' ,{socketId: i,x : players[i].getX(), y : players[i].getY()});
			}
		}

		everysecond++;
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
	  setTimeout(this.serverLoop.bind(this), this.ms);
	},
	
	onSocketConnection: function(client) {
		console.log("Connection to server successful. Player id : " + client.id);
		// Listen for client disconnected
		client.on("disconnect", server.onClientDisconnect);

		//NEW PLAYER
		var p = new Player(client);
		players[client.id] = p;
		client.emit('setSocketId', client.id);

		client.on('keyDown', players[client.id].eKeyDown.bind(p));
		client.on('keyUp', players[client.id].eKeyUp.bind(p));

		client.broadcast.emit('playerConnected', p.getSocket().id);

		
		//SEND TO OTHER PLAYER'S
		
	},
	onClientDisconnect: function(id){
		delete players[this.id];
		console.log(this.id +" has disconnect");
	},
	onPlayerConnected: function(socketId){
		console.log('id : '+socketId);
	},
	loadEnemies: function(){
		this.emit('onLoadEnemies', this.players);
	}
});

var server = new Server(1337);
