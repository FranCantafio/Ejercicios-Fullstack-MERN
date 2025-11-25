import { SET_CANTIDAD } from "./types"

export const carritoReducer = (state, action) => {
    console.log('-> carritoReducer', state, action)
    
    switch(action.type) {
        case SET_CANTIDAD:
            // NO se puede hacer porque estaríamos modificando el state de entrada
            /* state.cantidad = action.payload
            return state */

            // Utilizar spread operator (clone) + Object Merge
            return {...state, cantidad: action.payload}

        default:
            return state
    }
}