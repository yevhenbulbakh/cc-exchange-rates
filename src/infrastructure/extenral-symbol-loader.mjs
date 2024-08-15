import { configLoader } from './config-loader.mjs';

export class ExternalSymbolLoader {
  constructor(url) {
    this._url = url;
  }

  async load() {
    return fetch(this._url).then((response) => response.json());
  }
}

export const externalSymbolsLoader = new ExternalSymbolLoader(
  configLoader.externalSymbolApiUrl,
);
