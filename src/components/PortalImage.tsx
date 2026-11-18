import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface PortalImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackLabel?: string;
}

export function PortalImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  fallbackLabel,
}: PortalImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EBE6DC] text-[#57534E] border border-[#E2DDD4] p-6 text-center ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-6 h-6 mb-2 text-[#78716C]" aria-hidden="true" />
        <p className="text-xs font-medium text-[#1C1917] max-w-xs">
          {fallbackLabel || alt}
        </p>
        <p className="text-[11px] text-[#78716C] mt-1">Dokumentasi SMP Negeri 2 Pulung</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#EBE6DC] ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={className}
      />
    </div>
  );
}
