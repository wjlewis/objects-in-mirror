import React from 'react';
import { DragSubject } from './DragSubject';
import { Vec } from '../tools';
import { Camera, Sphere } from '../objects';
import { Bounds } from '../hooks';

export * as Actions from './actions';
export * as Selectors from './selectors';
export * from './reducer';

export const ROOM_WIDTH = 400;
export const ROOM_HEIGHT = 400;
export const ROOM_BORDER = 8;
export const POV_WIDTH = 800;
export const POV_HEIGHT = 200;

export interface State {
  bounds: Bounds;
  cam: Camera;
  dragSubject: DragSubject;
  sphere: Sphere;
}

export const initState: State = {
  bounds: { left: 0, top: 0 },
  cam: new Camera(new Vec(80, 265), -Math.PI / 8, 60, 120),
  dragSubject: DragSubject.None(),
  sphere: new Sphere(new Vec(280, 80), 45, -Math.PI / 4),
};

export interface Action {
  type: string;
  payload?: any;
}

export enum CornerName {
  NW,
  NE,
  SE,
  SW,
}

export const ROOM_CORNERS = [
  { name: CornerName.NW, pos: new Vec(0, 0) },
  { name: CornerName.NE, pos: new Vec(ROOM_WIDTH, 0) },
  { name: CornerName.SE, pos: new Vec(ROOM_WIDTH, ROOM_HEIGHT) },
  { name: CornerName.SW, pos: new Vec(0, ROOM_HEIGHT) },
];

export const StateContext = React.createContext({
  state: null as any as State,
  dispatch: null as any as React.Dispatch<Action>,
});
