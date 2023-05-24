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

    // canvas에 draw된 text의 position list load
    this.pos = this.text.setText(
      'F',
      10,
      stageWidth,
      stageHeight,
    );

    // particle container 선언 (각 pos를 particle로 생성)
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

    // pixi container에 particle container 추가
    stage.addChild(this.container);

    // 각 pos를 particle로 생성 후, particle container에 추가
    // particle은 내부적으로 pixi sprite를 사용
    this.particles = this.pos.map((item) => {
      const particle = new Particle(item, this.texture);
      this.container.addChild(particle.sprite);
      return particle;
    });
  }

  animate() {
    // 현재 mouse pointer에 따른 particle에 반영 (색상 / sprite 위치 갱신 )
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