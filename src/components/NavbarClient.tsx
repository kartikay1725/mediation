'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {

  
  return (
    <nav className="bg-white items-center shadow-sm p-4">
      <div className="flex px-54 sm:px-155 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-4">
          <Image
            src="/icons/icon.svg"
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <h1 className="text-3xl font-bold text-primary">Mediation</h1>
        </Link>
        </div>
    </nav>

        
  );
}
