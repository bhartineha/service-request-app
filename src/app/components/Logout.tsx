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
      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
    >
      Sign Out
    </button>
  );
};

export default Logout;