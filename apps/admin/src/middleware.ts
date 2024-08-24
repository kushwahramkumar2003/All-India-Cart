import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  //@ts-ignore
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define public routes that do not require authentication
  const publicRoutes = ['/auth/sign-in', '/auth/signup', '/auth/reset-password'];

  // Allow access if the user is accessing public routes or the API/auth routes
  if (publicRoutes.includes(pathname) || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // If the user is authenticated, continue to the requested route
  if (token) {
    return NextResponse.next();
  }

  // If the user is not authenticated and trying to access a private route, redirect to the login page
  const loginUrl = new URL('/auth/sign-in', req.url);
  return NextResponse.redirect(loginUrl);
}

// Configure the middleware to apply to all routes except those in the public routes array
export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
