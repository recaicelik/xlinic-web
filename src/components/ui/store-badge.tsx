import Image from 'next/image';
import Link from 'next/link';

interface StoreBadgeProps {
  type: 'apple' | 'google';
  href: string;
}

export function StoreBadge({ type, href }: StoreBadgeProps) {
  return (
    <Link 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-transform hover:scale-105"
    >
      <Image
        src={`/images/${type}-store-badge.svg`}
        alt={`Download on ${type === 'apple' ? 'App Store' : 'Google Play'}`}
        width={type === 'apple' ? 120 : 135}
        height={40}
        className="h-[40px] w-auto"
      />
    </Link>
  );
} 