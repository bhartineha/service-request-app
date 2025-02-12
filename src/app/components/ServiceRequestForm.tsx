"use client"; // Required for client-side interactivity

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
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
  authMode: 'userPool',
});

type ServiceRequestFormProps = {
  onSubmit: (data: any) => void;
};

export default function ServiceRequestForm({ onSubmit }: ServiceRequestFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmitForm: SubmitHandler<FormData> = async (data) => {
    const caseNumber = uuidv4();
    const resolutionDate = calculateResolutionDate(data.creationDate, data.severity);

    const requestData = {
      ...data,
      caseNumber,
      resolutionDate,
    };

    try {
      await client.models.ServiceRequest.create(requestData);
      onSubmit(requestData); // Call the onSubmit prop
      reset(); // Reset the form
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
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Name */}
        <div className="relative">
          <label className="absolute top-0 left-2 bg-white px-1 text-sm text-gray-600">
            Service Request Name
          </label>
          <input
            {...register("serviceName")}
            className="w-full p-4 border-2 text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Reporter Name */}
        <div className="relative">
          <label className="absolute top-0 left-2 bg-white px-1 text-sm text-gray-600">Reporter Name</label>
          <input
            {...register("reporterName")}
            className="w-full text-sm p-4 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {errors.reporterName && <p className="text-red-500 text-sm">{errors.reporterName.message}</p>}
        </div>
      </div>

      {/* Description */}
      <div className="relative">
        <label className="absolute top-0 left-2 bg-white px-1 text-sm text-gray-600">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-4 text-sm border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Creation Date */}
        <div className="relative">
          <label className="absolute top-0 left-2 bg-white px-1 text-sm text-gray-600">Creation Date</label>
          <input
            type="date"
            {...register("creationDate")}
            className="w-full p-4 text-sm border-2 text-gray-600 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {errors.creationDate && <p className="text-red-500 text-sm">{errors.creationDate.message}</p>}
        </div>

        {/* Resolution Date */}
        <div className="relative">
          <label className="absolute top-0 left-2 bg-white px-1 text-sm text-gray-600">Resolution Date</label>
          <input
            type="date"
            {...register("resolutionDate")}
            className="w-full p-4 text-sm border-2 text-gray-600 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {errors.resolutionDate && <p className="text-red-500 text-sm">{errors.resolutionDate.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Severity */}
        <div className="relative">
          <label className="absolute top-0 left-2 bg-white px-1 text-sm text-gray-600">Severity</label>
          <select
            {...register("severity")}
            className="w-full p-4 border-2 text-sm text-gray-600 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.severity && <p className="text-red-500 text-sm">{errors.severity.message}</p>}
        </div>

        {/* Contact Email */}
        <div className="relative">
          <label className="absolute top-0 left-2 bg-white px-1 text-sm text-gray-600">Contact Email</label>
          <input
            type="email"
            {...register("contactEmail")}
            className="w-full p-3 text-sm text-gray-600 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {errors.contactEmail && <p className="text-red-500 text-sm">{errors.contactEmail.message}</p>}
        </div>
      </div>

      {/* Location */}
      <div className="relative">
        <label className="absolute top-0 left-2 bg-white px-1 text-sm text-gray-600">Location</label>
        <input
          {...register("location")}
          className="w-full p-4 text-sm border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-1/4 bg-gradient-to-r from-blue-500 to-orange-500 text-white text-sm px-6 py-2 rounded-[30px] transition-transform transform hover:scale-105 shadow-md"
      >
        Submit
      </button>
    </form>
  );
}