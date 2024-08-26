"use client";
import BreadCrumbs from "@/components/reusable/BreadCrumbs";
import { PiPhoneCallLight } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { VscLoading } from "react-icons/vsc";
import { Textarea } from "@/components/ui/textarea";

const ContactSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().length(10, { message: "Please enter valid phone number." }),
  message: z.string().optional(),
});

const contactDetailsData = [
  {
    icon: <PiPhoneCallLight size={20} />,
    title: "Call To Us",
    info: ["We are available 24/7, 7 days a week.", "Phone: +8801611112222"],
  },
  {
    icon: <MdOutlineEmail size={20} />,
    title: "Write To US",
    info: [
      "Fill out our form and we will contact you within 24 hours.",
      "Emails: customer@exclusive.com",
      "Emails: support@exclusive.com",
    ],
  },
];

const contactBreadCrumbsData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];
export default function Index() {
  const isPending = false;
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
  });

  // const { isPending, mutate } = useMutation({
  //     mutationFn: async (data: z.infer<typeof ContactSchema>) => {
  //         // await signUp(data);
  //     },
  //     onSuccess: () => {
  //         toast({
  //             title: "Success",
  //             description: "You have successfully signed up!",
  //             variant: "default",
  //             className: "text-green-500",
  //         });
  //         form.setValue("fullName", "");
  //         form.setValue("email", "");
  //         form.setValue("phone", "");
  //         form.setValue("message", "");
  //
  //         console.log("Success");
  //         // navigate("/login");
  //     },
  //     onError: (error: unknown) => {
  //         if (error instanceof Error) {
  //             toast({
  //                 variant: "destructive",
  //                 title: "Error occurred while signing up.",
  //                 description: error?.message || "An unknown error occurred.",
  //                 action: <ToastAction altText="Try again">Try again</ToastAction>,
  //             });
  //             console.log(error.message);
  //         }
  //
  //         console.log("Error:", error);
  //     },
  // });

  //eslint-disable-next-line
  const onSubmit = (data: z.infer<typeof ContactSchema>) => {
    // mutate(data);
  };

  return (
    <div className="w-full space-y-10 transition-all duration-300 mt-4 mb-10 p-4">
      <div className={""}>
        <BreadCrumbs breadCrumbsData={contactBreadCrumbsData} />
      </div>
      <div className={"flex flex-row gap-4 max-sm:flex-col  max-sm:gap-10"}>
        <div className={"flex flex-col max-w-64 max-sm:w-full"}>
          {contactDetailsData.map((item, i) => {
            return (
              <div className={"flex flex-col gap-2 "} key={item.title}>
                <div className={"flex flex-row gap-3 items-center  "}>
                  <span
                    className={
                      "flex justify-center items-center text-center rounded-full p-1 text-white bg-[#DB4444]"
                    }
                  >
                    {item.icon}
                  </span>
                  <p className={"text-lg font-semibold"}>{item.title}</p>
                </div>
                <div className={"flex flex-col gap-4"}>
                  {item.info.map((item) => (
                    <p className={"text-sm text-gray-800"} key={item}>
                      {item}
                    </p>
                  ))}
                </div>
                {contactBreadCrumbsData.length !== i + 1 && (
                  <div className={"w-full h-[1px]  mt-2 mb-4 bg-gray-600"} />
                )}
              </div>
            );
          })}
        </div>
        <div className="">
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
                        "flex flex-row justify-between gap-6 max-xmd:flex-col max-md:flex-col"
                      }
                    >
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col space-y-1.5 ">
                              <FormControl>
                                <Input
                                  className={"outline-none focus:outline-none"}
                                  type="text"
                                  placeholder="Your name"
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
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Your Email"
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
                        name="phone"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col space-y-1.5">
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Your Phone"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    {/*<div >*/}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormControl>
                              <Textarea
                                placeholder="Type your message here."
                                rows={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    {/*</div>*/}
                  </div>
                  <Button
                    type="submit"
                    variant={"destructive"}
                    className={`disabled:cursor-not-allowed disabled:bg-slate-800`}
                    // disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <VscLoading className="mr-2 animate-spin spin-in-180" />
                        <span>Message Sending....</span>
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
