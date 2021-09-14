import React from 'react';
import { StateContext, Actions as A, ROOM_WIDTH, ROOM_HEIGHT } from './state';
import { useMouse, useBounds } from './hooks';
import Camera from './Camera';
import Sphere from './Sphere';
import ReflSphere from './ReflSphere';
import Rays from './Rays';

const Room: React.VFC = () => {
  const { dispatch } = React.useContext(StateContext);

  const ref = React.useRef(null);
  const bounds = useBounds(ref, bounds => dispatch(A.updateBounds(bounds)));
  useMouse(bounds, {
    onMove: pos => dispatch(A.mouseMove(pos)),
    onUp: () => dispatch(A.mouseUp()),
  });

  return (
    <svg id="room" width={2 * ROOM_WIDTH} height={ROOM_HEIGHT} ref={ref}>
      <Rays />
      <Camera />

      <Sphere />
      <ReflSphere />

      <rect
        className="mirror-room"
        x={ROOM_WIDTH}
        y="0"
        width={ROOM_WIDTH}
        height={ROOM_HEIGHT}
      />
      <line
        className="mirror"
        x1={ROOM_WIDTH}
        y1="0"
        x2={ROOM_WIDTH}
        y2={ROOM_HEIGHT}
      />
    </svg>
  );
};

export default Room;
