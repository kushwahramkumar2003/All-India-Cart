"use client";

import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { GetUserDetails } from "@/actions/accountActions";
import { useSession } from "next-auth/react";

export default function useUserDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const res = await GetUserDetails(userId);
        if (res) {
          //@ts-ignore
          setUser(res);
          setSuccess("User details fetched successfully");
        }
      } catch (error) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  return { loading, error, success, user };
}
