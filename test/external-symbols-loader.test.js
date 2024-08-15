import { configLoader } from '../src/infrastructure/config-loader.mjs';
import { ExternalSymbolLoader } from '../src/infrastructure/extenral-symbol-loader.mjs';

describe(ExternalSymbolLoader.name, () => {
  const loader = new ExternalSymbolLoader(configLoader.externalSymbolApiUrl);

  test('should return loaded symbols from api with correct structure', async () => {
    const result = await loader.load();

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          symbol: expect.any(String),
          askPrice: expect.any(String),
          bidPrice: expect.any(String),
        }),
      ]),
    );
  });
});
