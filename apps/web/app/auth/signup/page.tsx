import Image from "next/image";
import constants from "@/constants";
import SignUpForm from "@/components/core/auth/Signup-form";
import Link from "next/link";
import SignupWith from "@/components/core/auth/SignupWith";
import SigninWith from "@/components/core/auth/SigninWith";

function Signup() {
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
          <h1 className={"text-3xl font-semibold"}>Create an account</h1>
          <p className={"text-md font-semibold"}>Enter your details below</p>
        </div>

        <SignUpForm />
        <SignupWith />
        <div className={"flex flex-row gap-2 text-gray-700 text-md"}>
          <p>Already have account?</p>
          <Link className={"font-semibold"} href={"/auth/login"}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
