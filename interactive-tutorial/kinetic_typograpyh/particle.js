const FRICTION = 0.98;
const COLOR_SPEED = 0.12;
const MOVE_SPEED = 0.99;

export class Particle {
  constructor(pos, texture) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.scale.set(0.06);

    this.savedX = this.x = this.sprite.x = pos.x;
    this.savedY = this.y = this.sprite.y = pos.y;
    this.vx = this.vy = 0;
    this.radius = 10;
    this.savedRgb = pos.color;
    this.rgb = pos.color; //0xf3316e;
  }

  collide() {
    this.rgb = 0xFFFFFF;
  }

  draw() {
    this.rgb += (this.savedRgb - this.rgb) * COLOR_SPEED;

    this.x += (this.savedX - this.x) * MOVE_SPEED;
    this.y += (this.savedY - this.y) * MOVE_SPEED;

    this.vx *= FRICTION;
    this.vy *= FRICTION;

    this.x += this.vx;
    this.y += this.vy;

    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.tint = this.rgb;
  }
}