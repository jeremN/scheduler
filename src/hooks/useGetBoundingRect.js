import {
  useRef,
  useCallback,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';

function useGetBoundingRect() {
  const ref = useRef();
  const [rect, setRect] = useState({});

  const set = useCallback(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) return;
    set();
  }, [set]);

  useEffect(() => {
    if (!ref.current) return;

    /* if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(() => set());
      resizeObserver.observe(ref.current);
      return () => {
        if (resizeObserver) {
          resizeObserver.disconnect();
          resizeObserver = null;
        } else {
          return;
        }
      };
    } else { */
    window.addEventListener('resize', set);

    return () => window.removeEventListener('resize', set);
    // }
  }, [set]);
  return [rect, ref];
}

export { useGetBoundingRect };
