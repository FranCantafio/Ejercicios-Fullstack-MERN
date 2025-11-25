import { configureStore } from "@reduxjs/toolkit"
import { carritoReducer } from "./reducers"

export const store = configureStore({
    reducer: carritoReducer,
    preloadedState: {
        cantidad: 0
    },
    devTools: true
})