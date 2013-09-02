var io = require('socket.io');
	prototype = require('prototype4node'),
	Player = require('./Player.node'),	
	players = {},
	everysecond = 0, second = 0;


var Server = Class.create({

	initialize: function(port) {
		this.port = port;
		this.socket = io.listen(port);
		this.gameInfos = {};

		this.FPS = 20;
		this.milliWait = 1000/this.FPS;

		this.prev_tick = new Date().getTime();
		this.ms = this.milliWait;
		this.serverLoop();

		this.socket.on("connection", this.onSocketConnection.bind(this));
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
			for(var i in players)
				players[i].getSocket().emit('refreshXY' ,{socketId: i,x : players[i].getX(), y : players[i].getY()} );
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

		//NEW PLAYER
		var p = new Player(client);
		players[client.id] = p;
		client.on('keyDown', players[client.id].eKeyDown.bind(p));
		client.on('keyUp', players[client.id].eKeyUp.bind(p));

		//SEND TO OTHER PLAYER'S
	}
});

var server = new Server(1337);
