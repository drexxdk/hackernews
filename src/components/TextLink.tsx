import Link from 'next/link';
import { ReactNode } from 'react';

const TextLink = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <Link className="text-blue-500 underline hover:no-underline" href={href}>
      {children}
    </Link>
  );
};

export default TextLink;
