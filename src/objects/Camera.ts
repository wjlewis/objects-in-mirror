import { Vec } from '../tools';
import { POV_WIDTH } from '../state';

export class Camera {
  constructor(
    public pos: Vec,
    public angle: number,
    public fl: number,
    public width: number
  ) {}

  moveTo(pos: Vec): Camera {
    return new Camera(pos, this.angle, this.fl, this.width);
  }

  panTo(angle: number): Camera {
    return new Camera(this.pos, angle, this.fl, this.width);
  }

  transformPos(pos: Vec): Vec {
    const translated = pos.minus(this.pos);
    const rotated = translated.rotate(-this.angle + Math.PI / 2);

    const { x, y } = rotated;
    const clipX = -(this.fl * x) / Math.abs(y);
    const dist = y;
    const centeredX = ((clipX + this.width / 2) / this.width) * POV_WIDTH;

    return new Vec(centeredX, dist);
  }

  insideViewbox(transformedPos: Vec): boolean {
    return (
      transformedPos.y > 0 &&
      transformedPos.x >= 0 &&
      transformedPos.x < POV_WIDTH
    );
  }
}
