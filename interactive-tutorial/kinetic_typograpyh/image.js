export class ImageSrc {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  async setImage (src, density, stageWidth, stageHeight){
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    const img = new Image();
    img.src = src;

    return new Promise((res) => {
      img.onload = () => {
        this.ctx.clearRect(0, 0, stageWidth, stageWidth);
        this.ctx.drawImage(img, 0, 0, stageWidth, stageWidth);
        res(this.dotPos(density, stageWidth, stageHeight));
      }
    })
  }

  dotPos(density, stageWidth, stageHeight) {
    const imageData = this.ctx.getImageData(
      0, 0,
      stageWidth, stageHeight,
    ).data;

    const particles = [];
    let i = 0;
    let width = 0;
    let pixel;

    for (let height = 0; height < stageHeight; height += density) {
      ++i;
      width = (i % 2) === 0 ? 6 : 0;

      for (; width < stageWidth; width += density) {
        const idx = ((width + (height * stageWidth)) * 4) - 1;
        pixel = imageData[idx];

        if (pixel !== 0 && width > 0 && width < stageWidth && height > 0 && height < stageHeight) {
          particles.push({x: width, y: height, color: imageData[idx - 3] << 16 | imageData[idx - 2] << 8 || imageData[idx - 1]});
        }
      }
    }

    return particles;
  }
}