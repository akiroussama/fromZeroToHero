# Server README

This is the README file for the server component of the project.

## Installation

To install the necessary dependencies, run the following command:

install apollo server:
https://www.apollographql.com/docs/apollo-server/getting-started
npm install @apollo/server graphql

mkdir src
touch src/index.ts
====FOR Windows==
New-Item src/index.ts

npm install --save-dev typescript @types/node

tsconfig.json
{
"compilerOptions": {
"rootDirs": ["src"],
"outDir": "dist",
"lib": ["es2020"],
"target": "es2020",
"module": "esnext",
"moduleResolution": "node",
"esModuleInterop": true,
"types": ["node"]
}
}

package.json
{
// ...etc.
"type": "module",
"scripts": {
"compile": "tsc",
"start": "npm run compile && node ./dist/index.js"
}
// other dependencies
}

/// add graphql:
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql

# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# This "Book" type defines the queryable fields for every book in our data source.

type Book {
title: String
author: String
}

# The "Query" type is special: it lists all of the available queries that

# clients can execute, along with the return type for each. In this

# case, the "books" query returns an array of zero or more Books (defined above).

type Query {
books: [Book]
}
`;

const books = [
{
title: 'The Awakening',
author: 'Kate Chopin',
},
{
title: 'City of Glass',
author: 'Paul Auster',
},
];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
Query: {
books: () => books,
},
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
typeDefs,
resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
// 1. creates an Express app
// 2. installs your ApolloServer instance as middleware
// 3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
