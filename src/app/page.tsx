"use client"
import { useRef } from "react";
import { useServiceRequests } from "@/hooks/useServiceRequests";
import Header from "./components/Header";
import ServiceRequestForm from "./components/ServiceRequestForm";
import ServiceRequestTable from "./components/ServiceRequestTable";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>({
  authMode: "userPool",
});

export default function Home() {
  const { serviceRequests, loading, error, refetch } = useServiceRequests();
  const tableRef = useRef<HTMLDivElement>(null);

  // Handle form submission
  const handleFormSubmit = async (newRequest: any) => {
    // Create new request in the backend
    try {
      await client.models.ServiceRequest.create(newRequest); // Directly create without using the addServiceRequest
      await refetch();  // Refetch service requests to avoid duplicates
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: "smooth" });  // Scroll to the table
      }
    } catch (err) {
      console.error("Error submitting request:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8 text-center pt-32">
        <h1 className="text-2xl font-bold text-orange-500">Welcome to the Service Request Tracker!</h1>
        <p className="text-md text-gray-700">Effortlessly track and manage your service requests.</p>

        <div className="bg-white shadow-lg rounded-xl p-8">
          <ServiceRequestForm onSubmit={handleFormSubmit} />
        </div>
        {loading && <p>Loading service requests...</p>}
        {error && <p>Error: {error}</p>}
        {serviceRequests.length > 0 && (
          <div ref={tableRef} className="bg-white shadow-lg rounded-xl p-6">
            <ServiceRequestTable serviceRequests={serviceRequests} />
          </div>
        )}
      </div>
    </div>
  );
}
