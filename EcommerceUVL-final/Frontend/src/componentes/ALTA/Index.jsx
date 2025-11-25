import { useState } from 'react'
import './Index.css'
import servicioProductos from '../../servicios/productos'

export function Index() {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    foto: '',
    id: ''
  })

  const manejarCambio = e => {
    const { name, value } = e.target
    setProducto(prev => ({ ...prev, [name]: value }))
  }

  const manejarSubmit = async e => {
    e.preventDefault()
    try {
      await servicioProductos.guardar(producto)
      alert('Producto agregado con éxito!')
      setProducto({ nombre: '', precio: '', stock: '', categoria: '', foto: '', id: '' })
    } catch(err) {
      console.error('Error al guardar producto:', err)
    }
  }

  return (
    <div className="alta">
      <h1>Agregar Producto</h1>
      <form className="form-alta" onSubmit={manejarSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={producto.nombre} onChange={manejarCambio} required />
        </label>
        <label>
          Precio:
          <input type="number" name="precio" value={producto.precio} onChange={manejarCambio} required />
        </label>
        <label>
          Stock:
          <input type="number" name="stock" value={producto.stock} onChange={manejarCambio} required />
        </label>
        <label>
          Categoría:
          <input type="text" name="categoria" value={producto.categoria} onChange={manejarCambio} required />
        </label>
        <label>
          Foto (URL):
          <input type="text" name="foto" value={producto.foto} onChange={manejarCambio} required />
        </label>
        <label>
          ID:
          <input type="text" name="id" value={producto.id} onChange={manejarCambio} required />
        </label>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  )
}
