'use client'; // This component uses client-side features like onClick

import Logout from "./Logout";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-600">
              Service Tracker
            </span>
          </div>
        </Link>

        {/* Sign Out Button */}
        <Logout />
      </div>
    </header>
  );
};

export default Header;