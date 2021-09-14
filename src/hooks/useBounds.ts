import React from 'react';
import { ROOM_BORDER } from '../state';

export function useBounds(
  ref: React.RefObject<SVGSVGElement>,
  onChange: (bounds: Bounds) => unknown
): Bounds {
  const [bounds, setBounds] = React.useState({ left: 0, top: 0 });
  const handler = React.useRef(onChange);

  const recomputeBounds = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const left = rect.left + ROOM_BORDER;
    const top = rect.top + ROOM_BORDER;
    setBounds({ left, top });
    handler.current({ left, top });
  }, [ref]);

  React.useLayoutEffect(() => {
    recomputeBounds();

    window.addEventListener('resize', recomputeBounds);
    return () => window.removeEventListener('resize', recomputeBounds);
  }, [recomputeBounds]);

  return bounds;
}

export interface Bounds {
  left: number;
  top: number;
}
