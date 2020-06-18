import { Client, QueryResult } from "pg";
import express from "express";

const app = express();

const config = {
  user: "postgres",
  password: "Z0hiR5D7BYA43bKJvnMY",
  database: "postgres",
  port: 5432,
  host: "croton-global.cizhyv33sdan.us-east-2.rds.amazonaws.com",
  statement_timeout: 10000,
  query_timeout: 10000,
};

type QueryToDB = (query: string) => Promise<QueryResult<any>>;

const queryToDB: QueryToDB = async (query) => {
  const client = new Client(config);
  client.connect();
  const queryRes = await client.query(query);
  await client.end();
  return queryRes;
};

app.get("/groupUser", async (_, res) => {
  const queryRes = await queryToDB("SELECT * FROM groupuser");
  res.send({
    statusCode: 200,
    body: queryRes,
    headers: { "Content-Type": "application/json" },
  });
});

app.get("/systemUser", async (_, res) => {
  const queryRes = await queryToDB("SELECT * FROM systemuser");
  res.send({
    statusCode: 200,
    body: queryRes,
    headers: { "Content-Type": "application/json" },
  });
});

export = app;
