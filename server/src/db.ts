import { DataSource } from 'typeorm';
import { entities } from './entity';

export default new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities,
});
