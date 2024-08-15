export const GetSymbolSchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          ask: { type: 'number' },
          bid: { type: 'number' },
        },
      },
    },
  },
};

export const GetSymbolListSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            ask: { type: 'number' },
            bid: { type: 'number' },
          },
        },
      },
    },
  },
};
