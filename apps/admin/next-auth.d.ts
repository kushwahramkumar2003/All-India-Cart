// types/next-auth.d.ts

import NextAuth, { DefaultSession } from 'next-auth';

// Extend the Session interface
declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Add other properties as needed
    } & DefaultSession['user'];
  }
}

// Extend the JWT interface
declare module 'next-auth/jwt' {
  interface JWT {
    id: string; // Add other properties as needed
  }
}
