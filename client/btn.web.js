var Btn = Class.create({
	initialize: function(src, width, height, x ,y) {
		this.img = new Image();
		this.img.src = "./client/img/"+src;
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;

    this.click_x = null;
    this.click_y = null;
  	},
  	drawBtnImg: function() {
  		ctx.drawImage(this.img, this.x, this.y);
  	},
    checkClick: function(e){
      this.click_x = e.pageX - e.target.offsetLeft;
      this.click_y = e.pageY - e.target.offsetTop;
      //Si on a bien cliquer dessus :
      if( this.click_x > this.x  && this.click_x < (this.x + this.width) && this.click_y > this.y  && this.click_y < (this.y + this.height)){
        return true;
      }else
        return false;
    }
});