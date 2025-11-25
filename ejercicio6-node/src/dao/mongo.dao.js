import { MongoClient } from 'mongodb';

export default class MongoDao {
  constructor({ url, dbName, collection }) {
    this.url = url;
    this.dbName = dbName;
    this.collectionName = collection;
    this.client = null;
    this.coll = null;
  }

  async connect() {
    if (!this.client) {
      this.client = new MongoClient(this.url);
      await this.client.connect();
      const db = this.client.db(this.dbName);
      this.coll = db.collection(this.collectionName);
      await this.coll.createIndex({ id: 1 }, { unique: true }).catch(()=>{});
    }
  }

  async getAll() {
    await this.connect();
    const docs = await this.coll.find({}).sort({ timestamp: 1 }).toArray();
    return docs.map(d => ({ id: d.id, palabra: d.palabra, timestamp: d.timestamp }));
  }

  async save(entry) {
    await this.connect();
    await this.coll.insertOne(entry);
    return entry;
  }

  async clear() {
    await this.connect();
    await this.coll.deleteMany({});
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.coll = null;
    }
  }
}
