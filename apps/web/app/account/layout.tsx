import BreadCrumbs from "@/components/reusable/BreadCrumbs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const accountBreadCrumbsData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "My Account",
    link: "/account",
  },
];

const navigateData = [
  {
    title: "Manage My Account",
    links: [
      {
        name: "My Profile",
        to: "/account/profile",
      },
      {
        name: "Address Book",
        to: "/account/address",
      },
      {
        name: "My Payment Options",
        to: "/account/payment",
      },
    ],
  },
  {
    title: "My Orders",
    links: [
      {
        name: "My Returns",
        to: "/account/returns",
      },
      {
        name: "My Cancellations",
        to: "/account/cancellations",
      },
    ],
  },
  {
    title: "My WishList",
    links: [],
  },
];
const AccountLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={"flex flex-col"}>
      <div className={"flex flex-row justify-between"}>
        <BreadCrumbs breadCrumbsData={accountBreadCrumbsData} />
        <div className={"flex flex-row justify-center items-center"}>
          Welcome! <span className={"text-primary"}>&nbsp;Ramkumar</span>
        </div>
      </div>

      <div className={"grid grid-cols-3"}>
        <div className={"flex flex-col max-w-60 gap-4"}>
          {navigateData.map((navigateDatum, index) => (
            <div key={index} className={"flex flex-col gap-2"}>
              <p className={"text-lg font-semibold"}>{navigateDatum.title}</p>
              {navigateDatum.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.to}
                  shallow={true}
                  passHref={true}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className={"col-span-2"}>{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
