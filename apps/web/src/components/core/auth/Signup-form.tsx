"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { VscLoading } from "react-icons/vsc";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const SignUpSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignupForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  });

  const isPending = false;

  // const { isPending, mutate } = useMutation({
  //   mutationFn: async (data: z.infer<typeof SignUpSchema>) => {
  //     // await signUp(data);
  //   },
  //   onSuccess: () => {
  //     toast({
  //       title: "Success",
  //       description: "You have successfully signed up!",
  //       variant: "default",
  //       className: "text-green-500",
  //     });
  //     // form.setValue("name", "");
  //     // form.setValue("email", "");
  //     form.setValue("password", "");
  //     form.setValue("email", "");
  //     form.setValue("name", "");
  //
  //     console.log("Success");
  //     router.push("/login");
  //   },
  //   onError: (error: unknown) => {
  //     if (error instanceof Error) {
  //       toast({
  //         variant: "destructive",
  //         title: "Error occurred while signing up.",
  //         description: error?.message || "An unknown error occurred.",
  //         action: <ToastAction altText="Try again">Try again</ToastAction>,
  //       });
  //       console.log(error.message);
  //     }
  //
  //     console.log("Error:", error);
  //   },
  // });

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    // mutate(data);
  };

  return (
    // <div className="flex flex-col justify-start items-start">
    //   <Card className="p-0 py-0 px-0">
    //     <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid items-center w-full gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col space-y-1.5">
                  {/*<FormLabel className="text-left">Token</FormLabel>*/}
                  <FormControl>
                    {/*<Input*/}
                    {/*  type="text"*/}
                    {/*  placeholder="Enter your name"*/}
                    {/*  {...field}*/}
                    {/*/>*/}
                    <input
                      className={
                        "py-2 border-b-[1px] border-gray-400 focus:border-b-[1px] focus:border-red-400 outline-none"
                      }
                      type={`text`}
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />{" "}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col space-y-1.5 border-b-[1px]">
                  {/*<FormLabel className="text-left">Token</FormLabel>*/}
                  <FormControl>
                    {/*<Input*/}
                    {/*  type="email"*/}
                    {/*  placeholder="Your email"*/}
                    {/*  {...field}*/}
                    {/*/>*/}
                    <input
                      className={
                        "py-2 border-b-[1px] border-gray-400 focus:border-b-[1px] focus:border-red-400 outline-none"
                      }
                      type="email"
                      placeholder="Your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col space-y-1.5">
                  {/*<FormLabel className="text-left">Password</FormLabel>*/}
                  <FormControl>
                    {/*<Input*/}
                    {/*  type={`${showPassword ? "text" : "password"}`}*/}
                    {/*  placeholder="Enter your password"*/}
                    {/*  {...field}*/}
                    {/*/>*/}
                    <input
                      className={
                        "py-2 border-b-[1px] border-gray-400 focus:border-b-[1px] focus:border-red-400 outline-none"
                      }
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/*<div className="flex items-center ml-4 space-x-2">*/}
          {/*  <Checkbox*/}
          {/*    id="showPassword"*/}
          {/*    checked={showPassword}*/}
          {/*    onCheckedChange={() => {*/}
          {/*      setShowPassword(!showPassword);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*  <label*/}
          {/*    htmlFor="showPassword"*/}
          {/*    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
          {/*  >*/}
          {/*    Show Password*/}
          {/*  </label>*/}
          {/*</div>*/}
          <Button
            type="submit"
            className={`disabled:cursor-not-allowed disabled:bg-slate-800 font-semibold mt-3`}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <VscLoading className="mr-2 animate-spin spin-in-180" />
                <span>Creating your account....</span>
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </div>
      </form>
    </Form>
    //     </CardContent>
    //   </Card>
    // </div>
  );
};

export default SignupForm;
