import {
  State,
  ROOM_CORNERS,
  CornerName,
  ROOM_WIDTH,
  POV_WIDTH,
} from './index';
import { Camera, Sphere, ReflSphere, PovSphere, PovWall } from '../objects';
import { Vec, bunchBy } from '../tools';
import { Bounds } from '../hooks';

export function bounds(state: State): Bounds {
  return state.bounds;
}

export function cam(state: State): Camera {
  return state.cam;
}

export function sphere(state: State): Sphere {
  return state.sphere;
}

export function reflSphere(state: State): ReflSphere {
  const { pos, radius } = state.sphere;

  const reflX = ROOM_WIDTH + ROOM_WIDTH - pos.x;
  return new ReflSphere(new Vec(reflX, pos.y), radius);
}

export function povSphere(state: State): PovSphere | null {
  const sphere = state.sphere.transform(state.cam);
  if (sphere.pos.y <= 0) {
    return null;
  } else {
    return sphere;
  }
}

export function povReflSphere(state: State): PovSphere | null {
  const sphere = reflSphere(state).transform(state.cam);
  if (sphere.pos.y <= 0) {
    return null;
  } else {
    return sphere;
  }
}

export function povWalls(state: State): PovWall[] {
  const corners = ROOM_CORNERS.map(corner => ({
    ...corner,
    pos: state.cam.transformPos(corner.pos),
  }));

  const walls = bunchBy([...corners, corners[0]], 2);

  return walls
    .filter(([c1, c2]) => c1.pos.y > 0 || c2.pos.y > 0)
    .map(([c1, c2]) => {
      const c1p = { ...c1, pos: clipPos(c1.pos) };
      const c2p = { ...c2, pos: clipPos(c2.pos) };
      return [c1p, c2p];
    })
    .map(([c1, c2]) => {
      const x = c1.pos.x;
      const width = c2.pos.x - c1.pos.x;
      const className = wallClassName(c1.name, c2.name);
      return new PovWall(x, width, className);
    });
}

function clipPos(pos: Vec): Vec {
  if (pos.y < 0) {
    const edgeX = pos.x < POV_WIDTH / 2 ? 0 : POV_WIDTH;
    return new Vec(edgeX, pos.y);
  } else {
    return pos;
  }
}

function wallClassName(c1Name: CornerName, c2Name: CornerName): string {
  if (c1Name === CornerName.NW && c2Name === CornerName.NE) {
    return 'wall north';
  } else if (c1Name === CornerName.NE && c2Name === CornerName.SE) {
    return 'wall mirror';
  } else if (c1Name === CornerName.SE && c2Name === CornerName.SW) {
    return 'wall south';
  } else {
    return 'wall west';
  }
}

export function raysInfo(state: State): RaysInfo {
  const { sphere, cam } = state;
  const mirrorCamPos = new Vec(ROOM_WIDTH + ROOM_WIDTH - cam.pos.x, cam.pos.y);

  const dist = mirrorCamPos.minus(sphere.pos);
  const tanLength = Math.sqrt(dist.length() ** 2 - sphere.radius ** 2);
  const wingAngle = Math.atan2(tanLength, sphere.radius);
  const wingBase = dist.norm().scale(sphere.radius);
  const mirrorWing1 = wingBase.rotate(wingAngle).plus(sphere.pos);
  const mirrorWing2 = wingBase.rotate(-wingAngle).plus(sphere.pos);

  const dx1 = (ROOM_WIDTH - mirrorWing1.x) / (mirrorCamPos.x - mirrorWing1.x);
  const dx2 = (ROOM_WIDTH - mirrorWing2.x) / (mirrorCamPos.x - mirrorWing2.x);
  const y1 = (mirrorCamPos.y - mirrorWing1.y) * dx1 + mirrorWing1.y;
  const y2 = (mirrorCamPos.y - mirrorWing2.y) * dx2 + mirrorWing2.y;

  const { wing1, wing2 } = sphereRayInfo(state);
  const { wing1: reflWing1, wing2: reflWing2 } = reflRayInfo(state);

  return {
    wing1,
    wing2,
    reflWing1,
    reflWing2,
    mirrorWing1,
    mirrorWing2,
    y1,
    y2,
  };
}

export interface RaysInfo {
  wing1: Vec;
  wing2: Vec;
  reflWing1: Vec;
  reflWing2: Vec;
  mirrorWing1: Vec;
  mirrorWing2: Vec;
  y1: number;
  y2: number;
}

function sphereRayInfo(state: State) {
  const { sphere, cam } = state;

  const dist = cam.pos.minus(sphere.pos);
  const tanLength = Math.sqrt(dist.length() ** 2 - sphere.radius ** 2);
  const wingAngle = Math.atan2(tanLength, sphere.radius);
  const wingBase = dist.norm().scale(sphere.radius);
  const wing1 = wingBase.rotate(wingAngle).plus(sphere.pos);
  const wing2 = wingBase.rotate(-wingAngle).plus(sphere.pos);

  return { wing1, wing2 };
}

function reflRayInfo(state: State) {
  const { cam } = state;
  const sphere = reflSphere(state);

  const dist = cam.pos.minus(sphere.pos);
  const tanLength = Math.sqrt(dist.length() ** 2 - sphere.radius ** 2);
  const wingAngle = Math.atan2(tanLength, sphere.radius);
  const wingBase = dist.norm().scale(sphere.radius);
  const wing1 = wingBase.rotate(wingAngle).plus(sphere.pos);
  const wing2 = wingBase.rotate(-wingAngle).plus(sphere.pos);

  return { wing1, wing2 };
}
