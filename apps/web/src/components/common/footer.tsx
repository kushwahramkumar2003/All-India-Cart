"use client";
import CustomLink from "../reusable/custom-link";
import { FooterData } from "../../data/footerData";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-auto px-4 py-8 m-0 space-y-1 text-sm text-white bg-black sm:px-6 md:h-auto md:items-center md:space-y-0 md:space-x-4 md:flex-row sm:flex-col">
      <div className="grid grid-cols-1 md:gap-4 md:grid-cols-5 md:px-10 gap-8">
        {FooterData.map((footerItem) => (
          <div className="flex flex-col gap-3" key={footerItem.title}>
            <h2 className="text-xl">{footerItem.title}</h2>
            {footerItem.items.map((item, i) => (
              <div className="" key={i + item.type + i}>
                {item.type == "sub-title" && (
                  <h3 className="text-lg">{item.name}</h3>
                )}
                {item.type == "paragraph" && <p>{item.name}</p>}
                {item.type == "link" && item.to && (
                  <CustomLink href={item.to}>{item.name}</CustomLink>
                )}
                {item.type == "react-element" && item?.element}
              </div>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
