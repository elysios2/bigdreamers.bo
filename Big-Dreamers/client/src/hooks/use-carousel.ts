import { useState, useEffect, useCallback } from 'react';

export function useCarousel(itemCount: number, interval: number = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const updateCurrentIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount);
    }, interval);
    
    return () => clearInterval(timer);
  }, [itemCount, interval]);
  
  return { currentIndex, updateCurrentIndex };
}
