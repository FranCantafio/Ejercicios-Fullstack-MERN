function startInicio(){
    // Renderizamos las cards de productos
    const container = document.querySelector('.cards-container');
    if(!container) return;
    container.innerHTML = '';
    productos.forEach(prod => {
        container.innerHTML += `
        <section>
            <h3>${prod.nombre}</h3>
            <img src="${prod.foto}" alt="${prod.nombre}">
            <p><b class="precio">Precio:</b> $${prod.precio}</p>
            <p><b>Stock:</b> ${prod.stock}</p>
            <p><b>Desarrollador:</b> ${prod.desarrollador}</p>
            <p><b>Categoría:</b> ${prod.categoria}</p>
            <p><b>Descripción:</b> ${prod.descripcionCorta}</p>
            <p><b style="color:gold;">Envío:</b> ${prod.envio? 'Si':'No'}</p>
        </section>`;
    });
}
