import Image from 'next/image';

interface CompanyLogoProps {
  name: string;
  logo?: string | null;
  size?: number;
}

export default function CompanyLogo({ name, logo, size = 48 }: CompanyLogoProps) {
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size * 2}&background=4640DE&color=fff&bold=true&format=svg`;

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
            (e.target as HTMLImageElement).src = fallbackUrl;
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-md overflow-hidden flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src={fallbackUrl}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
}
