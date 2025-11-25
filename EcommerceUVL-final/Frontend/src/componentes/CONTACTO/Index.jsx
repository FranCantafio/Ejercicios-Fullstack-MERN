import './Index.css';

export function Index() {
  return (
    <div className="contacto">
      <h1>Contacto</h1>

      <form className="contacto__form">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Tu email" />

        <label htmlFor="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows="5" placeholder="Escribe tu mensaje"></textarea>

        <button type="submit" className="btnEnviar">Enviar</button>
      </form>
    </div>
  );
}
