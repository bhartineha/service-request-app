## Service Request Tracker Application

# Overview

The Service Request Tracker is a front-end application built using AWS Amplify that allows authenticated users to submit and manage service requests. The application integrates with Amazon DynamoDB for storing and retrieving service request data. It includes user authentication, form validation, and dynamic data display.

# Key Features
  # User Authentication:

  1. Login and signup functionality using AWS Amplify's authentication service.
  2. Only authenticated users can access the application's main features.

  # Service Request Form:

  1. A form to submit service requests with the following fields:
  2. Service Request Name (Short Text)
  3. Service Request Description (Long Text)
  4. Creation Date (Date Input)
  5. Severity (Dropdown: Low, Medium, High)
  6. Resolution Date (Automatically calculated based on severity)
  7. Reporter Name (Text Input)
  8. Contact Information (Email Input)
  9. Location (Text Input)

  # Form Validation:

  1. Ensures all required fields are filled out before submission.
  2. Uses Zod for schema validation.

  # DynamoDB Integration:

  1. On form submission, a unique case number is generated using a UUID.
  2. Data is saved to DynamoDB using the Amplify API.
  3. Dynamic Data Display:
  4. Retrieve and display submitted service requests from DynamoDB.
  5. The UI updates dynamically as new entries are added.

## Technologies Used
  # Frontend Framework:
   1. Next.js (15.1.6): A React framework for server-rendered applications.

  # UI Components:
  1. @aws-amplify/ui-react (6.9.1): Pre-built UI components for AWS Amplify.
  2. ag-grid-react (33.0.4): A high-performance grid component for displaying tabular data.
  3. ag-grid-community (33.0.4): Core library for AG Grid. 

  # State Management and Forms:

   1. react-hook-form (7.54.2): A library for managing form state and validation.
   2. @hookform/resolvers (4.0.0): Resolvers for integrating validation libraries like Zod.
   3. zod (3.24.1): A TypeScript-first schema validation library.

## Getting Started
  1. Clone the Repository:
     git clone https://github.com/bhartineha/service-request-app.git
     cd <repository-folder>
  2. Install Dependencies:
     npm install

  ![Screenshot 2025-02-13 at 11 46 42 AM](https://github.com/user-attachments/assets/c48ac8b6-38d2-4998-a8ac-cf2befdf39e9)
![Screenshot 2025-02-13 at 11 47 07 AM](https://github.com/user-attachments/assets/0be6b979-4b1d-43b4-ab7d-c60a20f5a2ad)
![Screenshot 2025-02-13 at 11 46 28 AM](https://github.com/user-attachments/assets/4d498c9e-12f4-490d-ac0c-6a87b7a7a4f4)




