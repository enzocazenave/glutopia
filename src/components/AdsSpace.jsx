import { HeartHandShake } from "./Icons"

export const AdsSpace = () => {
  return (
    <section className="flex flex-col max-[1100px]:hidden">
      <section className="border rounded-md h-96 flex justify-center items-center">
        <h2 className="max-w-md text-opacity-30 text-black">Espacio reservado para publicidad</h2>
      </section>

      <a className="p-2 flex gap-2 mt-4 items-center cursor-pointer hover:bg-green-100 rounded-md">
        <p>Quiero que mi comercio aparezca en <b className="text-green-600">glutopía</b></p>
        <HeartHandShake width={56} height={56} className="stroke-green-600" />
      </a>
    </section>
  )
}