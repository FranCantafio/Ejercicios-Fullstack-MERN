import { initMercadoPago } from '@mercadopago/sdk-react';

// Inicializa Mercado Pago con tu Public Key
const PublicKey = import.meta.env.VITE_APP_MP_PUBLIC_KEY
//console.log(PublicKey)

initMercadoPago(PublicKey);