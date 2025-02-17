import { NextRequest, NextResponse } from "next/server";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "./src/utils/utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  try {
    const authenticated = await runWithAmplifyServerContext({
      nextServerContext: { request, response },
      operation: async (context) => {
        const session = await fetchAuthSession(context, {});
        console.log("Session in middleware:", session); // Debugging
        return session.tokens !== undefined; // Ensure tokens exist
      },
    });

    if (authenticated) {
      console.log("User is authenticated. Proceeding to page.");
      return response;
    }
  } catch (err) {
    console.error("Error in authentication check:", err);
  }

  console.log("User is not authenticated. Redirecting to /signup");
  return NextResponse.redirect(new URL("/signup", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signup).*)"],
};
