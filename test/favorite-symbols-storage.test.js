import { FavoriteSymbolStorage } from '../src/infrastructure/favorite-symbol-storage.mjs';

import { readFile, rm } from 'fs/promises';
import { Symbol } from '../src/domain/symbol.mjs';

describe(FavoriteSymbolStorage.name, () => {
  const testFileName = 'FAVORITE_SYMBOLS_TEST';
  const testFIlePath = new FavoriteSymbolStorage()._buildFilePath(testFileName);
  let storage;

  beforeEach(async () => {
    storage = new FavoriteSymbolStorage(testFileName);
    await storage._init();
  });

  afterEach(async () => {
    await rm(testFIlePath);
  });

  test('should create a json file with empty array', async () => {
    await storage._init();

    const content = (await readFile(testFIlePath)).toString();
    const expectedResult = JSON.stringify([]);

    expect(content).toBe(expectedResult);
  });

  test('should save new symbol to a file', async () => {
    const newSymbol = new Symbol('TEST_SYMBOL', 2, 1);

    await storage.save(newSymbol);

    const content = (await readFile(testFIlePath)).toString();
    const expectedResult = JSON.stringify([newSymbol.name]);

    expect(content).toBe(expectedResult);
  });

  test('should not to save symbol if it already exist', async () => {
    const newSymbol = new Symbol('TEST_SYMBOL', 2, 1);
    const sameSymbol = new Symbol('TEST_SYMBOL', 2, 1);

    await storage.save(newSymbol);
    await storage.save(sameSymbol);
    await storage.save(newSymbol);

    const content = (await readFile(testFIlePath)).toString();
    const expectedResult = JSON.stringify([newSymbol.name]);

    expect(content).toBe(expectedResult);
  });

  test('should return all stored symbols', async () => {
    const newSymbol1 = new Symbol('TEST_SYMBOL_1', 2, 1);
    const newSymbol2 = new Symbol('TEST_SYMBOL_2', 2, 1);
    const newSymbol3 = new Symbol('TEST_SYMBOL_3', 2, 1);

    await storage.save(newSymbol1);
    await storage.save(newSymbol2);
    await storage.save(newSymbol3);

    const expectedResult = [newSymbol1.name, newSymbol2.name, newSymbol3.name];
    const result = await storage.findAll();

    expect(result).toStrictEqual(expectedResult);
  });
});
