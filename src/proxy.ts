import { NextRequest, NextResponse } from "next/server";

const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "admin123";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Elegance Admin"',
    },
  });
}

export function proxy(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  const encoded = auth.slice("Basic ".length);
  const [user, password] = atob(encoded).split(":");

  if (user !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
