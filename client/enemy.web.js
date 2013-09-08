var Enemy = Class.create({

	initialize: function(socketId) {
		this.socketId = socketId;
		this.x = null;
		this.y = null;
		this.size = 5;

		this.real_speed = 2.5;
		this.speed = this.real_speed;

		this.shoots = []; // LIMIT 5 SHOOT simultaneously
	},
	draw: function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y + 3, this.size, 0, 2* Math.PI, false);
		ctx.stroke();

		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 10;

		ctx.shadowColor = "blue";
		ctx.fillStyle = '#25A0A7'; //  blue

		ctx.fill();
		ctx.lineWidth = 1;

		ctx.stroke();
	},
	setXY: function(data){
		this.x = data.x;
		this.y = data.y;
	},
	getX: function(){
		return this.x;
	},
	getY: function(){
		return this.y;
	},
	getSocketId: function(){
		return this.socketId;
	}
});