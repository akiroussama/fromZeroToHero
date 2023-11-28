import { DataSource } from 'typeorm';
import Wilder from './entity/Wilder';

export default new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  entities: [Wilder],
  logging: ['error'],
});
