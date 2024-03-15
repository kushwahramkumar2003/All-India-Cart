import Link from 'next/link'
import {Button} from "@/components/ui/button";
import BreadCrumbs from "@/components/reusable/BreadCrumbs";


const notFoundBreadCrumbsData = [
    {
        name:"Home",
        link:"/"
    },
    {
        name:"404",
        link:"/404"
        
    }
]
export default function NotFound() {
    return (
        <div>
            <div>
                <BreadCrumbs breadCrumbsData={notFoundBreadCrumbsData}/>
            </div>
            <div className={"w-full justify-center items-center text-center flex flex-col gap-6"}>
                <h2 className={"text-[5rem] font-semibold"}>404 Not Found</h2>
                <p className={"text-sm text-gray-700"}>Your visited page not found. You may go home page.</p>
                <Button variant={"destructive"} className={"mt-8"}>Back to home page</Button>
            </div>
        </div>
    )
}