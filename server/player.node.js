var Player = Class.create({

	initialize: function(socket) {
		this.socket = socket;
		this.x = 100;
		this.y = 270;

		this.keys = [];
		this.keys.up = false;
		this.keys.right = false;
		this.keys.down = false;
		this.keys.left = false;

		this.linear_speed = 7.5;
		this.diag_speed = Math.sqrt(this.linear_speed);
		
	},
	getSocket: function(){
		return this.socket;
	},
	getX: function(){
		return this.x;
	},
	getY: function(){
		return this.y;
	},
	update: function(){
		//this.speed = 5;
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

	eKeyDown: function(keyCode){
		switch(keyCode){
			case 38: case 90: // UP
				this.keys.up = true;
				break;
			case 39: case 68: // RIGHT
				this.keys.right = true;
				break;
			case 40: case 83: // DOWN
				this.keys.down = true;
				break;
			case 37: case 81: // LEFT
				this.keys.left = true;
				break;
		}
	},
	eKeyUp: function(keyCode){
		console.log('lache');
		switch(keyCode){
			case 38: case 90: // UP
				this.keys.up = false;
				break;
			case 39: case 68: // RIGHT
				this.keys.right = false;
				break;
			case 40: case 83: // DOWN
				this.keys.down = false;
				break;
			case 37: case 81: // LEFT
				this.keys.left = false;
				break;
		}
	},
});

module.exports = Player;
