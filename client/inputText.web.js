var InputText = Class.create({
	initialize: function(x,y,width,height,color,limit) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
    this.limit = limit;

    this.txt = "";
  	},
  	drawInputText: function() {
  		Helper.drawRectNeon(this.x, this.y, this.width, this.height, null, null);
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