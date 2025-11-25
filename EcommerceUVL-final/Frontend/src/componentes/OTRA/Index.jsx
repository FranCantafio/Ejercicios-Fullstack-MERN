import './Index.css'

export function Index() {
  return (
    <div className="otra">
        <h1>Otra Sección</h1>
        <p>
          info generica
        </p>

        <div className="contenido">
            <div className="card">
                <img src="https://via.placeholder.com/200" alt="Contenido 1" />
                <h3>Contenido 1</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>

            <div className="card">
                <img src="https://via.placeholder.com/200" alt="Contenido 2" />
                <h3>Contenido 2</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex vitae delectus minus.</p>
            </div>

            <div className="card">
                <img src="https://via.placeholder.com/200" alt="Contenido 3" />
                <h3>Contenido 3</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae sit vitae commodi maxime reiciendis.</p>
            </div>
        </div>
    </div>
  )
}
