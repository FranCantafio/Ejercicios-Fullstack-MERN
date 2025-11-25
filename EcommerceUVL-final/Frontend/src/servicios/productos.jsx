import axios from "axios";

console.error('MODO:', import.meta.env.MODE)

export const production = import.meta.env.MODE == 'production'

//const url = 'http://localhost:8080/api/productos/'      // para ambiente de desarrollo
//const url = '/api/productos/'                             // para ambiente de producción

const url = production? '/api/productos/' : 'http://localhost:8080/api/productos/'

export const proxyProducto = producto => {
    const handler = {
        get(target, prop) {
            //if(prop == 'id') prop = '_id'
            if(target['_id'] && prop == 'id') prop = '_id'
            return target[prop]
        }
    }

    return new Proxy(producto, handler)
}


const eliminarPropiedad = (obj, prop) => {
    const objClon = {...obj}        // clono el objeto fuente para evitar efecto secundarios en la eliminación de la propiedad
    delete objClon[prop]
    return objClon
}


const getAll = async () => (await axios.get(url)).data.map(producto => proxyProducto(producto))

const guardar = async prod => proxyProducto((await axios.post(url, prod)).data)

const actualizar = async (id,prod) => proxyProducto((await axios.put(url+id, eliminarPropiedad(prod, '_id'))).data)

const eliminar = async id => proxyProducto((await axios.delete(url+id)).data)


/* ---------------------------------- */
/*            exportación             */
/* ---------------------------------- */
export default {
    getAll,         // GET
    guardar,        // POST
    actualizar,     // PUT
    eliminar        // DELETE
}

