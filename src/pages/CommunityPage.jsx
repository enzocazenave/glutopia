import { Input } from "../components"
import { IncomingMessage, OutgoingMessage } from "../components/CommunityPage/"
import { FilledStar, Photo, Send } from "../components/Icons/"

const CommunityPage = () => {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex justify-between">
        <button className="flex items-center gap-2 p-2 border rounded-md justify-center transition-colors bg-white hover:bg-green-100">
          <FilledStar width={16} />
          Mensajes destacados
        </button>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-green-400 w-3 h-3"></div>
          <span>50 usuarios en línea</span>
        </div>
      </header>

      <main className="flex-1 gap-4 border rounded-md p-4 flex flex-col">
        <IncomingMessage name="Enzo Cazenave" imgSrc="/user.png" message="Les recomiendo este lugar en Av Libertador, se llama x" />
        <OutgoingMessage message="Que bueno, lo voy a tener en cuenta" />
        <IncomingMessage name="Enzo Cazenave" imgSrc="/user.png" message="Les recomiendo este lugar en Av Libertador, se llama x" />
        <OutgoingMessage message="Que bueno, lo voy a tener en cuenta" />
        <OutgoingMessage message="Que bueno, lo voy a tener en cuenta" />
        <IncomingMessage name="Enzo Cazenave" imgSrc="/user.png" message="Les recomiendo este lugar en Av Libertador, se llama x" />

      </main>

      <footer className="flex gap-3">
        <Input placeholder="Escriba su mensaje" className="flex-1" />
        <button className="flex items-center px-3 border rounded-md justify-center hover:bg-green-100 transition-colors bg-white">
          <Photo width={16} />
        </button>
        <button className="flex items-center px-3 border rounded-md justify-center hover:bg-green-100 transition-colors bg-white">
          <Send width={20} />
        </button>
      </footer>
    </section>
  )
}

export default CommunityPage