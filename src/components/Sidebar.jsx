import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <aside className="flex flex-col justify-between">
      <div>
        <img className="mb-4 max-w-44" src="/logo.png" />
        <nav>
          <ul className="flex flex-col gap-2">
            <NavLink to="/" className={({ isActive }) => `${isActive ? 'font-semibold' : ''} hover:font-semibold transition-all`}>
              Inicio
            </NavLink>
            <NavLink to="/comunidad" className={({ isActive }) => `${isActive ? 'font-semibold' : ''} hover:font-semibold transition-all`}>
              Comunidad
            </NavLink>
            <NavLink to="/mapa" className={({ isActive }) => `${isActive ? 'font-semibold' : ''} hover:font-semibold transition-all`}>
              Mapa
            </NavLink>
          </ul>
        </nav>
      </div>

      <NavLink to="/cuenta" className={({ isActive }) => `${isActive ? 'bg-slate-100' : ''} flex items-center gap-2 hover:bg-green-100 hover:cursor-pointer p-2 rounded-md transition-colors`} >
        <img src="/user.png" className="w-6 h-6 rounded-full object-cover" />
        <span>Enzo Cazenave</span>
      </NavLink>
    </aside>
  )
}