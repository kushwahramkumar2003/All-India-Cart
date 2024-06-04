import { atom } from "recoil";
import { User } from "@repo/types";

export const BACKEND_URL = "http://localhost:8080";

export const userAtom = atom<User | null>({
  key: "user",
  default: null,
});
