import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization")

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1]
    const [user, pwd] = atob(authValue).split(":")

    if (
      user === process.env.BASIC_AUTH_USERNAME &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next()
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  })
}

export const config = {
  matcher: "/:path*",
}
