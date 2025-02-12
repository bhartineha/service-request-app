"use client"; // Required for client-side interactivity

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import FileUpload from "./FileUpload";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

// Zod schema for form validation
const schema = z.object({
  serviceName: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  creationDate: z.string().min(1, "Creation date is required"),
  resolutionDate: z.string().min(1, "Resolution date is required"),
  severity: z.enum(["Low", "Medium", "High"]),
  reporterName: z.string().min(1, "Reporter name is required"),
  contactEmail: z.string().email("Invalid email"),
  location: z.string().min(1, "Location is required"),
});

type FormData = z.infer<typeof schema>;

const client = generateClient<Schema>({
  authMode: 'identityPool',
});

export default function ServiceRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const caseNumber = uuidv4();
    const resolutionDate = calculateResolutionDate(data.creationDate, data.severity);

    const requestData = {
      ...data,
      caseNumber,
      resolutionDate,
    };
    console.log("Submitting data:", requestData);
    try {
      await client.models.ServiceRequest.create(requestData);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const calculateResolutionDate = (creationDate: string, severity: string) => {
    const date = new Date(creationDate);
    if (severity === "Low") date.setDate(date.getDate() + 5);
    else if (severity === "Medium") date.setDate(date.getDate() + 3);
    else if (severity === "High") date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-gray-100 rounded-md border-2 border-dotted border-gray-300">
      <div className="flex space-x-4">
        <label className="w-60 text-gray-700 text-right">Service Request Name</label>
        <input
          {...register("serviceName")}
          className="flex-1 p-2 border-2 border-gray-300 rounded-md"
        />
      </div>
      {errors.serviceName && <span className="text-red-500">{errors.serviceName.message}</span>}

      <div className="flex space-x-4">
        <label className="w-60 text-gray-700 text-right">Service Request Description</label>
        <textarea
          {...register("description")}
          className="flex-1 p-2 border-2 border-gray-300 rounded-md"
        />
      </div>
      {errors.description && <span className="text-red-500">{errors.description.message}</span>}

      <div className="flex space-x-4">
        <label className="w-60 text-gray-700 text-right">Creation Date:</label>
        <input
          type="date"
          {...register("creationDate")}
          className="flex-1 p-2 border-2 border-gray-300 rounded-md"
        />
      </div>
      {errors.creationDate && <span className="text-red-500">{errors.creationDate.message}</span>}

      <div className="flex space-x-4">
        <label className="w-60 text-gray-700 text-right">Severity</label>
        <select
          {...register("severity")}
          className="flex-1 p-2 border-2 border-gray-300 rounded-md"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      {errors.severity && <span className="text-red-500">{errors.severity.message}</span>}

      <div className="flex space-x-4">
        <label className="w-60 text-gray-700 text-right">Resolution Date:</label>
        <input
          type="date"
          {...register("resolutionDate")}
          className="flex-1 p-2 border-2 border-gray-300 rounded-md"
        />
      </div>
      {errors.resolutionDate && <span className="text-red-500">{errors.resolutionDate.message}</span>}

      <div className="flex space-x-4">
        <label className="w-60 text-gray-700 text-right">Reporter Name</label>
        <input
          {...register("reporterName")}
          className="flex-1 p-2 border-2 border-gray-300 rounded-md"
        />
      </div>
      {errors.reporterName && <span className="text-red-500">{errors.reporterName.message}</span>}

      <div className="flex space-x-4">
        <label className="w-60 text-gray-700 text-right">Contact Information</label>
        <input
          type="email"
          {...register("contactEmail")}
          className="flex-1 p-2 border-2 border-gray-300 rounded-md"
        />
      </div>
      {errors.contactEmail && <span className="text-red-500">{errors.contactEmail.message}</span>}

      <div className="flex space-x-4">
        <label className="w-60 text-gray-700 text-right">Location</label>
        <input
          {...register("location")}
          className="flex-1 p-2 border-2 border-gray-300 rounded-md"
        />
      </div>
      {errors.location && <span className="text-red-500">{errors.location.message}</span>}
      {/* <FileUpload /> */}
      <button
        type="submit"
        className="px-6 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}