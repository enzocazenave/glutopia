import { FilledBookmark, Input } from ".."

export const RestaurantFilters = () => {
  return (
    <div>
      <Input className="w-full" placeholder="Buscar por nombre de comercio" />

      <div className="flex mt-2 gap-2">
        <select className="flex-1 border rounded-md p-2">
          <option value="" disabled selected>Filtro por zona</option>
        </select>
        <select className="flex-1 border rounded-md p-2">
          <option value="" disabled selected>Filtro por reseñas</option>
        </select>

        <button className="flex items-center gap-2 p-2 flex-1 border rounded-md justify-center hover:bg-slate-50 transition-colors">
          <FilledBookmark width={20} />
          Guardados
        </button>
      </div>
    </div>
  )
}