import { Action } from './index';
import { Vec } from '../tools';
import { Bounds } from '../hooks';

export enum ActionType {
  UpdateBounds = 'UpdateBounds',
  MouseDownCamRoot = 'MouseDownCamRoot',
  MouseDownCamPan = 'MouseDownCamPan',
  MouseDownSphereRoot = 'MouseDownSphereRoot',
  MouseDownSphereScale = 'MouseDownSphereScale',
  MouseMove = 'MouseMove',
  MouseUp = 'MouseUp',
}

export function updateBounds(bounds: Bounds): Action {
  return { type: ActionType.UpdateBounds, payload: bounds };
}

export function mouseDownCamRoot(): Action {
  return { type: ActionType.MouseDownCamRoot };
}

export function mouseDownCamPan(): Action {
  return { type: ActionType.MouseDownCamPan };
}

export function mouseDownSphereRoot(offset: Vec): Action {
  return { type: ActionType.MouseDownSphereRoot, payload: offset };
}

export function mouseDownSphereScale(): Action {
  return { type: ActionType.MouseDownSphereScale };
}

export function mouseMove(pos: Vec): Action {
  return { type: ActionType.MouseMove, payload: pos };
}

export function mouseUp(): Action {
  return { type: ActionType.MouseUp };
}
