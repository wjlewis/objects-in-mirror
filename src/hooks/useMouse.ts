import React from 'react';
import { Bounds } from './useBounds';
import { Vec } from '../tools';

export function useMouse(bounds: Bounds, handlers: UseMouseHandlers) {
  const onMove = React.useRef(handlers.onMove);
  const onUp = React.useRef(handlers.onUp);

  React.useLayoutEffect(() => {
    function handleMove(e: MouseEvent) {
      const { clientX, clientY } = e;
      const { left, top } = bounds;
      return onMove.current(new Vec(clientX - left, clientY - top));
    }

    function handleUp() {
      return onUp.current();
    }

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [bounds, onMove, onUp]);
}

export interface UseMouseHandlers {
  onMove: (pos: Vec) => unknown;
  onUp: () => unknown;
}
