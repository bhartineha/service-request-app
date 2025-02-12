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
    <div className="ag-theme-alpine" style={{ minHeight: 200, height:300, width: "100%" }}>
      <h1>Tickets</h1>
      <AgGridReact
        rowData={serviceRequests}
        columnDefs={columnDefs}
        modules={[ClientSideRowModelModule]} 
      />
    </div>
  );
}