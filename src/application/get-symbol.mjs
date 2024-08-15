import { inMemorySymbolStorage } from '../infrastructure/in-memory-symbol-storage.mjs';
import { favoriteSymbolStorage } from '../infrastructure/favorite-symbol-storage.mjs';

export async function GetSymbol(name) {
  const symbol = inMemorySymbolStorage.find(name);

  if (!symbol) {
    throw new Error('Symbol not found');
  }

  await favoriteSymbolStorage.save(symbol);
  return symbol;
}
