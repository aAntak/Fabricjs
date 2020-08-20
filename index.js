//new canvas constructor lets fabric create this class instance
// so we can use the provided fabric.js methods
const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 500,
        height: 500,
        selection: false
    });
}
const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => { 
        canvas.backgroundImage = img;
        canvas.renderAll();
    });
}

const modes = {
    pan: 'pan',
    drawing: 'drawing'
}


const setPanEvents = (canvas) => {
    //mouse over
    canvas.on("mouse:move", (event) => {
        if(mousePressed && currentMode === modes.pan) {
        canvas.setCursor('grab');
        canvas.renderAll();
        const mEvent = event.e;
        const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
        canvas.relativePan(delta);
        console.log(delta);
    } 
});
    
    canvas.on("mouse:up", (e) => {
        mousePressed = false;
        //canvas.isDrawingMode = false;
    });

    canvas.on("mouse:down", (e) => {
        mousePressed = true;
        

    });
}

const toggleMode = (mode) => {
    if(currentMode === mode) {
        currentMode = '';
        canvas.isDrawingMode = false;
        return;
    }
    currentMode = mode;
    if(currentMode != modes.drawing) {
        canvas.isDrawingMode = false;
    }
    else if(currentMode === modes.drawing) {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color =  color;
        canvas.renderAll();
    }
    canvas.renderAll();
    
}

const setColorListener = () => {
    const picker = document.getElementById("colorPicker");
    picker.addEventListener('change', (event) =>
    {
        color = event.target.value;
        canvas.freeDrawingBrush.color =  color;
    })
}

const clearCanvas = (canvas) => {
    canvas.getObjects().forEach((o) => {
        if(o !== canvas.backgroundImage) {
            canvas.remove(o);
        }
        
    });
}

const createRect = (canvas) => {
    var rectangle = new fabric.Rect({
        width: 20, height: 30, fill: 'blue', left: 50, top: 50
      });

      canvas.add(rectangle);
      canvas.renderAll();
}

const createCirc = (canvas) => {
    var circle = new fabric.Circle({
        radius: 20, fill: 'green', left: 100, top: 100
      });
    canvas.add(circle);

}

let currentMode;
const canvas = initCanvas("canvas");
setBackground("https://previews.123rf.com/images/svenler/svenler1202/svenler120200004/12413537-glossy-canvas-background-with-vignette.jpg", canvas);
let mousePressed = false;
let color = document.getElementById("colorPicker").value;
console.log(color);
setPanEvents(canvas);
setColorListener();




