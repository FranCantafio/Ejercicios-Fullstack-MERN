import './Index.css'

export function Index() {
  return (
    <div className="nosotros">
        <h1>Nosotros</h1>
        <p>
          En Techstore, nos apasiona la tecnología y el diseño. 
          Nuestro objetivo es brindar productos de calidad con una experiencia de compra simple y confiable.
        </p>

        <div className="equipo">
            <div className="miembro">
                <img src="https://via.placeholder.com/150" alt="Miembro 1" />
                <h3>Juan Pérez</h3>
                <p>CEO & Fundador</p>
            </div>

            <div className="miembro">
                <img src="https://via.placeholder.com/150" alt="Miembro 2" />
                <h3>María Gómez</h3>
                <p>Directora de Marketing</p>
            </div>

            <div className="miembro">
                <img src="https://via.placeholder.com/150" alt="Miembro 3" />
                <h3>Carlos Díaz</h3>
                <p>Desarrollador Full Stack</p>
            </div>
        </div>
    </div>
  )
}
