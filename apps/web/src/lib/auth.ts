import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { SessionStrategy } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { db } from "@/db";
import { Account, User } from "@prisma/client";

export const authOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GithubProvider({
      //eslint-disable-next-line
      clientId: process.env.GITHUB_ID || "",
      //eslint-disable-next-line
      clientSecret: process.env.GITHUB_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      //eslint-disable-next-line
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      //eslint-disable-next-line
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  //eslint-disable-next-line
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  pages: {
    signIn: "/auth",
  },
  session: { strategy: "jwt" as SessionStrategy },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any; profile: any }) {
      return await ensureUserAndAccount(user, account);
    },
    async jwt({ token, user }: any) {
      if (token && user) {
        //eslint-disable-next-line
        let userInDb = await db.user.findUnique({
          where: {
            email: user.email,
          },
        });
        token.id = user.id;
        token.avatar = user.avatar;
      }
      // console.log("token", token);
      return token;
    },

    //eslint-disable-next-line
    async session({ session, token, user }: any) {
      // const user = await db.user.findUnique({
      //   where: {
      //     id: token.sub,
      //   },
      // });
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        // session.avatar = user.avatar;
      }
      if (token) {
        session.user.image = token.avatar;
      }
      // console.log("session : ", session);
      // console.log("session user : ", user);
      // console.log("session token : ", token);
      return session;
    },
  },
};

async function ensureUserAndAccount(user: User | any, account: Account | any) {
  try {
    // const providerEnum = account.provider.toLowerCase() as AuthProvider; // Convert to lower case to match the enum

    let userInDb = await db.user.findUnique({
      where: { email: user.email },
    });

    if (!userInDb) {
      const userProfile = await db.userProfile.create({ data: {} });
      userInDb = await db.user.create({
        data: {
          email: user.email,
          name: user.name,
          userProfileId: userProfile.id,
          avatar: user.image,
        },
      });
    }

    await db.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        },
      },
      update: {},
      create: {
        userId: userInDb.id,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        type: "oauth", // Add this line
      },
    });
  } catch (err) {
    console.error("Error ensuring user and account:", err);
    return false;
  }
  return true;
}
