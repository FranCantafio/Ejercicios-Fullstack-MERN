import { App } from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const { app, dao, config } = await App.create();
const port = config.port;

const server = app.listen(port, ()=> {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Persistencia: ${config.persistence}`);
});

const graceful = async () => {
  console.log('Cerrando servidor...');
  server.close();
  if (dao && typeof dao.close === 'function') await dao.close();
  process.exit(0);
};

process.on('SIGINT', graceful);
process.on('SIGTERM', graceful);
