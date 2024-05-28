import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <aside className="flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Glutopía<span className="text-[0.4em]"> DEMO</span></h2>
        <nav>
          <ul className="flex flex-col gap-2">
            <NavLink to="/" className={({ isActive }) => `${isActive ? 'font-semibold' : ''} hover:font-semibold transition-colors`}>Inicio</NavLink>
            <NavLink to="/comunidad" className={({ isActive }) => `${isActive ? 'font-semibold' : ''} hover:font-semibold transition-colors`}>Comunidad</NavLink>
            <NavLink to="/mapa" className={({ isActive }) => `${isActive ? 'font-semibold' : ''} hover:font-semibold transition-colors`}>Mapa</NavLink>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-2 hover:bg-slate-50 hover:cursor-pointer p-2 rounded-md transition-colors">
        <img src="./user.png" className="w-6 h-6 rounded-full object-cover" />
        <span>Enzo Cazenave</span>
      </div>
    </aside>
  )
}