import Header from "./components/Header";
import ServiceRequestForm from "./components/ServiceRequestForm";
import ServiceRequestTable from "./components/ServiceRequestTable";

export default function Home() {
  return (
    <div className="space-y-14">
      <Header />
      <div className="text-center space-y-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">
          Welcome to Service Request Tracker
        </h1>
        <p className="text-gray-700">
          Track and manage your service requests efficiently.
        </p>
        <div className="flex justify-center items-center min-h-screen">
          <div className="space-y-8 w-full max-w-4xl">
            <div className="w-2/3 mx-auto">
              <ServiceRequestForm />
            </div>
            <div className="w-3/4 mx-auto">
              <ServiceRequestTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}