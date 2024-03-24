import BreadCrumbs from "@/components/reusable/BreadCrumbs";
import Link from "next/link";

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
        to: "/profile",
      },
      {
        name: "Address Book",
        to: "/address",
      },
      {
        name: "My Payment Options",
        to: "/payment",
      },
    ],
  },
  {
    title: "My Orders",
    links: [
      {
        name: "My Returns",
        to: "/returns",
      },
      {
        name: "My Cancellations",
        to: "/cancellations",
      },
    ],
  },
  {
    title: "My WishList",
    links: [],
  },
];
const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={"flex flex-col"}>
      <div className={"flex flex-row justify-between"}>
        <BreadCrumbs breadCrumbsData={accountBreadCrumbsData} />
        <div className={"flex flex-row justify-center items-center"}>
          Welcome! <span className={"text-primary"}>&nbsp;Ramkumar</span>
        </div>
      </div>

      <div className={"flex flex-row"}>
        <div className={"flex flex-col max-w-60 gap-4"}>
          {navigateData.map((navigateDatum) => (
            <div className={"flex flex-col gap-2"}>
              <p className={"text-lg font-semibold"}>{navigateDatum.title}</p>
              {navigateDatum.links.map((link) => (
                <Link className={"text-sm text-gray-600"} href={link.to}>
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
