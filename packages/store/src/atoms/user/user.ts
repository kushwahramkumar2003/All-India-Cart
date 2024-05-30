import { atom, selector } from "recoil";
import { User } from "@repo/types";
export const BACKEND_URL = "http://localhost:8080";

export const userAtom = atom<User>({
  key: "user",
  default: selector({
    key: "user/default",
    get: async () => {
      console.log("refresh token api called");
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/refresh`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (e) {
        console.error(e);
      }

      return null;
    },
  }),
});
