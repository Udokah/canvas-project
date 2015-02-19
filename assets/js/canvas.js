/* Create the Canvas Class here */
var CanvasClass = function(canvasObject){
    this.canvas = canvasObject ; // canvas object
    this.radius = 10;
    this.shapeSize = 100;
    this.context = this.canvas.getContext('2d');
    this.context.lineWidth = this.radius * 2 ;
    this.drawMode = 'Pencil' ;
};


CanvasClass.prototype.initialize = function(){
    /* Set the stroke width */
    this.setStrokeWidth(document.getElementById('strokeRadius').value);
};

CanvasClass.prototype.bindDrawingModesChangeListener = function(){
    var $this = this ;
    var items = document.getElementsByClassName('drawer');

    var binder = function(){
        $this.drawMode = this.getAttribute("data-title");
        var strokeColor = document.getElementById('strokeColor').value ;
        var fillColor = document.getElementById('fillColor').value ;
        $this.setFillcolor(fillColor);
        $this.setStrokeColor(strokeColor);
    };

    for(var i=0; i<items.length; i++){
        items[i].addEventListener('click', binder, false);
    }

};

CanvasClass.prototype.bindSettingsChangeListenters = function(){
    var $this = this ;

    /* Clear the canvas for a new drawing */
    document.getElementById('clearScreen').addEventListener('click', function(){
        $this.context.clearRect(0, 0, $this.canvas.width, $this.canvas.height);
    });

    /* setup eraser */
    document.getElementById('eraser').addEventListener('click', function(){
        $this.drawMode = this.getAttribute("data-title");
    });


    /* Set stroke and fill when pencil is clicked */
    document.getElementById('pencilDraw').addEventListener('click', function(){
        var pencilColor = document.getElementById('pencilColor').value ;
        $this.drawMode = this.getAttribute("data-title");
        $this.setFillcolor(pencilColor);
        $this.setStrokeColor(pencilColor);
    });

    /* Stroke width change */
    document.getElementById('strokeRadius').addEventListener('change', function(){
        $this.setStrokeWidth(this.value);
    });

    /* Stroke color change */
    document.getElementById('strokeColor').addEventListener('change', function(){
        $this.setStrokeColor(this.value);
    });

    /* fill color change */
    document.getElementById('fillColor').addEventListener('change', function(){
        $this.setFillcolor(this.value);
    });

    /* pencil color change */
    document.getElementById('pencilColor').addEventListener('change', function(){
        $this.setFillcolor(this.value);
        $this.setStrokeColor(this.value);
    });
};

CanvasClass.prototype.setStrokeColor = function(color){
    this.context.strokeStyle = color ;
};

CanvasClass.prototype.setFillcolor = function(color){
    this.context.fillStyle = color ;
};

CanvasClass.prototype.setStrokeWidth = function(size){
    this.radius = size ;
    this.context.lineWidth = this.radius * 2 ;
    var counter = document.getElementById('widthCount') ;
    counter.innerHTML = size ;
};

CanvasClass.prototype.saveImage = function(){
    var data = this.canvas.toDataURL();
    window.open(data, '_blank', 'location=0, left=500, top=300, menubar=0, height=603, width=1000, fullscreen=0');
};

/* draw a line on the screen */
CanvasClass.prototype.drawLine = function(e){

    /* set stroke and fill to pencil color before drawing */
    var oldStroke = this.context.strokeStyle ;
    var oldFill = this.context.fillStyle ;
    var pencilColor = document.getElementById('pencilColor').value ;
    this.setFillcolor(pencilColor);
    this.setStrokeColor(pencilColor);

    this.context.lineTo(e.offsetX, e.offsetY);
    this.context.stroke();
    this.context.beginPath();
    this.context.globalCompositeOperation="source-over";
    this.context.arc(e.offsetX, e.offsetY, this.radius, 0, Math.PI*2);
    //this.context.arc(e.offsetX, e.offsetY, this.radius, 0, Math.PI*2);
    this.context.fill();
    this.context.beginPath();
    this.context.moveTo(e.offsetX, e.offsetY);

    this.setFillcolor(oldFill);
    this.setStrokeColor(oldStroke);
};

CanvasClass.prototype.drawCircle = function(e){
    var oldLineWidth = this.context.lineWidth;
    this.context.beginPath();
    this.context.globalCompositeOperation="source-over";
    this.context.arc(e.offsetX, e.offsetY, this.shapeSize, 0, Math.PI*2);
    this.context.fill();
    this.context.lineWidth = 5 ;
    this.context.stroke();
    this.context.beginPath();
    this.context.lineWidth = oldLineWidth ;
};

CanvasClass.prototype.drawRectangle = function(e){
    var oldLineWidth = this.context.lineWidth;
    this.context.beginPath();
    this.context.globalCompositeOperation="source-over";
    this.context.rect(e.offsetX - 50, e.offsetY - 50, this.shapeSize + 70 , this.shapeSize);
    this.context.fill();
    this.context.lineWidth = 5 ;
    this.context.stroke();
    this.context.beginPath();
    this.context.lineWidth = oldLineWidth ;
};

CanvasClass.prototype.eraseShit = function(e){
    this.context.beginPath();
    this.context.globalCompositeOperation="destination-out";
    this.context.arc(e.offsetX, e.offsetY,this.radius *5,Math.PI*2,false);
    this.context.fill();
};

CanvasClass.prototype.drawTriangle = function(e){
    var oldLineWidth = this.context.lineWidth;
    var height = this.shapeSize * (Math.sqrt(3)/2);
    var X = e.offsetX - 15;
    var Y = e.offsetY - 40;
    this.context.beginPath();
    this.context.globalCompositeOperation="source-over";
    this.context.moveTo(X, Y);
    this.context.lineTo(X+50, Y+height);
    this.context.lineTo(X-50, Y+height);
    this.context.lineTo(X, Y);
    this.context.fill();
    this.context.closePath();
    this.context.lineWidth = 5;
    this.context.stroke();
    this.context.beginPath();
    this.context.lineWidth = oldLineWidth ;
};

/* shit don't work good
CanvasClass.prototype.drawHeart = function(e){
    var oldLineWidth = this.context.lineWidth;
    this.context.beginPath();
    this.context.moveTo(e.offsetX,e.offsetY);
    this.context.bezierCurveTo(e.offsetX,37,70,25,50,25);
    this.context.bezierCurveTo(20,25,20,62.5,20,62.5);
    this.context.bezierCurveTo(20,80,40,102,e.offsetX,120);
    this.context.bezierCurveTo(110,102,130,80,130,62.5);
    this.context.bezierCurveTo(130,62.5,130,25,100,25);
    this.context.bezierCurveTo(85,25,e.offsetX,37,e.offsetX,40);
    this.context.fill();
    this.context.lineWidth = 5 ;
    //this.context.stroke();
    //this.context.beginPath();
    this.context.lineWidth = oldLineWidth ;
};*/
