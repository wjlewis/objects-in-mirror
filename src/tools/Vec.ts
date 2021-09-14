import { clamp } from './index';

export class Vec {
  constructor(public x: number, public y: number) {}

  plus(rhs: Vec): Vec {
    return new Vec(this.x + rhs.x, this.y + rhs.y);
  }

  minus(rhs: Vec): Vec {
    return new Vec(this.x - rhs.x, this.y - rhs.y);
  }

  scale(f: number): Vec {
    return new Vec(f * this.x, f * this.y);
  }

  rotate(angle: number): Vec {
    const { x, y } = this;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return new Vec(cos * x - sin * y, sin * x + cos * y);
  }

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  norm(): Vec {
    const length = this.length();
    if (length === 0) {
      throw new Error('attempt to norm 0-vector');
    }

    return this.scale(1 / length);
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  clampRect(low: Vec, high: Vec): Vec {
    return new Vec(clamp(this.x, low.x, high.x), clamp(this.y, low.y, high.y));
  }
}
