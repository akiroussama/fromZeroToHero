import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { DataSource } from 'typeorm';
import Wilder from './entity/Wilder';
import { WilderResolver } from './resolver/WilderResolver';
const start = async (): Promise<void> => {
  const datasource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    entities: [Wilder],
    logging: ['query', 'error'],
  });
  await datasource.initialize();

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
};

void start();
