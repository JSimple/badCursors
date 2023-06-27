// import {drawCursor} from './utils'
// TO DO: captcha I am not a robot

const sketch = (i) => {
  let cursorImg;
  let ySpeed = 0.00000001;
  let gravityAcceleration = 1.0005;
  let yPosition = 0;
  let cursorH = 546;
  let cursorW = 826;
  let fallingDown = true;

  i.preload = () => {
    cursorImg = i.loadImage("../static/cursor.png");
  };
  i.setup = () => {
    i.createCanvas(i.windowWidth, i.windowHeight);
  };

  const drawCursor = (img, cursorX, cursorY, cursorH, cursorW) => {
    i.noCursor();
    return i.image(img, cursorX, cursorY, cursorH, cursorW);
  };

  i.draw = () => {
    i.background(220);
    ySpeed = ySpeed + Math.sqrt(Math.sqrt(ySpeed)) / 100;

    if (fallingDown) {
      yPosition += ySpeed;
    } else {
      yPosition -= ySpeed;
    }

    if (yPosition > i.windowHeight) {
      yPosition = i.windowHeight + 10;
      ySpeed = 0.00000001;
      fallingDown = !fallingDown;
    }

    if (yPosition < 0) {
      yPosition = 10;
      ySpeed = 0.00000001;
      fallingDown = !fallingDown;
    }

    let deltaMouseY = i.pmouseY - i.mouseY;
    yPosition -= deltaMouseY;
    yPosition = i.max(0, yPosition);

    drawCursor(cursorImg, i.mouseX, yPosition, cursorH / 50, cursorW / 50);
  };
};

let p5Sketch = new p5(sketch);
