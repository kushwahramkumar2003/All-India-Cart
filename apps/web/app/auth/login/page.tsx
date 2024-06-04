import Image from "next/image";
import constants from "@/constants";
import SignUpForm from "@/components/core/auth/Signup-form";
import SignupWith from "@/components/core/auth/SignupWith";
import Link from "next/link";
import LoginForm from "@/components/core/auth/Login-form";
import SigninWith from "@/components/core/auth/SigninWith";

function Login() {
  return (
    <div
      className={
        "grid grid-cols-2 px-2 max-md:flex max-md:flex-col max-md:px-1"
      }
    >
      <div className={"flex flex-col justify-center items-center"}>
        <Image src={constants.images.signupandloginimage} alt={"img"} />
      </div>
      <div
        className={
          "flex flex-col gap-3 justify-center text-start px-16 py-4 max-md:px-4"
        }
      >
        <div className={"flex flex-col gap-1"}>
          <h1 className={"text-3xl font-semibold"}>Log in to Exclusive</h1>
          <p className={"text-md font-semibold"}>Enter your details below</p>
        </div>

        <LoginForm />
        <SigninWith />
        <div className={"flex flex-row gap-2 text-gray-700 text-md"}>
          <p>Don't have account?</p>
          <Link className={"font-semibold"} href={"/auth/signup"}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
