import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    if (!containerRef.current) return;

    const proxy = { rotation: 0, zoom: 6 };
    
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      // the scroll distance during which the pin is active
      end: "+=2000",
      pin: true,
      scrub: 1, // smooth scrubbing
      onUpdate: (self) => {
        // Rotate 360 degrees (Math.PI * 2)
        proxy.rotation = self.progress * Math.PI * 2;
        // Zoom in slightly from 6 to 4 to give a depth feeling
        proxy.zoom = 6 - (self.progress * 2);
        
        setRotation(proxy.rotation);
        setZoom(proxy.zoom);
      }
    });

    return () => {
      trigger.kill();
    };
  }, [containerRef]);

  return { rotation, zoom };
};
