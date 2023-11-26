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
