var Helper = Class.create({

  initialize: function() {

  },
  debug: function(object){
    for(var i in object)
      console.log('index : '+i);
  },
  drawText: function(text, color, font, x, y) {
    if(color == null)
      color = '#000';
    if(font == null)
      font = "bold 20px Pirulen Normal";

    ctx.shadowColor = null;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
  },
  drawTextNeon: function(text, color, font, x, y) {
    color = (color == null) ? '#000' : color;
    font = (font == null) ? "bold 20px Pirulen Normal" : font;

    ctx.fillStyle = color;
    ctx.font = font;

    ctx.shadowColor = color;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;
    
    ctx.fillText(text, x, y);
  },
  drawRect: function(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
  },
  drawRectNeon: function(x, y, w, h, color, border) {
    color = (color == null) ? '#c8c8c8' : color;
    border = (border == null) ? '#25a0a7' : border;

    ctx.beginPath();

    ctx.shadowColor = color;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;

    ctx.rect(x, y, w, h);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 3;

    ctx.strokeStyle = border;
    ctx.stroke();


  },
  drawImage: function(img, x , y) {
    drawImage(img, x, y);
  },
  drawCircle: function(x, y, color, radius) {
    color = (color == null) ? '#FFF' : color;
    radius = (radius == null) ? 70 : radius;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
  },
  xAxisCenter: function(object_width, container_width){
    console.log(object_width);
    return (container_width - object_width) / 2;
  }
});

var Helper = new Helper();