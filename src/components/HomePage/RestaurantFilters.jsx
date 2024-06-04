import { FilledBookmark, Input } from ".."

export const RestaurantFilters = ({ name, onChange, savedFilter, setSavedFilter }) => {
  return (
    <div>
      <Input name="name" value={name} onChange={onChange} className="w-full" placeholder="Buscar por nombre de comercio" />

      <div className="flex mt-2 gap-2">
        <select className="flex-1 border rounded-md p-2 focus:outline-none" defaultValue="default">
          <option value="default" disabled>Filtro por zona</option>
        </select>
        <select className="flex-1 border rounded-md p-2 focus:outline-none" defaultValue="default">
          <option value="default" disabled>Filtro por reseñas</option>
        </select>

        <button onClick={() => { setSavedFilter(prev => !prev) }} className={`flex items-center gap-2 p-2 flex-1 border rounded-md justify-center hover:bg-green-100 transition-colors ${ savedFilter ? 'bg-green-100' : 'bg-white'}`}>
          <FilledBookmark width={20} />
          Guardados
        </button>
      </div>
    </div>
  )
}