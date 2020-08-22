import { useState, useLayoutEffect, useEffect } from 'react';

export default function useElementSize (element = window) {
  const isClient = typeof window === 'object';


  function getSize() {
    let w;
    let h;

    if (isClient) {
      w = window.innerWidth;
      h = window.innerHeight;
    } else {
      const { width, height } = element.getBoundingClientRect();
      w = width;
      h = height;
    }

    return {
      width: w,
      height: h
    };
  }

  const [elementSize, setElementSize] = useState(getSize);

  function handleResize() {
    setElementSize(getSize());
  }

  console.debug('useElementSize', elementSize, element)
  useEffect(() => {
    if (!element) {
      return false;
    }
    
    setElementSize(getSize())
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    handleResize()
  }, []);

  return elementSize;
}