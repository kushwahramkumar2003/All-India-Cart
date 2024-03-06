import { MainNav } from "./main-nav"
import UserButton from "./user-button"

export default function Header() {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center w-full h-16 max-w-4xl px-4 mx-auto sm:px-6 gap-4">
        <MainNav />
        <UserButton />
      </div>
    </header>
  )
}
