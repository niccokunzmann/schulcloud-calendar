const pg = require('pg');
const express = require('express');
const app = express();
const types = require('pg').types;
const INTERVAL_OID = 1186;
const config = require('../config');

let db;
if (app.get('env') === 'production') {
    const db_username = config.DB_USERNAME;
    const db_password = config.DB_PASSWORD;
    const db_host = config.DB_HOST;
    const db_port = config.DB_PORT;
    const db_database = config.DB_DATABASE;

    if (!db_username || !db_password || !db_host || !db_port || !db_database) {
        throw new Error('expected database credentials but incomplete specified');
    }

    db = `postgres://${db_username}:${db_password}@${db_host}:${db_port}/${db_database}`;
} else if (app.get('env') === 'test') {
    db = 'postgres://node:node@localhost:5432/schulcloud_calendar_test';
} else {
    db = 'postgres://node:node@localhost:5432/schulcloud_calendar';
}

const client = new pg.Client(db);
client.connect();

client.query("SET intervalstyle = 'iso_8601';");

types.setTypeParser(INTERVAL_OID, function(val) {
    return val.toString();
});

module.exports = client;
