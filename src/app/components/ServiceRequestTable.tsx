import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { ColDef } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ServiceRequest } from "@/types/ServiceRequestTypes";

type ServiceRequestTableProps = {
  serviceRequests: ServiceRequest[];
};

export default function ServiceRequestTable({ serviceRequests }: ServiceRequestTableProps) {
  // Define columnDefs with explicit field types
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
    <div className="ag-theme-alpine bg-white shadow-md rounded-lg px-8" style={{ height: "calc(100vh - 200px)", width: "100%" }}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Service Requests Overview</h2>
        <p className="text-sm text-gray-600">Manage and track all active service requests efficiently.</p>
      </div>
      <AgGridReact
        rowData={serviceRequests}
        columnDefs={columnDefs}
        modules={[ClientSideRowModelModule]}
        domLayout="autoHeight" // Adjust height dynamically
        defaultColDef={{
          flex: 1, // Make columns flexible
          minWidth: 150, // Minimum column width
          resizable: true, // Allow column resizing
        }}
      />
    </div>
  );
}