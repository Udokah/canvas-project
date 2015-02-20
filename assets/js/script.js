var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');

var visibleLayers = 1 ;
var upgrade = document.getElementById('upgrade') ;

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

/* Clear the canvas for a new drawing */
document.getElementById('clearScreen').addEventListener('click', function(){
    canvasClass.context.clearRect(0, 0, canvasClass.canvas.width, canvasClass.canvas.height);
});

/* Activate button for first layer */
var layer1 = document.getElementById('layer1');
var layer2 = document.getElementById('layer2');
var layer3 = document.getElementById('layer3');

layer1.setAttribute("class","selected");

layer1.addEventListener('click', function(){
    canvas1.style.zIndex = 100 ;
    this.setAttribute("class","selected");
    initializeCanvas(canvas1);

    try{ // Layer 2 may not exists
        layer2.removeAttribute("class");
        canvas2.style.zIndex = 50 ;
    }catch (e){
        console.log(e);
    }

    try{ // Layer 3 may not exists
        layer3.removeAttribute("class");
        canvas3.style.zIndex = 50 ;
    }catch (e){
        console.log(e);
    }
});

layer2.addEventListener('click', function(){
    layer1.removeAttribute("class");
    canvas2.style.zIndex = 100 ;
    this.setAttribute("class","selected");
    initializeCanvas(canvas2);

    try{ // Layer 3 may not exists
        layer3.removeAttribute("class");
        canvas3.style.zIndex = 50 ;
    }catch (e){
        console.log(e);
    }
});

layer3.addEventListener('click', function(){
    layer1.removeAttribute("class");
    canvas1.style.zIndex = 50 ;
    canvas3.style.zIndex = 100 ;
    this.setAttribute("class","selected");
    initializeCanvas(canvas3);

    try{ // Layer 2 may not exists
        layer2.removeAttribute("class");
        canvas2.style.zIndex = 50 ;
    }catch (e){
        console.log(e);
    }
});


document.getElementById('saveBtn').addEventListener('click', function(){
    canvasClass.saveImage();
});

upgrade.addEventListener('click', function(){
    this.style.display = "none" ;
});


var removeLayer = function(layer){
    var l = 'pick' + layer ;
    document.getElementById(l).style.display = "none" ;
    layer1.click();
    visibleLayers--;
};


document.getElementById('newLayer').addEventListener('click', function(){
    var pick2 = document.getElementById('pick2');
    var pick3 = document.getElementById('pick3');
    console.log(visibleLayers);

    if(visibleLayers == 1){
        pick2.style.display = "inline-block" ;
        layer2.click();
        visibleLayers++;
    }else if(visibleLayers == 2){
        if(pick2.style.display == "none"){
            pick2.style.display = "inline-block" ;
            layer2.click();
        }else{
            pick3.style.display = "inline-block" ;
            layer3.click();
        }
        visibleLayers++;
    }else if(visibleLayers >= 3){
        upgrade.style.display = "inline-block";
        visibleLayers = 3 ;
    }

    console.log(visibleLayers);
});