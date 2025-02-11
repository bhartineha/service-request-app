import Logout from "./components/Logout";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        Welcome to Service Request Tracker
      </h1>
      <p className="text-gray-700">
        Track and manage your service requests efficiently.
      </p>
    </div>
  );
}