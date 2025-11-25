import { promises as fs } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default class FsDao {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async ensureFile() {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.mkdir(dirname(this.filePath), { recursive: true });
      await fs.writeFile(this.filePath, JSON.stringify([], null, 2), 'utf-8');
    }
  }

  async getAll() {
    await this.ensureFile();
    const content = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(content);
  }

  async save(entry) {
    const all = await this.getAll();
    all.push(entry);
    await fs.writeFile(this.filePath, JSON.stringify(all, null, 2), 'utf-8');
    return entry;
  }

  async clear() {
    await this.ensureFile();
    await fs.writeFile(this.filePath, JSON.stringify([], null, 2), 'utf-8');
  }

  async close() {
    // nothing to close for fs
  }
}
