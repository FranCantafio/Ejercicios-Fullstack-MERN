function startAlta(){
    // Representamos la tabla al cargar
    representarTablaProductos();
}

// Función para agregar producto
function agregar(e){
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);
    const desarrollador = document.getElementById('desarrollador').value;
    const categoria = document.getElementById('categoria').value;
    const descripcionCorta = document.getElementById('descripcion-corta').value;
    const descripcionLarga = document.getElementById('descripcion-larga').value;
    const edadDesde = document.getElementById('edad-desde').value;
    const edadHasta = document.getElementById('edad-hasta').value;
    const foto = document.getElementById('foto').value;
    const envio = document.getElementById('envio').checked;

    productos.push({nombre, precio, stock, desarrollador, categoria, descripcionCorta, descripcionLarga, edadDesde, edadHasta, foto, envio});
    representarTablaProductos();

    e.target.reset();
}
