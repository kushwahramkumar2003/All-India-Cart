"use client";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userAtom, BACKEND_URL } from "../atoms";

export const useUser = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && typeof window !== "undefined") {
        console.log("refresh token api called");
        try {
          const response = await fetch(`${BACKEND_URL}/api/v1/auth/refresh`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          console.log("response", response);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            setUser(null);
          }
        } catch (e) {
          console.error(e);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, setUser]);

  return { user, loading };
};
