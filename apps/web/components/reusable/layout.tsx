import Header from "../common/header"
import Footer from "../common/footer"
import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*<Header />*/}
      <main>{children}</main>
      {/*<Footer />*/}
    </>
  )
}
