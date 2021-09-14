import { Vec } from '../tools';
import { POV_WIDTH } from '../state';
import { Transformable } from './index';
import { PovSphere } from './PovSphere';
import { Camera } from './Camera';

export class ReflSphere implements Transformable<PovSphere> {
  constructor(public pos: Vec, public radius: number) {}

  transform(cam: Camera): PovSphere {
    const pos = cam.transformPos(this.pos);
    // KLUDGE
    const r = ((cam.fl * this.radius) / pos.y / cam.width) * POV_WIDTH;
    return new PovSphere(pos, r);
  }
}
