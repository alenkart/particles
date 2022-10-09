class Particle {
  originX: number;
  originY: number;
  color: string;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  friction: number = 0.9;
  ease: number = 0.005;

  constructor(x: number = 0, y: number = 0, size: number, color: string = "") {
    this.originX = Math.floor(x);
    this.originY = Math.floor(y);
    this.color = color;

    this.x = this.originX;
    this.y = this.originY;
    this.size = size;
    this.vx = 0;
    this.vy = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }
}

export default Particle;
