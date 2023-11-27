import 'reflect-metadata';
import db from './db';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { env } from './env';
import User from './entity/User';
import { startStandaloneServer } from '@apollo/server/standalone';
import { SkillResolver } from './resolver/SkillResolver';
import { WilderResolver } from './resolver/WilderResolver';
import { GradeResolver } from './resolver/GradeResolver';
import { UserResolver } from './resolver/UserResolver';

export interface ContextType {
  req: any;
  res: any;
  currentUser?: User;
}

async function start(): Promise<void> {
  console.log({ env });
  await db.initialize();

  const schema = await buildSchema({
    resolvers: [SkillResolver, WilderResolver, GradeResolver, UserResolver],
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
