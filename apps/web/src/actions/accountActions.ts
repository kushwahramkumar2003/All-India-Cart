"use server";
import { db } from "@/db";

export async function GetUserDetails(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      profile: true,
    },
  });
  return user;
}
