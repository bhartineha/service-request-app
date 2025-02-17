import Link from 'next/link';
import Image from 'next/image';
import Logout from './Logout'; // Ensure this is the correct path to your Logout component

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/signup">
          <div className="flex items-center">
            <Image
              src="/logo.png" // Ensure your logo is in the public folder
              alt="Service Tracker Logo"
              width={150}
              height={50}
            />
          </div>
        </Link>

        <div className="flex items-center space-x-6">
          {/* Add the "Service Request" link */}
          <Link href="/servicerequesttable">
            <span className="bg-gradient-to-r from-blue-500 to-orange-500 text-white text-sm px-6 py-2 rounded-[30px] transition-transform transform hover:scale-105 shadow-md cursor-pointer">
              Service Requests
            </span>
          </Link>

          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;