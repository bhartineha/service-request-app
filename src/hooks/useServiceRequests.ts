import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>({
  authMode: "userPool",
});

export const useServiceRequests = () => {
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch service requests
  const fetchServiceRequests = async () => {
    try {
      setLoading(true);
      if (!client?.models?.ServiceRequest) {
        throw new Error("ServiceRequest model is missing in client");
      }

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

  return {
    serviceRequests,
    loading,
    error,
    refetch: fetchServiceRequests, // Provide refetch function to reload data
  };
};
