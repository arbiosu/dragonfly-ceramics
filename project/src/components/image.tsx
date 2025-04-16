import Image from 'next/image';

interface NextImageWrapperProps {
  url: string;
  altText: string;
  sizeProps: string;
}

export function NextImageWrapper({
  url,
  altText,
  sizeProps,
}: NextImageWrapperProps) {
  return (
    <Image
      src={url}
      alt={altText}
      fill
      data-loaded='false'
      className='object-cover data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10 data-[loaded=false]:bg-gray-400'
      sizes={sizeProps}
      unoptimized
      onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
      priority
    />
  );
}
