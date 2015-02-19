var canvas = document.getElementById('canvas');
var canvasClass = new CanvasClass(canvas);
canvasClass.initialize();
canvasClass.bindSettingsChangeListenters();
canvasClass.bindDrawingModesChangeListener();

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

/*overlay effizy*/
document.getElementById('overlay').addEventListener('dblclick', function(){
    this.style.display = "none";
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

/* Bind them listeners to the canvas */
canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mouseup', disengage);
canvas.addEventListener('mousemove', drawLine);
canvas.addEventListener('click', drawShape);
