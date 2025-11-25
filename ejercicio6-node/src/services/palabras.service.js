export default class PalabrasService {
  constructor(dao) {
    this.dao = dao;
  }

  async listar() {
    const lista = await this.dao.getAll();
    return lista.sort((a,b) => a.timestamp - b.timestamp);
  }

  async agregar(entry) {
    return this.dao.save(entry);
  }

  async fraseCompleta() {
    const lista = await this.listar();
    return lista.map(i => i.palabra).join(' ');
  }

  async clear() {
    if (this.dao.clear) return this.dao.clear();
  }
}
