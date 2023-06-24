// import {drawCursor} from './utils'



const sketch = (i) => {
  let cursorImg;
  let cursorH = 546;
  let cursorW = 826;
  let fallingDown = true;
  let xDistanceFromCursor;
  let yDistanceFromCursor;
  let range;
  let myCursors = []

  i.preload = () => {
    cursorImg = i.loadImage("../static/cursor.png");
  };
  i.setup = () => {
    i.createCanvas(i.windowWidth, i.windowHeight);
  };

  const drawCursor = (img, cursorH, cursorW) => {
    let ySpeed = 0;
    let xSpeed = 0;
    let xPosition = 0;
    let yPosition = 0;
    let xDistanceFromCursor = xPosition - i.mouseX;
    let yDistanceFromCursor = yPosition - i.mouseY;
    range = 0.3;
    let xAdjustedRange = range; //xDistanceFromCursor
    let yAdjustedRange = range; //yDistanceFromCursor

    //brownian walk
    xSpeed += i.random(-xAdjustedRange, xAdjustedRange);
    xPosition += xSpeed;
    ySpeed += i.random(-yAdjustedRange, yAdjustedRange);
    yPosition += ySpeed;

    //bounce on screen edges
    if (xPosition < 10 || xPosition > i.windowWidth - 10) {
      xSpeed = -xSpeed;
    }
    if (yPosition < 10 || xPosition > i.windowHeight - 10) {
      ySpeed = -ySpeed;
    }

    //don't go off screen
    yPosition = i.max(0, yPosition);
    xPosition = i.max(0, xPosition);
    yPosition = i.min(i.windowHeight - 15, yPosition);
    xPosition = i.min(i.windowWidth - 15, xPosition);

    // mouse still influences cursor
    let deltaMouseX = i.pmouseX - i.mouseX;
    xPosition -= deltaMouseX;
    let deltaMouseY = i.pmouseY - i.mouseY;
    yPosition -= deltaMouseY;

    return i.image(img, xPosition, yPosition, cursorH, cursorW);
  };

  i.draw = () => {
    i.background(220);
    i.noCursor();

    // loop for  c in my cursors
    drawCursor(cursorImg, cursorH / 50, cursorW / 50);
    // if (i.mousePressed()){
    //     drawCursor(cursorImg, cursorH / 50, cursorW / 50);
    // }

  };
  i.mousePressed = () => {
    alert('!!!')
    drawCursor(cursorImg, cursorH / 50, cursorW / 50);
  };
};

let p5Sketch = new p5(sketch);
