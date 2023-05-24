import {Visual} from "./visual.js";

class App {
  constructor() {
    this.setWebGl();

    // font load
    WebFont.load({
      google: {
        families: ['Hind:700']
      },
      fontactive: () => {
        this.visual = new Visual();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
      }
    });
  }

  setWebGl() {
    // canvas에 사용되는 renderer 생성
    this.renderer = new PIXI.Renderer({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      antialias: true,
      transparent: false,
      resolution: (window.devicePixelRatio > 1) ? 2 : 1,
      autoDensity: true,
      powerPreference: 'high-performance',
      backgroundColor: 0xffffff,
    });
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.renderer.resize(this.stageWidth, this.stageHeight);

    // pixi container 갱신
    this.visual.show(this.stageWidth, this.stageHeight, this.stage);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    // mouse pointer에 따른 pixi container 갱신
    this.visual.animate();
    // renderer에 pixi container 반영
    this.renderer.render(this.stage);
  }
}

window.onload = () => new App();