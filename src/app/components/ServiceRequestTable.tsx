"use client";

import { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { ColDef } from "ag-grid-community";

type ServiceRequest = {
  id: string; // Ensure this field is included
  serviceName: string | null;
  description: string | null;
  creationDate: string | null;
  resolutionDate: string | null;
  severity: string | null;
  reporterName: string | null;
  contactEmail: string | null;
  location: string | null;
  caseNumber: string | null;
  readonly updatedAt: string;
};

export default function ServiceRequestTable() {
  const [rowData, setRowData] = useState<ServiceRequest[]>([]);

  // Initialize the Amplify client
  const client = generateClient<Schema>({
    authMode: 'identityPool',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data using the Amplify client
      const { data: serviceRequests, errors } = await client.models.ServiceRequest.list();
      console.log(serviceRequests);
      if (errors) {
        console.error("Errors fetching data:", errors);
        return;
      }

      // Update the row data with the fetched items
      setRowData(serviceRequests);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const columnDefs: ColDef<ServiceRequest>[] = [
    { field: "caseNumber", headerName: "Case Number" },
    { field: "serviceName", headerName: "Name" },
    { field: "description", headerName: "Description" },
    { field: "creationDate", headerName: "Creation Date" },
    { field: "severity", headerName: "Severity" },
    { field: "resolutionDate", headerName: "Resolution Date" },
    { field: "reporterName", headerName: "Reporter Name" },
    { field: "contactEmail", headerName: "Contact Information" },
    { field: "location", headerName: "Location" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <h1>Tickets</h1>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
}