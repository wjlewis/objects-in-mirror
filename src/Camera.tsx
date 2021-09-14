import React from 'react';
import { StateContext, Actions as A, Selectors as S } from './state';
import { Vec } from './tools';

const Camera: React.VFC = () => {
  const { state, dispatch } = React.useContext(StateContext);

  const { pos, angle, fl, width } = S.cam(state);

  const fwd = new Vec(fl, 0).rotate(angle);
  const panCtrl = pos.plus(fwd);

  const wingOut = fwd
    .rotate(Math.PI / 2)
    .norm()
    .scale(width / 2);
  const wing1 = panCtrl.plus(wingOut);
  const wing2 = panCtrl.minus(wingOut);

  const triPath = `M ${pos.x} ${pos.y} L ${wing1.x} ${wing1.y} L ${wing2.x} ${wing2.y} Z`;

  function handleMouseDownRoot() {
    return dispatch(A.mouseDownCamRoot());
  }

  function handleMouseDownPan() {
    return dispatch(A.mouseDownCamPan());
  }

  return (
    <g className="camera">
      <path d={triPath} />
      <circle
        className="camera-ctrl move"
        cx={pos.x}
        cy={pos.y}
        r="8"
        onMouseDown={handleMouseDownRoot}
      />
      <circle
        className="camera-ctrl move"
        cx={panCtrl.x}
        cy={panCtrl.y}
        r="8"
        onMouseDown={handleMouseDownPan}
      />
    </g>
  );
};

export default Camera;
