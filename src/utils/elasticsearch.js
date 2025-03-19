require("dotenv").config();
const { Client } = require('@elastic/elasticsearch');

const host = process.env.elastic_host;
const port = process.env.elastic_port;

// Kết nối tới Elasticsearch (giả sử Elasticsearch chạy ở localhost)
const client = new Client({ node: `http://${host}:${port}` });

module.exports = client;
