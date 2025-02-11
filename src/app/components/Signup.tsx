'use client'
import { withAuthenticator } from "@aws-amplify/ui-react";
import { AuthUser } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import '@aws-amplify/ui-react/styles.css';

const Signup = ({ user }: { user?: AuthUser }) => {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (user) {
      redirect('/');
    } else {
      setIsChecking(false);
    }
  }, [user]);

  if (isChecking) return <p>Checking authentication...</p>;

  return null;
};

export default withAuthenticator(Signup);
