'use client';

import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/signup"); // Redirect to the signup page after signing out
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-gradient-to-r from-blue-500 to-orange-500 text-white text-sm px-6 py-2 rounded-[30px] transition-transform transform hover:scale-105 shadow-md"
    >
      Sign Out
    </button>
  );
};

export default Logout;