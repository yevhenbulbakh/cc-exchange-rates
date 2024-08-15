import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { configLoader } from './infrastructure/config-loader.mjs';
import {
  GetSymbolSchema,
  GetSymbolListSchema,
} from './infrastructure/framework/fastify-schemas.mjs';

import { favoriteSymbolStorage } from './infrastructure/favorite-symbol-storage.mjs';
import { FulfillInMemoryStorage } from '../src/application/fulfill-in-memory-storage.mjs';
import { GetSymbolList } from './application/get-symbol-list.mjs';
import { GetSymbol } from './application/get-symbol.mjs';

async function beforeLaunch() {
  await favoriteSymbolStorage._init();
  await FulfillInMemoryStorage();
  setInterval(() => FulfillInMemoryStorage(), 5000);
}

export async function launch() {
  await beforeLaunch();

  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(swagger, {
    swagger: { info: { title: 'Cryptocurrceny exchange rates API' } },
  });
  await fastify.register(swaggerUi, { routePrefix: configLoader.swaggerUrl });

  fastify.get('/symbol', GetSymbolSchema, async (request, reply) => {
    const symbol = await GetSymbol(request.query.name);

    reply.send({
      name: symbol.name,
      ask: symbol.ask,
      bid: symbol.bid,
    });
  });

  fastify.get('/symbols', GetSymbolListSchema, async (request, reply) => {
    const symbols = await GetSymbolList();

    reply.send(
      symbols.map((symbol) => ({
        name: symbol.name,
        ask: symbol.ask,
        bid: symbol.bid,
      })),
    );
  });

  return fastify;
}

launch().then((app) =>
  app.listen({ port: configLoader.port }, (err, address) => {
    if (err) throw err;
  }),
);
