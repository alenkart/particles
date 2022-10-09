import Particle from "./Particle";

class Effect {
  width: number;
  height: number;
  particles: Particle[] = [];
  image: HTMLImageElement;
  mouseX: number = 0;
  mouseY: number = 0;
  radius: number = 2000;
  particleSize: number = 5;

  constructor(width: number, height: number, image: HTMLImageElement) {
    this.width = width;
    this.height = height;
    this.image = image;
  }

  init(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.width * 0.5 - this.image.width * 0.5,
      this.height * 0.5 - this.image.height * 0.5
    );

    const pixels = ctx.getImageData(0, 0, this.width, this.height).data;

    for (let y = 0; y < this.height; y += this.particleSize) {
      for (let x = 0; x < this.width; x += this.particleSize) {
        const index = (y * this.width + x) * 4;

        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const alpha = pixels[index + 3];

        if (alpha > 0) {
          const particle = new Particle(
            x,
            y,
            this.particleSize,
            `rgb(${red}, ${green}, ${blue})`
          );
          this.particles.push(particle);
        }
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach((particle) => particle.draw(ctx));
  }

  update() {
    this.particles.forEach((particle) => {
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = dx ** 2 + dy ** 2;
      const force = -this.radius / distance;

      if (distance < this.radius) {
        const angle = Math.atan2(dy, dx);
        particle.vx = force * Math.cos(angle);
        particle.vy = force * Math.sin(angle);
      }

      particle.update();
    });
  }
}

export default Effect;
