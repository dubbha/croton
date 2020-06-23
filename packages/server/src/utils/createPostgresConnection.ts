import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { validateEnv } from '../utils/validate-env';

import config from './ormconfig';

export default async () => {
  console.log('Validating env params...');
  validateEnv();
  try {
    console.log('Connecting to DB...');
    await createConnection(config);
    console.log('Connected to DB!');
  } catch (error) {
    console.log('Error while connecting to the DB:', error);
    return error;
  }
};
