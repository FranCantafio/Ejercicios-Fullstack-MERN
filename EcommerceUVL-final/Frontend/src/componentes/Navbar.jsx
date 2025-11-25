import { NavLink } from "react-router-dom";
import './Navbar.css'; // agregamos archivo de estilos propio para Navbar

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li> <NavLink to="/inicio" className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink> </li>
      <li> <NavLink to="/alta" className={({ isActive }) => isActive ? 'active' : ''}>Alta</NavLink> </li>
      <li> <NavLink to="/carrito" className={({ isActive }) => isActive ? 'active' : ''}>Carrito</NavLink> </li>
      <li> <NavLink to="/contacto" className={({ isActive }) => isActive ? 'active' : ''}>Contacto</NavLink> </li>
      <li> <NavLink to="/nosotros" className={({ isActive }) => isActive ? 'active' : ''}>Nosotros</NavLink> </li>
      <li> <NavLink to="/otra" className={({ isActive }) => isActive ? 'active' : ''}>Otra</NavLink> </li>
    </ul>
  </nav>
);

export default Navbar;
