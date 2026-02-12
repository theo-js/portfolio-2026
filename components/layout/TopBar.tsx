import Link from 'next/link';
import type { FC } from 'react';
import { MaxContentWidth } from '../ui/layout/MaxContentWidth';

export const TopBar: FC = () => (
  <nav className="text-foreground fixed top-0 z-50 w-full bg-transparent px-6">
    <MaxContentWidth className="flex h-16 items-center justify-center">
      <h1 className="text-xl font-bold">My Portfolio</h1>

      <div className="ml-auto flex space-x-4">
        <Link href={{ hash: 'home' }}>Home</Link>
        <Link href={{ hash: 'about' }}>About</Link>
      </div>
    </MaxContentWidth>
  </nav>
);
