import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms";

export const useUser = () => {
  const value = useRecoilValue(userAtom);
  return value;
};
