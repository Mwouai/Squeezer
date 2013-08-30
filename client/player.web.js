var Player = Class.create({

	initialize: function() {
		this.x = null;
		this.y = null;
		this.size = 5;

		this.keys = [];
		this.keys.up = false;
		this.keys.right = false;
		this.keys.down = false;
		this.keys.left = false;


		this.real_speed = 2.5;
		this.speed = this.real_speed;

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
			this.speed = Math.sqrt(this.real_speed);
		}else
			this.speed = this.real_speed;
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
	eKeyDown: function(e){
		switch(e.keyCode){
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
	eKeyUp: function(e){
		switch(e.keyCode){
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
	toShoot: function(c_x, c_y){
		for(var i = 1; i < 6; i++){
			if(this.shoots[i] == null){
				this.shoots[i] = new Shoot(this.x, this.y, c_x, c_y);
			}
		}
	}
});