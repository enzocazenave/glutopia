import { useState } from "react"
import { CaretDown, CaretUp } from "../components/Icons"

const FrequentQuestion = ({ title, description }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-1 pr-2">
      <div className="bg-green-200 py-1 px-2 rounded-md cursor-pointer flex justify-between items-center select-none hover:opacity-80 transition-colors" onClick={() => setOpen(prev => !prev)}>
        <h3 className="font-semibold">{title}</h3>
        { open ? <CaretUp width={20} /> : <CaretDown width={20} /> }
      </div>
      {open
        ? description
        : null
      }
    </div>
  )
}

const FrequentQuestionsPage = () => {
  return (
    <section className="fade-in flex flex-col gap-6 overflow-auto pb-6">
      <h2 className="text-lg font-semibold">Preguntas frecuentes</h2>

      <FrequentQuestion
        title="¿Qué alimentos debo evitar si tengo celiaquía?"
        description={<p>Las personas con celiaquía deben evitar todos los alimentos que contengan gluten, una proteína que se encuentra en el trigo, la cebada y el centeno. Esto incluye productos como pan, pasta, galletas, pasteles y muchos alimentos procesados que pueden contener gluten como aditivo. Es crucial leer las etiquetas de los productos alimenticios y buscar aquellos certificados como 'sin gluten'.</p>}
      />

      <FrequentQuestion
        title="¿Es segura la avena para las personas con celiaquía?"
        description={<p>La avena pura, que no está contaminada con trigo, cebada o centeno, es generalmente segura para la mayoría de las personas con celiaquía. Sin embargo, es esencial asegurarse de que la avena esté certificada como libre de gluten, ya que la contaminación cruzada durante el procesamiento puede ser un problema. Algunas personas con celiaquía también pueden ser sensibles a la avenina, una proteína de la avena, y pueden necesitar evitarla.</p>}
      />

      <FrequentQuestion
        title="¿Cómo puedo prevenir la contaminación cruzada con gluten en mi cocina?"
        description={
          <>
            <p>Para prevenir la contaminación cruzada con gluten en la cocina, sigue estos pasos:</p>
            <ul className="ml-8 list-disc">
              <li>Usa utensilios, tablas de cortar y ollas exclusivas para alimentos sin gluten.</li>
              <li>Guarda los alimentos sin gluten en lugares separados de los que contienen gluten.</li>
              <li>Limpia bien las superficies de trabajo y los electrodomésticos después de preparar alimentos con gluten.</li>
              <li>Usa tostadoras y coladores exclusivos para alimentos sin gluten.</li>
              <li>Evita usar aceites o agua que hayan estado en contacto con alimentos con gluten.</li>
            </ul>
          </>
        }
      />

      <FrequentQuestion
        title="¿Cuáles son las opciones de tratamiento disponibles para el SIBO?"
        description={<p> El tratamiento del SIBO generalmente incluye antibióticos para reducir el sobrecrecimiento bacteriano. Los más comúnmente recetados son la rifaximina y la neomicina. Además del tratamiento con antibióticos, se recomienda seguir una dieta baja en FODMAPs o una dieta específica para SIBO para reducir los síntomas. También se pueden usar probióticos para restablecer el equilibrio de la flora intestinal. En algunos casos, se considera el tratamiento de condiciones subyacentes, como disfunción del intestino delgado o problemas de motilidad, que pueden estar contribuyendo al desarrollo de SIBO.</p>}
      />

      <FrequentQuestion
        title="¿Cómo afecta la celiaquía a los niños y cuáles son los síntomas específicos en ellos?"
        description={
          <>
            <p>La celiaquía en niños puede presentar síntomas diferentes a los adultos. En los niños, los síntomas pueden incluir:</p>
            <ul className="ml-8 list-disc">
              <li>Retraso en el crecimiento y baja estatura.</li>
              <li>Pérdida de peso o dificultad para ganar peso.</li>
              <li>Irritabilidad y cambios de humor.</li>
              <li>Dolor abdominal recurrente y diarrea crónica.</li>
              <li>Deficiencias nutricionales, como anemia por deficiencia de hierro.</li>
            </ul>
            <p>Si sospechas que tu hijo tiene celiaquía, consulta a un pediatra para una evaluación adecuada y pruebas diagnósticas.</p>
          </>
        }
      />
    </section>
  )
}

export default FrequentQuestionsPage