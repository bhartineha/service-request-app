export type ServiceRequest = {
  id: string;
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