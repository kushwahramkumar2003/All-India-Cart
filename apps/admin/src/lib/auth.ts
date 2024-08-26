import { db } from '@/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@repo/db/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Session, SessionStrategy } from 'next-auth';
import type { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password', placeholder: 'Your password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Missing credentials');
        }

        const { username, password } = credentials;

        // Find supplier by email
        const supplier = await prisma.supplier.findUnique({
          where: { email: username },
          select: { id: true, password: true, contactName: true, email: true },
        });

        if (!supplier || !supplier.password) {
          throw new Error('Invalid email or password');
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, supplier.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const jwtToken = jwt.sign({ id: supplier.id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });

        // Update user token in the database
        await prisma.supplier.update({
          where: { id: supplier.id },
          //@ts-ignore
          data: { token: jwtToken },
        });

        return {
          id: supplier.id,
          name: supplier.contactName,
          email: supplier.email,
          token: jwtToken,
        } as SupplierUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.uid) {
        (session.user as SupplierSessionUser).id = token.uid as string;
        (session.user as SupplierSessionUser).jwtToken = token.jwtToken as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as SupplierUser).id;
        token.jwtToken = (user as SupplierUser).token;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
};

// TypeScript interfaces
export interface SupplierSessionUser {
  id: string;
  jwtToken: string;
  email: string;
  name: string;
}

export interface SupplierSession extends Session {
  user: SupplierSessionUser;
}

export interface SupplierToken extends JWT {
  uid: string;
  jwtToken: string;
}

export interface SupplierUser extends NextAuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
}
