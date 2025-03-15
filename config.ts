import dotenv from 'dotenv';
import fs from "node:fs";
dotenv.config({ path: __dirname + `/.env.${process.env.NODE_ENV}` });

export default {
  chatgpt: {
    secretKey: readSecret(process.env.CHATGPT_SECRET_KEY_FILE)
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: 6379,
    username: 'inventory',
    password: 'inventory'
  },

  rabbitmq: {
    host: process.env.RABBITMQ_HOST,
    port: 5672,
    username: 'guest',
    password: 'guest',
    exchange: {
      name: 'showcase.exchange',
      type: 'topic',
    },
    routing_key: 'inventory.events'
  }
};

function readSecret(secretFilePath: string): string {
  return !secretFilePath ? '' : fs.readFileSync(secretFilePath, 'utf-8');
}
