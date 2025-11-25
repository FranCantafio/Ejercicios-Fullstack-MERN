import express from 'express';

export default function createPalabrasRouter(controllerInstance) {
  const router = express.Router();
  router.get('/', controllerInstance.getAll);
  router.get('/frase', controllerInstance.getFrase);
  router.post('/', controllerInstance.postPalabra);
  router.delete('/', controllerInstance.clear);
  return router;
}
