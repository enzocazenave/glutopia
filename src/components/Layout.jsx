import { Suspense } from "react"
import { Sidebar, AdsSpace } from "./"

export const Layout = ({ children }) => {
  return (
    <main className="grid grid-cols-[16rem_auto_20rem] max-w-[1280px] mx-auto py-4 gap-4 h-screen px-4 max-[1100px]:grid-cols-[16rem_auto]">
      <Sidebar />
      
      <Suspense fallback={<h2>Cargando...</h2>}>
        { children }
      </Suspense>

      <AdsSpace />
    </main>
  )
}