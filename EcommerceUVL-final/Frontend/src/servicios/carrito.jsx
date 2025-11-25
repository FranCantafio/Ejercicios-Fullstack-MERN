import axios from "axios"
import { production } from "./productos"

//const url = 'https://68bee8d29c70953d96ee2758.mockapi.io/api/pedidos/'

//const url = 'http://localhost:8080/api/pedidos/'      // para ambiente de desarrollo
//const url = '/api/pedidos/'                             // para ambiente de producción

const url =  production? '/api/pedidos/' : 'http://localhost:8080/api/pedidos/'

const enviar = async pedido => (await axios.post(url, pedido)).data
const getPreferenceId = async carrito => {
    console.log(carrito.map(p => ({...p})))

    const prefItems = {
        body: {
            items: carrito.map(p => ({
                title: p.nombre,
                quantity: p.cantidad,
                unit_price: p.precio
            })),
            /* items: [
                {
                    title: 'CPU',
                    quantity: 3,
                    unit_price: 2500
                },
                {
                    title: 'Mouse',
                    quantity: 2,
                    unit_price: 500
                }
            ], */
            back_urls: {
                success: "https://localhost:5173/#/carrito",
                failure: "https://localhost:5173/#/carrito",
                pending: "https://localhost:5173/#/carrito"
            },
            auto_return: "approved",    
        }
    }

    const datos = { prefItems }
    console.log(datos)

    try {
        const { data:preferenceId } = await axios.post(url + 'mp/create_preference', datos)
        console.log(preferenceId)
        return preferenceId
    }
    catch(error) {
        console.error('ERROR getPreferenceId:', error.message)
    }
}


/* ---------------------------------- */
/*            exportación             */
/* ---------------------------------- */
export default {
    enviar,        // POST
    getPreferenceId
}

