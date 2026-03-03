'use client';

import Image from 'next/image';

interface CompanyLogoProps {
  name: string;
  logo?: string | null;
  size?: number;
}

export default function CompanyLogo({ name, logo, size = 48 }: CompanyLogoProps) {
  if (logo) {
    return (
      <div
        className="rounded-md overflow-hidden border border-neutrals-20 bg-white flex items-center justify-center flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src={logo}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-md overflow-hidden flex-shrink-0 bg-primary flex items-center justify-center border border-neutrals-20"
      style={{ width: size, height: size }}
    >
      <span style={{ color: '#fff', fontWeight: 'bold', fontSize: `${size / 2.5}px` }}>{name ? name.substring(0, 2).toUpperCase() : 'NA'}</span>
    </div>
  );
}
