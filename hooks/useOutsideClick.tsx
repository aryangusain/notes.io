import { useEffect, useRef, useCallback } from 'react';

export const useOutsideClick = (callback: () => void, excludeRefs?: React.RefObject<HTMLElement | null>[]) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    const target = event.target as Node;
    
    // Check if click is inside the main element
    if (ref.current && ref.current.contains(target)) {
      return;
    }
    
    // Check if click is on any excluded elements
    if (excludeRefs && excludeRefs.length > 0) {
      const isOnExcluded = excludeRefs.some(excludeRef => 
        excludeRef?.current && excludeRef.current.contains(target)
      );
      if (isOnExcluded) {
        return;
      }
    }
    
    // Call callback only if click is outside main element and not on excluded elements
    callback();
  }, [callback, excludeRefs]);

  useEffect(() => {
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      // Clean up event listeners
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
};