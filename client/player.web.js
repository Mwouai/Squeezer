var Player = Class.create({

	initialize: function() {
		this.socketId = null;
		this.x = 100;
		this.y = 270;
		this.size = 5;

		this.keys = [];
		this.keys.up = false;
		this.keys.right = false;
		this.keys.down = false;
		this.keys.left = false;

		this.linear_speed = 2.5;
		this.diag_speed = Math.sqrt(this.linear_speed);
		

		this.shoots = []; // LIMIT 5 SHOOT simultaneously
	},
	update: function(){
		if(this.keys.up)
			this.y -= this.speed;
		else if(this.keys.down)
			this.y += this.speed;
		
		if(this.keys.left)
			this.x -= this.speed;
		else if(this.keys.right)
			this.x += this.speed;

		if((this.keys.up || this.keys.down) && (this.keys.left || this.keys.right)){
			//console.log(this.x+" et "+this.y);
			this.speed = this.diag_speed;
		}else
			this.speed = this.linear_speed;
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
	getSocketId: function(){
		return this.socketId;
	},
	setSocketId: function(socketId){
		this.socketId = socketId;
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
	eKeyDown: function(e){
		if(!this.keys.up && (e.keyCode == 90 || e.keyCode == 38)){ // UP
			this.keys.up = true;
			gameApp.getSocket().emit('keyDown', e.keyCode);
		}
		if(!this.keys.right && (e.keyCode == 68 || e.keyCode == 39)){ // RIGHT
			this.keys.right = true;
			gameApp.getSocket().emit('keyDown', e.keyCode);
		}
		if(!this.keys.down && (e.keyCode == 83 || e.keyCode == 40)){ // DOWN
			this.keys.down = true;
			gameApp.getSocket().emit('keyDown', e.keyCode);
		}
		if(!this.keys.left && (e.keyCode == 81 || e.keyCode == 37)){ // LEFT
			this.keys.left = true;
			gameApp.getSocket().emit('keyDown', e.keyCode);
		}
	},
	eKeyUp: function(e){
		if(this.keys.up && (e.keyCode == 90 || e.keyCode == 38)){ // UP
			this.keys.up = false;
			gameApp.getSocket().emit('keyUp', e.keyCode);
		}
		if(this.keys.right && (e.keyCode == 68 || e.keyCode == 39)){ // RIGHT
			this.keys.right = false;
			gameApp.getSocket().emit('keyUp', e.keyCode);
		}
		if(this.keys.down && (e.keyCode == 83 || e.keyCode == 40)){ // DOWN
			this.keys.down = false;
			gameApp.getSocket().emit('keyUp', e.keyCode);
		}
		if(this.keys.left && (e.keyCode == 81 || e.keyCode == 37)){ // LEFT
			this.keys.left = false;
			gameApp.getSocket().emit('keyUp', e.keyCode);
		}
	},
	toShoot: function(c_x, c_y){
		for(var i = 1; i < 6; i++){
			if(this.shoots[i] == null){
				this.shoots[i] = new Shoot(this.x, this.y, c_x, c_y);
			}
		}
	}
});