import React from "react";
import Link from "next/link";


interface breadCrumb{
    name:string,
    link:string,
}
interface temp{
    breadCrumbsData:breadCrumb[]
}

const BreadCrumbs = ({ breadCrumbsData }:temp) => {
    return (
        <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
            {breadCrumbsData.map((item, index) => {
                return (
                    <div
                        className="text-xs text-black opacity-50 md:text-sm font-roboto"
                        key={index}
                    >
                        <Link href={item.link}>{item.name}</Link>
                        {index < breadCrumbsData.length - 1 && <span className="px-3">/</span>}
                    </div>
                );
            })}
        </div>
    );
};

export default BreadCrumbs;
