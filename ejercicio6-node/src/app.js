import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import FsDao from './dao/fs.dao.js';
import MongoDao from './dao/mongo.dao.js';
import PalabrasService from './services/palabras.service.js';
import PalabrasController from './controllers/palabras.controller.js';
import createPalabrasRouter from './routes/palabras.routes.js';

dotenv.config();

export class App {
  static async loadConfig() {
    const port = parseInt(process.env.PORT || '3000', 10);
    const persistence = (process.env.PERSISTENCE || 'fs').toLowerCase();
    const mongo = {
      url: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017',
      dbName: process.env.MONGO_DB || 'ejercicio06',
      collection: process.env.MONGO_COLLECTION || 'palabras'
    };
    const fsPath = process.env.FS_PATH || './data/palabras.json';
    return { port, persistence, mongo, fsPath };
  }

  static async create() {
    const app = express();
    app.use(express.json());

    const config = await App.loadConfig();

    // Ensure data folder exists for FS persistence
    if (config.persistence === 'fs') {
      const dir = path.dirname(path.resolve(config.fsPath));
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    }

    let dao;
    if (config.persistence === 'mongo') {
      dao = new MongoDao(config.mongo);
    } else {
      dao = new FsDao(config.fsPath);
    }

    const service = new PalabrasService(dao);
    const controller = new PalabrasController(service);
    app.use('/api/palabras', createPalabrasRouter(controller));

    // error handler
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ ok:false, error: err.message });
    });

    return { app, dao, config };
  }
}
