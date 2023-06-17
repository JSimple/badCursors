const glitch1 = () => {
    const sketch = (p5Instance) => {
        p5Instance.setup = () => {
            p5Instance.createCanvas(1024,1024)
            p5Instance.glitch = new Glitch(p5Instance)
            p5Instance.loadImage("../static/Eunice.jpg", (img)=>{
                p5Instance.glitch.loadImage(img)
            })
        }
        p5Instance.draw = () => {
            // p5Instance.background(100)
            // p5Instance.circle(10,10,10)
            p5Instance.glitch.resetBytes()
            p5Instance.glitch.replaceBytes(1,1)
            p5Instance.glitch.randomBytes(2)
            p5Instance.glitch.buildImage()
            p5Instance.image(p5Instance.glitch.image, 0,0)
        }
    }
    return new p5(sketch)
}