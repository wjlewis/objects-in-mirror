import React from 'react';
import { StateContext, Selectors as S, POV_WIDTH, POV_HEIGHT } from './state';

const Pov: React.VFC = () => {
  const { state } = React.useContext(StateContext);

  const sphere = S.povSphere(state);
  const reflSphere = S.povReflSphere(state);

  return (
    <svg id="pov" width={POV_WIDTH} height={POV_HEIGHT}>
      {reflSphere && (
        <circle
          className="refl-sphere"
          cx={reflSphere.pos.x}
          cy={POV_HEIGHT / 2}
          r={reflSphere.radius}
        />
      )}

      {S.povWalls(state).map(wall => (
        <rect
          key={wall.className}
          className={wall.className}
          x={wall.x}
          width={wall.width}
          height={POV_HEIGHT}
        />
      ))}

      {sphere && (
        <circle
          className="sphere"
          cx={sphere.pos.x}
          cy={POV_HEIGHT / 2}
          r={sphere.radius}
        />
      )}
    </svg>
  );
};

export default Pov;
