import React from "react";
import { VscSend } from "react-icons/vsc";
import { RiFacebookLine } from "react-icons/ri";
import { FiTwitter } from "react-icons/fi";
import { SiInstagram } from "react-icons/si";
import { RiLinkedinLine } from "react-icons/ri";
import Image from "next/image";
import constants from "@/constants";

type FooterItem = {
  name?: string;
  type: "sub-title" | "paragraph" | "link" | "react-element";
  to?: string;
  element?: React.ReactNode;
};

type FooterSection = {
  type: "promote" | "support" | "account" | "quick link" | "Download App";
  title: string;
  items: FooterItem[];
};

export const FooterData: FooterSection[] = [
  {
    type: "promote",
    title: "Exclusive",
    items: [
      {
        name: "Subscribe",
        type: "sub-title",
      },
      {
        name: "Get 10% off your first order",
        type: "paragraph",
      },
      {
        type: "react-element",
        element: (
          <div className="px-4 py-2 border border-white rounded-md  flex flex-row text-white justify-between items-center gap-4 sm:flex-row sm:items-center">
            <input
              type="text"
              className="outline-none bg-black focus:outline-none p-4 w-full sm:w-auto"
              placeholder="Enter your email"
            />
            <VscSend size={20} />
          </div>
        ),
      },
    ],
  },
  {
    type: "support",
    title: "Support",
    items: [
      {
        name: "111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.",
        type: "paragraph",
      },
      {
        name: "exclusive@gmail.com",
        type: "paragraph",
      },
      {
        name: "+88015-88888-9999",
        type: "paragraph",
      },
    ],
  },
  {
    type: "account",
    title: "Account",
    items: [
      {
        name: "My Account",
        type: "link",
        to: "/account",
      },
      {
        name: "Login / Register",
        type: "link",
        to: "/login",
      },
      {
        name: "Cart",
        type: "link",
        to: "/cart",
      },
      {
        name: "Wishlist",
        type: "link",
        to: "/wishlist",
      },
      {
        name: "Shop",
        type: "link",
        to: "/shop",
      },
    ],
  },
  {
    type: "quick link",
    title: "Quick Link",
    items: [
      {
        name: "Privacy Policy",
        type: "link",
        to: "/policy",
      },
      {
        name: "Terms Of Use",
        type: "link",
        to: "/terms",
      },
      {
        name: "FAQ",
        type: "link",
        to: "/faq",
      },
      {
        name: "Contact",
        type: "link",
        to: "/contact",
      },
    ],
  },
  {
    type: "Download App",
    title: "Download App",
    items: [
      {
        type: "react-element",
        element: (
          <div className={"flex flex-col gap-3"}>
            <p className={"text-slate-600"}>Save $3 with App New User Only</p>
            <div className={"flex flex-row gap-3 flex-wrap"}>
              <Image src={constants.images.qrcodeImg} alt={"app qrcode"} />
              <div className={"flex flex-col gap-3"}>
                <Image
                  src={constants.images.playStoreImg}
                  alt={"play store"}
                  // height={40}
                  // className={"w-full"}
                />
                <Image
                  src={constants.images.appStoreImg}
                  alt={"app store"}
                  // height={40}
                  // className={"w-full"}
                />
              </div>
            </div>
            <div className={"flex flex-row gap-8"}>
              <RiFacebookLine size={28} />
              <FiTwitter size={25} />
              <SiInstagram size={25} />
              <RiLinkedinLine size={28} />
            </div>
          </div>
        ),
      },
    ],
  },
];
