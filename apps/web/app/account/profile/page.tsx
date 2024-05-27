"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { VscLoading } from "react-icons/vsc";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ToastAction } from "@/components/ui/toast";
import { Label } from "@/components/ui/label";
import { useUser } from "@repo/store";

const ContactSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),

  firstName: z
    .string()
    .min(1, { message: "First name must be at least 1 characters." }),
  lastName: z
    .string()
    .min(1, { message: "First name must be at least 1 characters." }),
  address: z
    .string()
    .min(5, { message: "In your Address must have at least 5 characters." }),
  newPassword: z
    .string()
    .min(8, "Your password must have at least 8 characters."),
  currentPassword: z
    .string()
    .min(8, { message: "Your password must have at least 8 characters." }),
  confirmPassword: z
    .string()
    .min(8, { message: "Your password must have at least 8 characters." }),
});

export default function Index() {
  const user = useUser();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      email: user.email,
      firstName: user.name?.split(" ")[0],
      lastName: user.name?.split(" ")[1],
      address: user.profile.addresses || "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof ContactSchema>) => {
      // await signUp(data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have successfully signed up!",
        variant: "default",
        className: "text-green-500",
      });
      form.setValue("firstName", "");
      form.setValue("email", "");
      form.setValue("lastName", "");
      form.setValue("address", "");
      form.setValue("newPassword", "");
      form.setValue("confirmPassword", "");
      form.setValue("currentPassword", "");

      console.log("Success");
      // navigate("/login");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error occurred while signing up.",
          description: error?.message || "An unknown error occurred.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        console.log(error.message);
      }

      console.log("Error:", error);
    },
  });

  const onSubmit = (data: z.infer<typeof ContactSchema>) => {
    mutate(data);
  };

  return (
    <div className="w-full space-y-10 flex flex-col">
      <p className={"text-2xl text-primary"}>Edit your Profile</p>
      <Card className="w-full border-none">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={"flex flex-col gap-6"}
            >
              <div className="flex flex-col gap-6">
                <div
                  className={
                    "flex flex-col justify-between gap-6 max-xmd:flex-col max-md:flex-col"
                  }
                >
                  <div className={"grid grid-cols-2 gap-4"}>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-col space-y-1.5 ">
                            <Label>First Name</Label>
                            <FormControl>
                              <Input
                                className={"outline-none focus:outline-none"}
                                type="text"
                                placeholder="Your first name"
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
                      name="lastName"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-col space-y-1.5">
                            <Label>Last Name</Label>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Your first name"
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
                      name="email"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-col space-y-1.5">
                            <Label>Email</Label>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Your Email"
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
                      name="address"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-col space-y-1.5">
                            <Label>Address</Label>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Your Address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />{" "}
                  </div>
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col space-y-1.5">
                          <Label>Password Changes</Label>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Current Password"
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
                    name="newPassword"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col space-y-1.5">
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="New Password"
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
                    name="confirmPassword"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col space-y-1.5">
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm New Password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
              <div className={"flex flex-row justify-between"}>
                <Button
                  type="submit"
                  variant={"destructive"}
                  className={`disabled:cursor-not-allowed disabled:bg-slate-800 bg-transparent hover:text-primary hover:bg-transparent text-gray-800`}
                  // disabled={isPending}
                >
                  Cancel
                </Button>{" "}
                <Button
                  type="submit"
                  variant={"destructive"}
                  className={`disabled:cursor-not-allowed disabled:bg-slate-800`}
                  // disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <VscLoading className="mr-2 animate-spin spin-in-180" />
                      <span>Saving....</span>
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
