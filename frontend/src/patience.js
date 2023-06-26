class PatienceCursor {
  constructor(p5instance, xPosition, yPosition) {
    this.p5i = p5instance;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.range = 50;
    this.stuck = false;
    this.counter = 0;
    this.timerTracker = false
    this.timerStart = 0
  }

  getStuck() {
    if (this.timerTracker == false){
        this.timerStart = this.p5i.frameCount;
        this.timerTracker = true
        this.stuck = true;

    }
    console.log('running get stuck. stuck:', this.stuck)
    let stuckLength = 1;
    if ((this.p5i.frameCount - this.timerStart) / 60 > stuckLength){
        this.stuck = false;
        this.timerTracker = false
    }
    console.log('ending get stuck. stuck:', this.p5i.frameCount - this.timerStart)
  }
  move() {
    let deltaMouseX = this.p5i.pmouseX - this.p5i.mouseX;
    let deltaMouseY = this.p5i.pmouseY - this.p5i.mouseY;
    let deltaMouseTotal = Math.sqrt((deltaMouseX ** 2) + (deltaMouseY ** 2));

    // gets stuck if mouse moves too much
    if (deltaMouseTotal > this.range) {
      this.stuck = true
    }

    if (this.stuck == true){
        this.getStuck()
    }

    // mouse influences cursor if not stuck
    if (this.stuck == false) {
        this.xPosition -= deltaMouseX;
        this.yPosition -= deltaMouseY;
    }

    //don't go off screen
    this.yPosition = this.p5i.max(0, this.yPosition);
    this.xPosition = this.p5i.max(0, this.xPosition);
    this.yPosition = this.p5i.min(this.p5i.windowHeight - 15, this.yPosition);
    this.xPosition = this.p5i.min(this.p5i.windowWidth - 15, this.xPosition);
  }
  show(image, imageH, imageW) {
    //draw the cursor
    return this.p5i.image(
      image,
      this.xPosition,
      this.yPosition,
      imageH,
      imageW
    );
  }
}

const sketch = (p5i) => {
  let cursorImg;
  let cursorH = 546;
  let cursorW = 826;
  let initialCursor

  p5i.preload = () => {
    cursorImg = p5i.loadImage("../static/cursor.png");
  };
  p5i.setup = () => {
    p5i.createCanvas(p5i.windowWidth, p5i.windowHeight);
    initialCursor = new PatienceCursor(p5i, p5i.mouseX, p5i.mouseY);
  };

  p5i.draw = () => {
    p5i.background(220);
    p5i.noCursor();
    initialCursor.move();
    initialCursor.show(cursorImg, cursorH/50, cursorW/50);
  };
};

let p5Sketch = new p5(sketch);
