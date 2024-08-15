export class InMemorySymbolStorage {
  _symbols = new Map();

  findAllAndSort(favoriteSymbolsNames = []) {
    const symbols = [...this._symbols.values()];
    return this._sortByFavorite(symbols, favoriteSymbolsNames);
  }

  find(name) {
    return this._symbols.get(name);
  }

  save(symbol) {
    this._symbols.set(symbol.name, symbol);
  }

  _sortByFavorite(symbols, favoriteSymbolsNames) {
    return symbols.sort((a, b) => {
      if (
        favoriteSymbolsNames.includes(a.name) &&
        favoriteSymbolsNames.indexOf(a.name) >
          favoriteSymbolsNames.indexOf(b.name)
      ) {
        return -1;
      }

      if (!favoriteSymbolsNames.includes(a.name)) {
        return 1;
      }

      return 0;
    });
  }
}

export const inMemorySymbolStorage = new InMemorySymbolStorage();
