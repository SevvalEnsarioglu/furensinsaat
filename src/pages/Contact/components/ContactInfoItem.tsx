import React from 'react';
import { cn } from '../../../utils/cn';

interface ContactInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}

export default function ContactInfoItem({
  icon,
  label,
  value,
  className,
}: ContactInfoItemProps) {
  return (
    <div
      className={cn(
        'contact-info-item group flex items-start gap-4 border-b py-3 transition-colors',
        className
      )}
      style={{ borderColor: 'var(--border)' }}
    >
      <div
        className="mt-1 flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-y-[-2px]"
        style={{ color: 'var(--primary)' }}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <span
          className="text-xs font-semibold tracking-wider uppercase"
          style={{ color: 'var(--muted)' }}
        >
          {label}
        </span>
        <div
          className="text-sm leading-relaxed sm:text-base"
          style={{ color: 'var(--foreground)' }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
