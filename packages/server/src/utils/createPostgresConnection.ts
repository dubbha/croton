import 'dotenv/config';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

import { validateEnv } from './validate-env';

import config from './ormconfig';

export default async (): Promise<Connection> => {
  console.log('Validating env params...');
  validateEnv();
  try {
    console.log('Connecting to DB...');
    const connection = await createConnection(config);
    console.log('Connected to DB!');
    return connection;
  } catch (error) {
    console.log('Error while connecting to the DB:', error);
    return error;
  }
};
