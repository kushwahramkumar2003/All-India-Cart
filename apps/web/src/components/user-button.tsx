"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
// import { SignIn, SignOut } from "./auth-components";
import Link from "next/link";
import { useUser } from "@repo/store";
import { FaRegUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { signOut, useSession } from "next-auth/react";

export default function UserButton() {
  // const { toast } = useToast();
  // const router = useRouter();
  // const { user, loading } = useUser();
  // const logoutHandler = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8080/api/v1/auth/logout",
  //       {
  //         withCredentials: true,
  //         maxRedirects: 0, // To prevent Axios from following redirects automatically
  //       },
  //     );
  //
  //     if (response.status === 200) {
  //       console.log("Logout successful:", response.data);
  //     } else if (response.status === 302) {
  //       window.location.href = response.headers.location; // Manually handle the redirect
  //     }
  //
  //     // Notify the user
  //     toast({
  //       title: "Logout successfully!!",
  //     });
  //
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //
  //     // Notify the user
  //     toast({
  //       title: "Error in logout!!",
  //     });
  //   }
  // };

  const session = useSession();
  const user = session?.data?.user;

  // console.log("user --> ", user);

  if (!user) return <Link href={"/auth/login"}>SignIn</Link>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full ">
          <Avatar className="w-8 h-8">
            {user.image && (
              <AvatarImage src={user?.image} alt={user.name ?? ""} />
            )}
            <AvatarFallback className={"text-primary"}>
              <FaRegUser />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem
          className={"flex justify-center items-center flex-col"}
        >
          <Link
            href={"/account/profile"}
            className={"flex justify-center items-center text-center"}
          >
            <Button className={""} variant={"link"}>
              Account
            </Button>
          </Link>
        </DropdownMenuItem>{" "}
        <DropdownMenuItem
          className={"flex justify-center items-center flex-col"}
        >
          <Button
            onClick={async () => {
              await signOut({ callbackUrl: "http://localhost:3000" });
            }}
            variant={"link"}
            className={"flex justify-center items-center text-center"}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
