import { Particle } from "./particle.js";
import { ImageSrc } from "./image.js";

export class Visual {
  constructor() {
    this.image = new ImageSrc();
    this.texture = PIXI.Texture.from('./particle.png');

    this.particles = [];
    this.stream = [];

    this.radius = 30;
    this.lastMousePos = { x : 0, y: 0 };
    document.addEventListener('pointermove', this.onMove.bind(this), false);
  }

  async show(stageWidth, stageHeight, stage) {
    if(this.container) {
      stage.removeChild(this.container);
    }

    this.pos = await this.image.setImage(
      'image_sample2.png',
      3,
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
    const last = this.stream.shift();
    const mouse = last ? last : { ...this.lastMousePos };

    this.particles.forEach((item) => {
      const dx = mouse.x - item.x;
      const dy = mouse.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = item.radius + this.radius;

      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const tx = item.x + Math.cos(angle) * minDist;
        const ty = item.y + Math.sin(angle) * minDist;
        const ax = tx - mouse.x;
        const ay = ty - mouse.y;

        item.vx -= ax;
        item.vy -= ay;

        item.collide();
      }

      item.draw();
    });

    this.lastMousePos = {...mouse};
  }

  onMove(e) {
    const nowPos = { x: e.clientX, y: e.clientY };
    this.stream.push(nowPos);
  }

}