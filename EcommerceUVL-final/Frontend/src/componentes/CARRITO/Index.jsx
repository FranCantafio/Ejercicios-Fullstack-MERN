import { useEffect, useState } from 'react';
import './Index.css';
import { useStateLocalStorage } from '../../Hooks/useStateLocalStorage';
import servicioCarrito from '../../servicios/carrito';
import { Wallet } from '@mercadopago/sdk-react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { actionSetCantidad } from '../../state/actions';

export function Index() {
  const [carrito, setCarrito] = useStateLocalStorage('carrito', []);
  const [pagar, setPagar] = useState(false);
  const [compraStatus, setCompraStatus] = useState({
    payment_id: 'null',
    status: 'null',
    merchant_order_id: 'null'
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionSetCantidad(carrito.length));
  }, [carrito]);

  useEffect(() => {
    async function recibirDatosPago() {
      const parameters = new URL(window.location.href.replace(/#\//g, ''));
      const compra = {
        payment_id: parameters.searchParams.get('payment_id') || 'null',
        status: parameters.searchParams.get('status') || 'null',
        merchant_order_id: parameters.searchParams.get('merchant_order_id') || 'null'
      };

      if (compra.status !== 'null' && compra.status !== compraStatus.status) {
        setCompraStatus(compra);
        if (compra.status === 'approved') {
          await generarPedido(compra);
          navigate('/carrito');
          await new Promise(r => setTimeout(r, 3000));
          navigate('/');
        }
      }
    }

    recibirDatosPago();
  }, []);

  function borrarCarrito() {
    if (confirm('¿Está seguro que quiere eliminar todos los productos del carrito?')) {
      setCarrito([]);
      setPagar(false);
    }
  }

  async function generarPedido(compra) {
    const pedido = { fyh: new Date().toLocaleString(), compra, pedido: carrito };
    await servicioCarrito.enviar(pedido);
    setCarrito([]);
    setPagar(false);
  }

  function incrementarItem(id) {
    const carritoClon = [...carrito];
    const producto = carritoClon.find(p => p.id === id);
    if (producto.cantidad < producto.stock) {
      producto.cantidad++;
      setCarrito(carritoClon);
      setPagar(false);
    }
  }

  function decrementarItem(id) {
    const carritoClon = [...carrito];
    const producto = carritoClon.find(p => p.id === id);
    if (producto.cantidad > 1) {
      producto.cantidad--;
      setCarrito(carritoClon);
      setPagar(false);
    }
  }

  function borrarItem(id) {
    if (confirm(`¿Está seguro de borrar el producto de id ${id}?`)) {
      const carritoClon = [...carrito];
      const index = carritoClon.findIndex(p => p.id === id);
      carritoClon.splice(index, 1);
      setCarrito(carritoClon);
      setPagar(false);
    }
  }

  // Configuración del botón Wallet
  const customization = {
    theme: 'default',
    valueProp: 'security_safety',
    customStyle: {
      buttonHeight: '60px',
      borderRadius: '30px',
      verticalPadding: '10px',
      horizontalPadding: '10px'
    }
  };

  const onReady = () => console.log('onReady');
  const onError = error => console.error('onError', error.message);
  const onSubmit = () => {
    return new Promise((resolve, reject) => {
      servicioCarrito.getPreferenceId(carrito)
        .then(preferenceId => resolve(preferenceId))
        .catch(error => reject(error));
    });
  };

  return (
    <div className="carrito">
      <h1>Carrito de Compras</h1>

      {/* Resultado de la operación de pago */}
      {compraStatus.status !== 'null' &&
        <div style={{
          backgroundColor: compraStatus.status === 'approved' ? 'lightgreen' : 'lightpink',
          width: '50%',
          margin: '0 auto',
          padding: '15px',
          borderRadius: '15px',
          fontSize: '18px'
        }}>
          <h2>Pago {compraStatus.status === 'approved' ? 'exitoso' : 'rechazado'}</h2>
          <hr />
          <ul>
            <li>payment_id: {compraStatus.payment_id}</li>
            <li>status: {compraStatus.status}</li>
            <li>merchant_order_id: {compraStatus.merchant_order_id}</li>
          </ul>
        </div>
      }

      {carrito.length > 0
        ? <>
            <button className="carrito__borrar__pedir carrito_borrar" onClick={borrarCarrito}>Borrar todo</button>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Marca</th>
                  <th>Foto</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((producto, i) =>
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td>{producto.marca}</td>
                    <td><img src={producto.foto} alt={`Foto de ${producto.nombre}`} /></td>
                    <td>
                      {producto.cantidad}
                      <button className="btnIncDec" onClick={() => decrementarItem(producto.id)}>-</button>
                      <button className="btnIncDec" onClick={() => incrementarItem(producto.id)}>+</button>
                    </td>
                    <td>${producto.precio * producto.cantidad}</td>
                    <td>
                      <button className="btnBorrar" onClick={() => borrarItem(producto.id)}>Borrar</button>
                    </td>
                  </tr>
                )}
                <tr>
                  <th colSpan="6"></th>
                  <th>Total</th>
                  <th>${carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)}</th>
                  <th></th>
                </tr>
              </tbody>
            </table>

            {!pagar
              ? <button className="carrito__borrar__pedir carrito_pedir" onClick={() => setPagar(true)}>Pagar</button>
              : <div id="wallet-container">
                  <Wallet
                    customization={customization}
                    onReady={onReady}
                    onError={onError}
                    onSubmit={onSubmit}
                  />
                </div>
            }
          </>
        : <h2 style={{textAlign: 'center', marginTop: '50px'}}>No hay productos en el carrito</h2>
      }
    </div>
  );
}
