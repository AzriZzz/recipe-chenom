/* eslint-disable @next/next/no-img-element */
import { LazyImageProps } from '@/models/interface';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <img
      ref={ref}
      src={inView ? src : ''}
      alt={alt}
      className={className}
    />
  );
};

export default LazyImage;
