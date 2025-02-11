'use client'
import { withAuthenticator } from "@aws-amplify/ui-react"
import { AuthUser } from "aws-amplify/auth"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import '@aws-amplify/ui-react/styles.css'
import { fetchAuthSession } from "aws-amplify/auth"

const Signup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession()
        setIsAuthenticated(session.tokens !== undefined)
      } catch (err) {
        console.log(err)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    return null // or a loading spinner
  }

  if (isAuthenticated) {
    redirect('/')
  }
  console.log('Signup - isAuthenticated:', isAuthenticated)
  const AuthenticatedSignup = withAuthenticator(() => null)
  return <AuthenticatedSignup />
}

export default Signup