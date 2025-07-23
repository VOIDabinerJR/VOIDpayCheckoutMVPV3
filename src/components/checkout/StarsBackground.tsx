// components/checkout/StarsBackground.tsx
'use client';
import { useState, useEffect, ReactNode } from 'react';

export const StarsBackground = () => {
  const [stars, setStars] = useState<ReactNode[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 3;
      const opacity = Math.random();
      const animationDuration = `${5 + Math.random() * 10}s`;
      
      return (
        <div 
          key={i}
          className="star"
          style={{
            position: 'absolute',
            top: `${y}%`,
            left: `${x}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: opacity,
            animation: `twinkle ${animationDuration} infinite alternate`
          }}
        />
      );
    });
    setStars(newStars);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      zIndex: -1,
      overflow: 'hidden'
    }}>
        {stars}
      </div>
    );
  }