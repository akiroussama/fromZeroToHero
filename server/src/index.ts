import 'reflect-metadata';
import db from './db';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { env } from './env';
import { startStandaloneServer } from '@apollo/server/standalone';
import { WilderResolver } from './resolver/WilderResolver';

async function start(): Promise<void> {
  console.log({ env });
  await db.initialize();

  const schema = await buildSchema({
    resolvers: [WilderResolver],
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

start().catch(console.error);
