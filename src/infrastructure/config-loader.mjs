import 'dotenv/config';

class ConfigLoader {
  #parse(key) {
    return String(process.env[key]);
  }

  #parseNumber(key) {
    return Number(process.env[key]);
  }

  get externalSymbolApiUrl() {
    return this.#parse('EXTERNAL_SYMBOL_API_URL');
  }

  get symbolStorageUpdateDelay() {
    return this.#parseNumber('SYMBOL_STORAGE_UPDATE_DELAY');
  }

  get port() {
    return this.#parseNumber('APP_PORT');
  }

  get favoriteSymbolsFileName() {
    return this.#parse('FAVORITE_SYMBOLS_FILE_NAME');
  }

  get swaggerUrl() {
    return this.#parse('SWAGGER_URL');
  }
}

export const configLoader = new ConfigLoader();
