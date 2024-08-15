import { Symbol } from '../src/domain/symbol.mjs';

describe(Symbol.name, () => {
  test('should create an intance of Symbol with correct structure', () => {
    const result = new Symbol('TEST_SYMBOL', 2, 2);

    expect(result).toBeInstanceOf(Symbol);
    expect(result).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        ask: expect.any(Number),
        bid: expect.any(Number),
      }),
    );
  });
});
