import { Symbol } from '../src/domain/symbol.mjs';
import { InMemorySymbolStorage } from '../src/infrastructure/in-memory-symbol-storage.mjs';

describe(InMemorySymbolStorage.name, () => {
  const storage = new InMemorySymbolStorage();

  beforeEach(() => {
    storage._symbols.clear();
  });

  test('should save a symbol', () => {
    const symbol = new Symbol('TEST_SYMBOL', 1, 2);
    const expectedResult = symbol;

    storage.save(symbol);

    const result = storage._symbols.get(symbol.name);

    expect(result).toStrictEqual(expectedResult);
  });

  test('should return a single symbol', () => {
    const symbol = new Symbol('TEST_SYMBOL', 1, 2);
    const expectedResult = symbol;

    storage.save(symbol);

    const result = storage.find(symbol.name);

    expect(result).toStrictEqual(expectedResult);
  });

  test('should return all symbols', () => {
    const symbol1 = new Symbol('TEST_SYMBOL_1', 1, 2);
    const symbol2 = new Symbol('TEST_SYMBOL_2', 1, 2);
    const symbol3 = new Symbol('TEST_SYMBOL_3', 1, 2);

    storage.save(symbol1);
    storage.save(symbol2);
    storage.save(symbol3);

    const expectedResult = [symbol1, symbol2, symbol3];
    const result = storage.findAllAndSort();

    expect(result).toStrictEqual(expectedResult);
  });

  test('should sort symbols by moving favorite on top', () => {
    const symbol1 = new Symbol('SYMBOL_1', 1, 2);
    const symbol2 = new Symbol('SYMBOL_2', 1, 2);
    const symbol3 = new Symbol('SYMBOL_3', 1, 2);
    const symbol4 = new Symbol('SYMBOL_4', 1, 2);
    const symbol5 = new Symbol('SYMBOL_5', 1, 2);

    const mockedSymbols = [symbol1, symbol2, symbol3, symbol4, symbol5];
    const mockedFavoriteSymbolsNames = [symbol4.name, symbol3.name];

    const result = storage._sortByFavorite(
      mockedSymbols,
      mockedFavoriteSymbolsNames,
    );

    const expectedResult = [symbol3, symbol4, symbol1, symbol2, symbol5];

    expect(result).toStrictEqual(expectedResult);
  });
});
