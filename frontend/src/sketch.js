import {drawCursor} from './utils'

const sketch = (i) => {
  let cursor;
  let ySpeed = 0.00000001;
  let gravityAcceleration = 1.0005;
  let yPosition = 0;
  let cursorH = 546;
  let cursorW = 826;

  const drawCursor = (cursorX, cursorY, cursorH, cursorW) => {
    i.noCursor();
    return i.image(cursorImg, cursorX, cursorY, cursorH, cursorW);
  };

  i.preload = () => {
    cursorImg = i.loadImage("../static/cursor3.png");
  };
  i.setup = () => {
    i.createCanvas(i.windowWidth, i.windowHeight);
  };

  i.draw = () => {
    i.background(220);

    ySpeed = ySpeed + Math.sqrt(ySpeed) / 100;
    yPosition += ySpeed;
    if (yPosition > i.windowHeight) {
      yPosition = 0;
      ySpeed = 0.00000001;
    }
    let deltaMouseY = i.pmouseY - i.mouseY;
    yPosition -= deltaMouseY;
    yPosition = i.max(0, yPosition);

    drawCursor(i.mouseX, yPosition, cursorH / 100, cursorW / 100);
  };
};

let p5Sketch = new p5(sketch);
