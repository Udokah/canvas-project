var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvasClass ;
var dragging = false ;

var drawLine = function(e){
    if(dragging){
        console.log(canvasClass.drawMode);
        if(canvasClass.drawMode == 'Pencil'){
            canvasClass.drawLine(e);
        }
        else if(canvasClass.drawMode == 'Eraser'){
            canvasClass.eraseShit(e);
        }
    }
};

var drawShape = function(e){
    console.log(canvasClass.drawMode);
    switch (canvasClass.drawMode){
        case 'Circle':
            canvasClass.drawCircle(e);
            break;
        case 'Rectangle':
            canvasClass.drawRectangle(e);
            break;
        case 'Triangle':
            canvasClass.drawTriangle(e);
            break;
        default :
        //fucking do nothing
    }
};

var engage = function(e){
    dragging = true;
    canvasClass.drawLine(e);
};

var disengage = function(){
    dragging = false ;
    canvasClass.context.beginPath();
};

var initializeCanvas = function(canvas){
    canvasClass = new CanvasClass(canvas);
    canvasClass.initialize();
    canvasClass.bindSettingsChangeListenters();
    canvasClass.bindDrawingModesChangeListener();

    /* Bind them listeners to the canvas */
    canvas.addEventListener('mousedown', engage);
    canvas.addEventListener('mouseup', disengage);
    canvas.addEventListener('mousemove', drawLine);
    canvas.addEventListener('click', drawShape);
};

initializeCanvas(canvas1);

/*overlay effizy*/
document.getElementById('overlay').addEventListener('click', function(){
    this.style.display = "none";
});

/* Activate button for first layer */
var layer1 = document.getElementById('layer1');
var layer2 = document.getElementById('layer2');

layer1.setAttribute("class","selected");

layer1.addEventListener('click', function(){
    layer2.removeAttribute("class");
    this.setAttribute("class","selected");
    canvas1.style.zIndex = 100 ;
    canvas2.style.zIndex = 50 ;
    initializeCanvas(canvas1);
});

layer2.addEventListener('click', function(){
    layer1.removeAttribute("class");
    this.setAttribute("class","selected");
    canvas1.style.zIndex = 50 ;
    canvas2.style.zIndex = 100 ;
    initializeCanvas(canvas2);
});


document.getElementById('saveBtn').addEventListener('click', function(){
    canvasClass.saveImage();
});




/* button pick effect */
/*
var toolBtn = document.getElementsByClassName('toolBtn');

var selectEffect = function(){
    for(var i=0; i<toolBtn.length; i++){
        toolBtn[i].removeAttributeNode();
    }
};


for(var i=0; i<toolBtn.length; i++){
    toolBtn[i].addEventListener('click', selectEffect);
}
*/

