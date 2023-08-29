import React from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-evenly">
        <Link href="/" className="text-white text-xl font-semibold">Home</Link>
        <Link href="/todo" className="text-white text-xl font-semibold">Todo</Link>
        <UserButton/>
      </div>
    </nav>
  );
};

export default Navbar;
