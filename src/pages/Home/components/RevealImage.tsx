import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  parallaxStrength?: number; // between 0 and 1
  aspectRatio?: string;
  priority?: boolean;
}

export default function RevealImage({
  src,
  alt,
  className,
  imageClassName,
  parallaxStrength = 0.5,
  aspectRatio,
  priority = false,
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !parallaxRef.current || !imageRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(containerRef.current, { clipPath: 'inset(0% 0 0 0)' });
        return;
      }
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%', 
        }
      });
      
      tl.fromTo(
        containerRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { 
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.4,
          ease: 'power3.inOut'
        }
      ).fromTo(
        imageRef.current,
        { scale: 1.15, yPercent: 5 },
        {
          scale: 1,
          yPercent: 0,
          duration: 1.4,
          ease: 'power3.inOut'
        },
        '<'
      );
      
      if (parallaxStrength > 0) {
        // We use a 120% tall container, so we have 20% room to move.
        // We move from -10% to 10% (relative to its own height)
        const moveAmount = 10 * parallaxStrength; 
        
        gsap.fromTo(
          parallaxRef.current,
          { yPercent: -moveAmount },
          {
            yPercent: moveAmount,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [parallaxStrength]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'overflow-hidden relative',
        aspectRatio,
        className
      )}
      style={{ clipPath: 'inset(100% 0 0 0)' }}
    >
      <div 
        ref={parallaxRef} 
        className="absolute w-full h-[120%] -top-[10%] left-0 origin-center"
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className={cn('w-full h-full object-cover', imageClassName)}
        />
      </div>
    </div>
  );
}
