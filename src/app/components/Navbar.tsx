import React from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-white text-2xl font-semibold hover:underline">
            Home
          </Link>
          <Link href="/todo" className="text-white text-2xl font-semibold hover:underline">
            Todo
          </Link>
        </div>
        <div className='text-white text-xl font-semibold'>
          <UserButton />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
