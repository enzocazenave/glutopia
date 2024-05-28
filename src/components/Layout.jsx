import { Sidebar, AdsSpace } from "./"

export const Layout = ({ children }) => {
  return (
    <main className="grid grid-cols-[16rem_auto_20rem] max-w-[1280px] mx-auto py-4 gap-4 h-screen px-4">
      <Sidebar />

      <section>
        { children }
      </section>

      <AdsSpace />
    </main>
  )
}