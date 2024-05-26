"use client";

import { useUser } from "@repo/store";

export default function AuthApp() {
  const user = useUser();
  console.log("User ", user);
  return <></>;
}
