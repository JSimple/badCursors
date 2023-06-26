// import {drawCursor} from './utils'

class HydraCursor {
  constructor(p5instance, xPosition, yPosition) {
    this.p5i = p5instance;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.range = 0.1;
  }
  move() {
    //brownian walk
    this.xSpeed += this.p5i.random(-this.range, this.range);
    this.xPosition += this.xSpeed;
    this.ySpeed += this.p5i.random(-this.range, this.range);
    this.yPosition += this.ySpeed;

    //bounce on screen edges
    if (this.xPosition < 10 || this.xPosition > this.p5i.windowWidth - 10) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.yPosition < 10 || this.xPosition > this.p5i.windowHeight - 10) {
      this.ySpeed = -this.ySpeed;
    }

    //don't go off screen
    this.yPosition = this.p5i.max(0, this.yPosition);
    this.xPosition = this.p5i.max(0, this.xPosition);
    this.yPosition = this.p5i.min(this.p5i.windowHeight - 15, this.yPosition);
    this.xPosition = this.p5i.min(this.p5i.windowWidth - 15, this.xPosition);

    // mouse still influences cursor
    let deltaMouseX = this.p5i.pmouseX - this.p5i.mouseX;
    this.xPosition -= deltaMouseX;
    let deltaMouseY = this.p5i.pmouseY - this.p5i.mouseY;
    this.yPosition -= deltaMouseY;
  }
  show(hydraCursorImage, hydraCursorImageH, hydraCursorImageW) {
    //draw the cursor
    return this.p5i.image(
      hydraCursorImage,
      this.xPosition,
      this.yPosition,
      hydraCursorImageH,
      hydraCursorImageW
    );
  }
}

const sketch = (p5i) => {
  let cursorImg;
  let cursorH = 546;
  let cursorW = 826;
  let myHydraCursors;
  let initialCursor;

  p5i.preload = () => {
    cursorImg = p5i.loadImage("../static/cursor.png");
  };
  p5i.setup = () => {
    p5i.createCanvas(p5i.windowWidth, p5i.windowHeight);
    myHydraCursors = [];
    initialCursor = new HydraCursor(p5i, p5i.mouseX, p5i.mouseY);
    myHydraCursors.push(initialCursor);
  };

  p5i.draw = () => {
    p5i.background(220);
    p5i.noCursor();
    for (let i = 0; i < myHydraCursors.length; i++) {
      myHydraCursors[i].move();
      myHydraCursors[i].show(cursorImg, cursorH / 50, cursorW / 50);
    }

    // if (p5i.mousePressed()){
    //     drawCursor(cursorImg, cursorH / 50, cursorW / 50);
    // }
  };

  p5i.mousePressed = () => {
    let newHydraCursor = new HydraCursor(p5i, p5i.mouseX, p5i.mouseY);
    myHydraCursors.push(newHydraCursor);
  };

  p5i.mouseDragged = () => {
    let newHydraCursor = new HydraCursor(p5i, p5i.mouseX, p5i.mouseY);
    myHydraCursors.push(newHydraCursor);
  };
};

let p5Sketch = new p5(sketch);
