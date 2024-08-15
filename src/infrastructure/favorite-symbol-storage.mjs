import { configLoader } from './config-loader.mjs';
import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';

export class FavoriteSymbolStorage {
  #filePath;

  constructor(fileName) {
    this.#filePath = this._buildFilePath(fileName);
  }

  async findAll() {
    return JSON.parse((await readFile(this.#filePath)).toString());
  }

  async save(symbol) {
    const content = JSON.parse((await readFile(this.#filePath)).toString());

    if (content.find((item) => item === symbol.name)) {
      return;
    }

    content.push(symbol.name);

    await writeFile(this.#filePath, JSON.stringify(content));
  }

  async _init() {
    if (!existsSync(this.#filePath)) {
      await writeFile(this.#filePath, JSON.stringify([]));
    }
  }

  _buildFilePath(fileName) {
    return `${fileName}.json`;
  }
}

export const favoriteSymbolStorage = new FavoriteSymbolStorage(
  configLoader.favoriteSymbolsFileName,
);
