import React from 'react';
import { StateContext, Selectors as S } from './state';

const ReflSphere: React.VFC = () => {
  const { state } = React.useContext(StateContext);

  const { pos, radius } = S.reflSphere(state);

  return <circle className="refl-sphere" cx={pos.x} cy={pos.y} r={radius} />;
};

export default ReflSphere;
