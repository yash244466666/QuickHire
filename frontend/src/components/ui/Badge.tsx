import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'yellow' | 'red' | 'purple' | 'blue' | 'outline';
  className?: string;
}

export default function Badge({
  children,
  variant = 'blue',
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full',
        {
          'bg-success/10 text-success': variant === 'green',
          'bg-warning/10 text-warning': variant === 'yellow',
          'bg-error/10 text-error': variant === 'red',
          'bg-label-purple/10 text-label-purple': variant === 'purple',
          'bg-primary-25 text-primary': variant === 'blue',
          'border border-neutrals-20 text-neutrals-80 bg-transparent': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
