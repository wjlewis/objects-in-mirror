import React from 'react';
import { StateContext, Actions as A, Selectors as S } from './state';
import { Vec } from './tools';

const Sphere: React.VFC = () => {
  const { state, dispatch } = React.useContext(StateContext);

  const { pos, radius, angle } = S.sphere(state);

  const ctrl = new Vec(radius, 0).rotate(angle).plus(pos);

  function handleMouseDownRoot(e: React.MouseEvent) {
    const { left, top } = S.bounds(state);
    const { clientX, clientY } = e;
    const mousePos = new Vec(clientX - left, clientY - top);
    const offset = pos.minus(mousePos);
    return dispatch(A.mouseDownSphereRoot(offset));
  }

  function handleMouseDownScale() {
    return dispatch(A.mouseDownSphereScale());
  }

  return (
    <g className="sphere">
      <circle
        className="move"
        cx={pos.x}
        cy={pos.y}
        r={radius}
        onMouseDown={handleMouseDownRoot}
      />
      <circle
        className="sphere-ctrl move"
        cx={ctrl.x}
        cy={ctrl.y}
        r="8"
        onMouseDown={handleMouseDownScale}
      />
    </g>
  );
};

export default Sphere;
