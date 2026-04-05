import { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  className?: string;
}

export const SafeImage = ({ 
  src, 
  alt, 
  fallbackSrc = '/images/placeholder.png', 
  className, 
  ...props 
}: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setImgSrc(fallbackSrc);
      setError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};
