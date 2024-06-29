import { HeartHandShake } from "./Icons"

export const AdsSpace = () => {
  return (
    <section className="flex flex-col max-[1100px]:hidden">
      <section className="border rounded-md h-96 flex justify-center items-center">
        <h2 className="max-w-md text-opacity-30 text-black">Espacio reservado para publicidad</h2>
      </section>

      <a className="p-4 flex gap-4 mt-4 items-center cursor-pointer hover:bg-green-100 rounded-md">
        <HeartHandShake width={68} height={68} className="stroke-green-600" />
        <p>Quiero que mi comercio aparezca en <b className="text-green-600">glutopía</b></p>
      </a>
    </section>
  )
}