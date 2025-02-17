"use client";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import ServiceRequestTable from "../components/ServiceRequestTable";
import { useRouter } from "next/navigation"; // Import useRouter

const client = generateClient<Schema>({
  authMode: "userPool",
});

export default function ServiceRequestPage() {
  const router = useRouter(); 
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServiceRequests = async () => {
    try {
      setLoading(true);
      const response = await client.models.ServiceRequest.list();
      setServiceRequests(response?.data || []);
    } catch (err) {
      setError("Failed to fetch service requests");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  return (
    <div className="min-h-screen pt-20"> 
      <div className="px-6 py-10 space-y-8">
        <button
          onClick={() => router.back()} 
          className="text-sm text-blue-500 hover:text-blue-700 transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>

        {loading && <p>Loading service requests...</p>}
        {error && <p>Error: {error}</p>}
        {serviceRequests.length > 0 && (
          <div className="w-full">
            <ServiceRequestTable serviceRequests={serviceRequests} />
          </div>
        )}
      </div>
    </div>
  );
}