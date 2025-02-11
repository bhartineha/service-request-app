'use client';

import Logout from './Logout';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-600">
              Service Tracker
            </span>
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