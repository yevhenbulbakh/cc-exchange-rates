import { inMemorySymbolStorage } from '../infrastructure/in-memory-symbol-storage.mjs';
import { externalSymbolsLoader } from '../infrastructure/extenral-symbol-loader.mjs';
import { Symbol } from '../domain/symbol.mjs';

export async function FulfillInMemoryStorage() {
  const externalSymbols = await externalSymbolsLoader.load();

  externalSymbols.forEach((item) =>
    inMemorySymbolStorage.save(
      new Symbol(
        item.symbol,
        new Number(item.askPrice),
        new Number(item.bidPrice),
      ),
    ),
  );
}
