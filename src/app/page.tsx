import ServiceRequestForm from "./components/ServiceRequestForm";

export default function Home() {
  return (
    <div className="min-h-screen ">
      
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8 text-center pt-32">
        <h1 className="text-2xl font-bold text-orange-500">Welcome to the Service Request Tracker!</h1>
        <p className="text-md text-gray-700">Effortlessly track and manage your service requests.</p>

        <div className="bg-white shadow-lg rounded-xl p-8">
          <ServiceRequestForm />
        </div>
      </div>
    </div>
  );
}