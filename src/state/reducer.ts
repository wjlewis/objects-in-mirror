import { State, Action, ROOM_WIDTH } from './index';
import { ActionType } from './actions';
import { DragSubject } from './DragSubject';
import { Vec } from '../tools';
import { Bounds } from '../hooks';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.UpdateBounds:
      return reduceUpdateBounds(state, action.payload);
    case ActionType.MouseDownCamRoot:
      return reduceMouseDownCamRoot(state);
    case ActionType.MouseDownCamPan:
      return reduceMouseDownCamPan(state);
    case ActionType.MouseDownSphereRoot:
      return reduceMouseDownSphereRoot(state, action.payload);
    case ActionType.MouseDownSphereScale:
      return reduceMouseDownSphereScale(state);
    case ActionType.MouseMove:
      return reduceMouseMove(state, action.payload);
    case ActionType.MouseUp:
      return reduceMouseUp(state);
    default:
      return state;
  }
}

function reduceUpdateBounds(state: State, bounds: Bounds): State {
  return { ...state, bounds };
}

function reduceMouseDownCamRoot(state: State): State {
  return { ...state, dragSubject: DragSubject.CamRoot() };
}

function reduceMouseDownCamPan(state: State): State {
  return { ...state, dragSubject: DragSubject.CamPan() };
}

function reduceMouseDownSphereRoot(state: State, offset: Vec): State {
  return { ...state, dragSubject: DragSubject.SphereRoot(offset) };
}

function reduceMouseDownSphereScale(state: State): State {
  return { ...state, dragSubject: DragSubject.SphereScale() };
}

function reduceMouseMove(state: State, mousePos: Vec): State {
  return state.dragSubject.match({
    none: () => state,
    camRoot: () => ({ ...state, cam: state.cam.moveTo(mousePos) }),
    camPan: () => {
      const diff = mousePos.minus(state.cam.pos);
      const angle = Math.atan2(diff.y, diff.x);
      return { ...state, cam: state.cam.panTo(angle) };
    },
    sphereRoot: offset => {
      const { radius: r } = state.sphere;
      const pos = mousePos
        .plus(offset)
        .clampRect(new Vec(r, r), new Vec(ROOM_WIDTH - r, ROOM_WIDTH - r));
      return { ...state, sphere: state.sphere.moveTo(pos) };
    },
    sphereScale: () => {
      const diff = mousePos.minus(state.sphere.pos);
      const radius = diff.length();
      const angle = diff.angle();
      return { ...state, sphere: state.sphere.scale(radius, angle) };
    },
  });
}

function reduceMouseUp(state: State): State {
  return { ...state, dragSubject: DragSubject.None() };
}
