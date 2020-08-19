console.log("I am index.js");

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
    pan: 'pan'
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
    });

    canvas.on("mouse:down", (e) => {
        mousePressed = true;

    });
}

const togglePan = () => {
    if(currentMode ===  modes.pan){
        currentMode = '';
    } else {
        currentMode = modes.pan;
    }
}

let currentMode;
const canvas = initCanvas("canvas");
setBackground("https://previews.123rf.com/images/svenler/svenler1202/svenler120200004/12413537-glossy-canvas-background-with-vignette.jpg", canvas);
let mousePressed = false;
setPanEvents(canvas);



