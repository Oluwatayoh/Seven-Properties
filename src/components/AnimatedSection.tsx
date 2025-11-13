"use client";

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

export function AnimatedSection({ children, className, as: Tag = 'section' }: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-opacity transform duration-1000 ease-in-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      {children}
    </Tag>
  );
}
