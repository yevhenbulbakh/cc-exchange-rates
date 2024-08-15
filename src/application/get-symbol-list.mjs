import { inMemorySymbolStorage } from '../infrastructure/in-memory-symbol-storage.mjs';
import { favoriteSymbolStorage } from '../infrastructure/favorite-symbol-storage.mjs';

export async function GetSymbolList() {
  const favoriteSymbolsNames = await favoriteSymbolStorage.findAll();
  return inMemorySymbolStorage.findAllAndSort(favoriteSymbolsNames);
}
