import './App.css'

import Navbar from './componentes/Navbar'

import { Index as Inicio } from './componentes/INICIO/Index'
import { Index as Alta } from './componentes/ALTA/Index'
import { Index as Carrito } from './componentes/CARRITO/Index'
import { Index as Contacto } from './componentes/CONTACTO/Index'
import { Index as Nosotros } from './componentes/NOSOTROS/Index'
import { Index as Otra } from './componentes/OTRA/Index'

import Footer from './componentes/Footer'

import { HashRouter, Route, Routes } from 'react-router'
import { useSelector } from 'react-redux'

function App() {
  const cantidad = useSelector(state => state.cantidad)

  return (
    <div className='app'>
      <HashRouter>
        <header>
          <div className="header-top">
            <div id="logo" onClick={() => window.location.href="#/inicio"}>
              TechStore
            </div>


            <div id="barra-busqueda">
              <form>
                <input type="text" placeholder="Buscar productos..." />
                <button type="submit">Buscar</button>
              </form>
            </div>

            <div id="boton-carrito">
              <span className="icono-carrito">🛒</span>
              {cantidad > 0 && <span className="carrito-cantidad">{cantidad}</span>}
            </div>
          </div>

          <Navbar />
        </header>

        <main>
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="inicio" element={<Inicio />} />
            <Route path="alta" element={<Alta />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="otra" element={<Otra />} />
            <Route path='*' element={<Inicio />} />
          </Routes>
        </main>
      </HashRouter>

      <Footer texto="Copyright 2025" />
    </div>
  )
}

export default App
