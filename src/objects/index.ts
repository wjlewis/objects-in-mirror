import { Camera } from './Camera';

export * from './Camera';
export * from './Sphere';
export * from './ReflSphere';
export * from './PovSphere';
export * from './PovWall';

export interface Transformable<Transformed2D> {
  transform: (cam: Camera) => Transformed2D;
}
