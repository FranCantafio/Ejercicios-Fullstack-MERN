// ----------------------------------------------------------
// Función principal SPA
// ----------------------------------------------------------
function start() {
    // Seleccionamos todos los enlaces del nav
    const links = document.querySelectorAll('nav a, #boton-carrito a');
    links.forEach(link => {
        link.addEventListener('click', function(e){
            e.preventDefault();
            const page = this.dataset.page; // inicio, alta, carrito, etc.
            cargarTemplate(page);
        });
    });

    // Cargar inicio por defecto
    cargarTemplate('inicio');
}

// ----------------------------------------------------------
// Carga dinámica de templates y ejecución de JS
// ----------------------------------------------------------
function cargarTemplate(page) {
    fetch(`templates/${page}.html`)
    .then(res => res.text())
    .then(html => {
        document.getElementById('main-content').innerHTML = html;

        // Ejecutamos función de inicio de página si existe
        switch(page){
            case 'inicio': startInicio(); break;
            case 'alta': startAlta(); break;
            case 'carrito': startCarrito(); break;
            case 'contacto': startContacto(); break;
            case 'nosotros': startNosotros(); break;
            case 'otra': startOtra(); break;
        }
    })
    .catch(err => console.error("No se pudo cargar la página", err));
}

// Inicialización
window.onload = start;
