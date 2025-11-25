import { useEffect, useState } from 'react';
import './Index.css';

import servicioProductos from '../../servicios/productos';
import { useStateLocalStorage } from '../../Hooks/useStateLocalStorage';
import { actionSetCantidad } from '../../state/actions';
import { useDispatch } from 'react-redux';

export function Index() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useStateLocalStorage('carrito', []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionSetCantidad(carrito.length));
  }, [carrito]);

  useEffect(() => {
    (async () => {
      const productos = await servicioProductos.getAll();
      setProductos(productos);
    })();
  }, []);

  function agregar(producto) {
    const carritoClon = [...carrito];
    const productoExistente = carritoClon.find(p => p.id === producto.id);

    if (!productoExistente) {
      producto.cantidad = 1;
      carritoClon.push(producto);
    } else {
      productoExistente.cantidad++;
      const index = carritoClon.findIndex(p => p.id === producto.id);
      carritoClon.splice(index, 1, productoExistente);
    }

    setCarrito(carritoClon);
  }

  return (
    <div className="inicio">
      <h1>Listado de Productos</h1>
      <div className="cards-container">
        {productos.length ? (
          productos.map((producto, i) => (
            <div key={i} className="card">
              <img
                src={producto.foto}
                alt={`Foto de ${producto.nombre} ${producto.marca}`}
              />
              <h3>{producto.nombre}</h3>
              <p><b>Precio:</b> ${producto.precio}</p>
              <p><b>Stock:</b> {producto.stock}</p>
              <p><b>Marca:</b> {producto.marca}</p>
              <p><b>Categoría:</b> {producto.categoria}</p>
              <p><b>Detalles:</b> {producto.detalles}</p>
              <p><b>Envío:</b> {producto.envio ? 'Sí' : 'No'}</p>
              <button className="btnComprar" onClick={() => agregar(producto)}>
                Agregar al carrito
              </button>
            </div>
          ))
        ) : (
          <h2>No se encontraron productos</h2>
        )}
      </div>
    </div>
  );
}
