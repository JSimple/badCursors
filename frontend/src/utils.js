// // having trouble importing this module

// class Cursor {
//   constructor(img, cursorX, cursorY, cursorH, cursorW) {
//     this.img = img;
//   }
//   draw(cursorX, cursorY, cursorH, cursorW) {
//     return i.image(
//       this.img,
//       this.cursorX,
//       this.cursorY,
//       this.cursorH,
//       this.cursorW
//     );
//   }
// }

// class GravityCursor extends Cursor {
//   constructor(ySpeed, yPosition) {
//     super();
//     this.ySpeed = ySpeed;
//     this.yPosition = yPosition;
//     this.cursorX = i.mouseX;
//     this.cursorY = yPosition;
//   }
// }

// export const drawCursor = (cursorX, cursorY, cursorH, cursorW) => {
//     i.noCursor();
//     return i.image(cursorImg, cursorX, cursorY, cursorH, cursorW);
//   };