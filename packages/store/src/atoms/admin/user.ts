import { atom } from "recoil";

export interface Admin {
  email: string;
  name: string;
  companyName: string;
  contactTitle: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  fax: string;
  homePage: string;
  url: string;
  picture: string;
  ranking: number;
}
export interface AuthState {
  isLoggedIn: boolean;
  user: Admin | null;
}

// const getGetAuthStateFromLocalStorage = (): null | AuthState => {
//   const authUser = localStorage.getItem("authUser");
//   if (authUser === "undefined" || !authUser) return null;
//   return JSON.parse(authUser) as AuthState;
// };

export const adminAtom = atom<null | Admin>({
  key: "adminAtom",
  default: null,
});
export const authStateAtom = atom<AuthState | null>({
  key: "authStateAtom",
  default: null,
});
