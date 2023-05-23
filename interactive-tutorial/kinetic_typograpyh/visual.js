import { Text } from "./text.js";
import { Particle } from "./particle.js";

export class Visual {
  constructor() {
    this.text = new Text();
    this.texture = PIXI.Texture.from('./particle.png');

    this.particles = [];

    this.mouse = { x: 0, y: 0, radius: 30 };
    document.addEventListener('pointermove', this.onMove.bind(this), false);
  }

  show(stageWidth, stageHeight, stage) {
    if(this.container) {
      stage.removeChild(this.container);
    }

    this.pos = this.text.setText(
      'ㅗ',
      2,
      stageWidth,
      stageHeight,
    );

    this.container = new PIXI.ParticleContainer(
      this.pos.length,
      {
        vertices: false,
        position: true,
        rotation: false,
        scale: false,
        uvs: false,
        tint: true,
      },
    );

    stage.addChild(this.container);

    this.particles = this.pos.map((item) => {
      const particle = new Particle(item, this.texture);
      this.container.addChild(particle.sprite);
      return particle;
    });
  }

  animate() {
    this.particles.forEach((item) => {
      const dx = this.mouse.x - item.x;
      const dy = this.mouse.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = item.radius + this.mouse.radius;

      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const tx = item.x + Math.cos(angle) * minDist;
        const ty = item.y + Math.sin(angle) * minDist;
        const ax = tx - this.mouse.x;
        const ay = ty - this.mouse.y;

        item.vx -= ax;
        item.vy -= ay;

        item.collide();
      }

      item.draw();
    })
  }

  onMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

}