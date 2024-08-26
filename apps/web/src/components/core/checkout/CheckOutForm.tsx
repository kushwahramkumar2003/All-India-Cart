"use client";

import { boolean, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { Product } from "@repo/types";
import { useEffect, useState } from "react";
import { payWithSolana } from "@/actions/payWithSolana";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";

const formSchema = z.object({
  firstName: z.string(),
  companyName: z.string(),
  streetAddress: z.string(),
  extraAdd: z.string().optional(),
  townCity: z.string(),
  phoneNumber: z.string(),
  emailAdd: z.string(),
  saveInfo: boolean(),
});

// interface CartItem {
//   prodImg: StaticImageData;
//   name: string;
//   price: number;
//   quantity: number;
// }

// const cartProdData: CartItem[] = [
//   {
//     prodImg: constants.images.monitor,
//     name: "LCD Monitor",
//     price: 650,
//     quantity: 1,
//   },
//   {
//     prodImg: constants.images.cartController,
//     name: "H1 Gamepad",
//     price: 550,
//     quantity: 2,
//   },
// ];
const CheckOutForm = ({ product }: { product: Product }) => {
  // const { publicKey, signTransaction } = useWallet();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      companyName: "",
      streetAddress: "",
      extraAdd: "",
      townCity: "",
      phoneNumber: "",
      emailAdd: "",
      saveInfo: false,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  // const handlePayment = useCallback(async () => {
  //   debugger;
  //   if (!publicKey) {
  //     alert("Connect your wallet first!");
  //     return;
  //   }

  //   debugger;
  //   const transaction = await payWithSolana({
  //     recipient: "9KP44gv69EoXN2aB71u1HoYy5ZSZjXTpyYXygJ9phwCN", // Replace with merchant's wallet public key
  //     amount: product.unitPrice, // Payment amount in SOL
  //     payer: "",
  //   });
  //   debugger;
  //   if (transaction) {
  //     try {
  //       const signedTransaction = await signTransaction(transaction);
  //       const serializedTransaction = signedTransaction.serialize();
  //       debugger;
  //       // Send this serialized transaction to the server or broadcast it
  //       // For simplicity, we're logging it to the console
  //       console.log("Serialized Transaction: ", serializedTransaction);
  //     } catch (error) {
  //       console.error("Transaction signing failed", error);
  //     }
  //   }
  // }, [publicKey, signTransaction, product.unitPrice]);

  const { publicKey, sendTransaction, signTransaction, connect } = useWallet();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    if (publicKey && transaction) {
      handlePayment();
    }
  }, [publicKey, transaction]);

  const handlePrepareTransaction = async () => {
    const response = await payWithSolana({
      recipient: "9KP44gv69EoXN2aB71u1HoYy5ZSZjXTpyYXygJ9phwCN", // Replace with actual recipient
      amount: 1, // Amount in SOL
      payer: "",
    });

    if (response.status === "success") {
      const txn = Transaction.from(
        Buffer.from(response.data.transaction, "base64")
      );
      setTransaction(txn);
      connect(); // Prompt wallet connection
    } else {
      console.error("Failed to prepare transaction:", response.message);
    }
  };

  const handlePayment = async () => {
    if (!publicKey || !transaction) return;

    try {
      //@ts-ignore
      const signedTransaction = await signTransaction(transaction);

      const connection = new Connection("https://api.devnet.solana.com");

      const signature = await sendTransaction(signedTransaction, connection);

      await connection.confirmTransaction(signature, "finalized");

      console.log("Transaction successful:", signature);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  // const form = useForm()
  return (
    <div className={"grid grid-cols-2 max-md:gap-6 max-md:grid-cols-1 gap-8"}>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="extraAdd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apartment, floor, etc. (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="townCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Town/City*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailAdd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Save this information for faster check-out next time
              </label>
            </div>
          </form>
        </Form>
      </div>
      <div>
        <div className={"flex flex-col gap-4"}>
          {/* {cartProdData.map((cartProdDatum) => (
            <div className={"flex flex-row justify-between items-center"}>
              <div className={"flex flex-row gap-1"}>
                <Image
                  src={cartProdDatum.prodImg}
                  alt={cartProdDatum.name.toString()}
                />
                <p>{cartProdDatum.name}</p>
              </div>
              <p>${cartProdDatum.price}</p>
            </div>
          ))} */}
          <div className={"flex flex-row justify-between items-center"}>
            <div className={"flex flex-row gap-1"}>
              <Image
                src={product.picture[0]}
                alt={product.name}
                width={50}
                height={50}
              />
              <p>{product.name}</p>
            </div>
            <p>₹{product.unitPrice}</p>
          </div>
        </div>
        <div
          className={
            "flex flex-col gap-3 text-sm font-semibold text-gray-800 mt-4"
          }
        >
          <div className={"flex flex-row justify-between"}>
            <p>Subtotal:</p>
            <p>₹{product.unitPrice}</p>
          </div>
          <span className={"w-full h-[1px] bg-gray-400"} />
          <div className={"flex flex-row justify-between"}>
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <span className={"w-full h-[1px] bg-gray-400"} />
          <div className={"flex flex-row justify-between"}>
            <p>Total:</p>
            <p>₹{product.unitPrice}</p>
          </div>
        </div>
        <RadioGroup defaultValue="bank" className={"mt-6 flex flex-col gap-3"}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bank" id="r1" />
            <Label htmlFor="r1">Bank</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash" id="r2" />
            <Label htmlFor="r2">Cash on delivery</Label>
          </div>
        </RadioGroup>
        <div className={"flex flex-col gap-4 mt-4"}>
          <div className={"flex flex-row justify-between"}>
            <Input type={"text"} className={"max-w-60"} />
            <Button>Apply Coupon</Button>
          </div>

          <Button className={"mt-4"} onClick={handlePrepareTransaction}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CheckOutForm;
