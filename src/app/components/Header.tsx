'use client';

import Logout from './Logout';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/logo.png" // Ensure your logo is in the public folder
              alt="Service Tracker Logo"
              width={150}
              height={50}
            />
          </div>
        </Link>

        <div>
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
