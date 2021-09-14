import React from 'react';
import { StateContext, reducer, initState } from './state';
import Room from './Room';
import Pov from './Pov';

const App: React.VFC = () => {
  const [state, dispatch] = React.useReducer(reducer, initState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <main>
        <Room />
        <Pov />
      </main>
    </StateContext.Provider>
  );
};

export default App;
