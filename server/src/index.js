"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Wilder_1 = __importDefault(require("./entity/Wilder"));
const WilderResolver_1 = require("./resolver/WilderResolver");
const start = async () => {
    const datasource = new typeorm_1.DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        synchronize: true,
        entities: [Wilder_1.default],
        logging: ['query', 'error'],
    });
    await datasource.initialize();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [WilderResolver_1.WilderResolver],
    });
    const server = new server_1.ApolloServer({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
};
void start();
