import { validatePalabra } from '../validators/palabra.validator.js';
import { v4 as uuidv4 } from 'uuid';

export default class PalabrasController {
  constructor(service) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.postPalabra = this.postPalabra.bind(this);
    this.getFrase = this.getFrase.bind(this);
    this.clear = this.clear.bind(this);
  }

  async getAll(req, res, next) {
    try {
      const lista = await this.service.listar();
      res.json(lista);
    } catch (err) { next(err); }
  }

  async getFrase(req, res, next) {
    try {
      const frase = await this.service.fraseCompleta();
      res.json({ frase });
    } catch (err) { next(err); }
  }

  async postPalabra(req, res, next) {
    try {
      const { error, value } = validatePalabra(req.body);
      if (error) {
        return res.status(400).json({ ok:false, errors: error.details.map(d=>d.message) });
      }
      const item = { id: uuidv4(), palabra: value.palabra, timestamp: Date.now() };
      const saved = await this.service.agregar(item);
      res.status(201).json({ ok:true, item: saved });
    } catch (err) { next(err); }
  }

  async clear(req, res, next) {
    try {
      await this.service.clear();
      res.json({ ok:true });
    } catch (err) { next(err); }
  }
}
