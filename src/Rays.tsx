import React from 'react';
import { StateContext, Selectors as S, ROOM_WIDTH } from './state';

const Rays: React.VFC = () => {
  const { state } = React.useContext(StateContext);

  const cam = S.cam(state);

  const {
    wing1,
    wing2,
    reflWing1,
    reflWing2,
    mirrorWing1,
    mirrorWing2,
    y1,
    y2,
  } = S.raysInfo(state);

  const sphereRay = `M ${cam.pos.x} ${cam.pos.y} L ${wing1.x} ${wing1.y} L ${wing2.x} ${wing2.y} Z`;
  const reflSphereRay = `M ${cam.pos.x} ${cam.pos.y} L ${reflWing1.x} ${reflWing1.y} L ${reflWing2.x} ${reflWing2.y} Z`;
  const mirrorRay = `M ${ROOM_WIDTH} ${y1} L ${mirrorWing1.x} ${mirrorWing1.y} L ${mirrorWing2.x} ${mirrorWing2.y} L ${ROOM_WIDTH} ${y2} Z`;

  return (
    <g className="rays">
      <path d={sphereRay} />
      <path d={reflSphereRay} />
      <path d={mirrorRay} />
    </g>
  );
};

export default Rays;
