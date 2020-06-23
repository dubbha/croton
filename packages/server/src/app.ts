import { Client, QueryResult } from 'pg';
import express from 'express';

const app = express();

const getClientConfig = (parsed) => ({
  user: parsed.POSTGRES_USER || 'postges',
  password: parsed.POSTGRES_PASSWORD || 'qwerty1234',
  database: parsed.POSTGRES_DB || 'postges',
  port: Number(parsed.POSTGRES_PORT || '5432'),
  host: parsed.POSTGRES_HOST || '127.0.0.1',
  statement_timeout: 10000,
  query_timeout: 10000,
});

type QueryToDB = (query?: string) => Promise<string | QueryResult<any>>;

const queryToDB: QueryToDB = async (query) => {
  try {
    const clientConfig = getClientConfig(global.process.env);
    const client = new Client(clientConfig);

    await client.connect();
    let res = 'The DB is connected!';
    let queryRes;
    if (query) {
      queryRes = await client.query(query);
    }
    await client.end();
    return queryRes || res;
  } catch (err) {
    return `DB health check failed with following error: \n ${err}`;
  }
};

app.get('/api/health-check', async (_, res) => {
  const queryRes = await queryToDB();
  res.send({
    statusCode: 200,
    body: queryRes,
    headers: { 'Content-Type': 'application/json' },
  });
});

export = app;
