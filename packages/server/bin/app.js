"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const config = {
    user: "postgres",
    password: "Z0hiR5D7BYA43bKJvnMY",
    database: "postgres",
    port: 5432,
    host: "croton-global.cizhyv33sdan.us-east-2.rds.amazonaws.com",
    statement_timeout: 10000,
    query_timeout: 10000,
};
const queryToDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.Client(config);
    client.connect();
    const queryRes = yield client.query(query);
    yield client.end();
    return queryRes;
});
app.get("/groupUser", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRes = yield queryToDB("SELECT * FROM groupuser");
    res.send({
        statusCode: 200,
        body: queryRes,
        headers: { "Content-Type": "application/json" },
    });
}));
app.get("/systemUser", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRes = yield queryToDB("SELECT * FROM systemuser");
    res.send({
        statusCode: 200,
        body: queryRes,
        headers: { "Content-Type": "application/json" },
    });
}));
module.exports = app;
