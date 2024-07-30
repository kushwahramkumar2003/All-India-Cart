import { MainNav } from "@/components/main-nav";
import UserButton from "@/components/user-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex justify-center border-b bg-blend-normal  backdrop-filter backdrop-blur-lg">
      <div className="flex items-center w-full h-16 max-w-[68rem] px-4 mx-auto sm:px-6 gap-4  ">
        <MainNav />

        <UserButton />
      </div>
    </header>
  );
}
