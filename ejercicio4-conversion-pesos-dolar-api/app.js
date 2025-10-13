const pesosInput = document.getElementById('pesos');
const cotizacionInput = document.getElementById('cotizacion');
const resultado = document.getElementById('resultado');
const autoUpdateCheckbox = document.getElementById('autoUpdate');
const timestamp = document.getElementById('timestamp');

let intervalId = null;

// --- calcular conversión ---
function convertir() {
  const pesos = parseFloat(pesosInput.value) || 0;
  const cotizacion = parseFloat(cotizacionInput.value) || 0;
  if (cotizacion > 0) {
    const total = pesos / cotizacion;
    resultado.textContent = `USD $${total.toFixed(2)}`;
  } else {
    resultado.textContent = `USD $0.00`;
  }
}

// --- Eventos reactivos ---
pesosInput.addEventListener('input', convertir);
cotizacionInput.addEventListener('input', convertir);

// --- Función para obtener cotización con una request xhr ---
function obtenerCotizacion() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.bluelytics.com.ar/v2/latest', true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        const data = JSON.parse(xhr.responseText);
        const nuevaCotizacion = data.cotizacion || (1000 + Math.random() * 100); // fallback random
        cotizacionInput.value = nuevaCotizacion.toFixed(2);
        convertir();
        mostrarFechaHora();
      } catch (error) {
        console.error('Error parseando respuesta:', error);
      }
    }
  };

  xhr.onerror = function() {
    console.error('Error al obtener cotización');
  };

  xhr.send();
}

// --- Mostrar fecha y hora ---
function mostrarFechaHora() {
  const ahora = new Date();
  timestamp.textContent = `Última actualización: ${ahora.toLocaleString()}`;
}

// --- Checkbox para habilitar/deshabilitar auto-update ---
autoUpdateCheckbox.addEventListener('change', () => {
  if (autoUpdateCheckbox.checked) {
    obtenerCotizacion(); // actualización inmediata
    intervalId = setInterval(obtenerCotizacion, 2000);
  } else {
    clearInterval(intervalId);
    intervalId = null;
  }
});
