import {createClient} from "redis";
import {Product} from "../types";
import config from '../../config';

const client = createClient({url: `redis://${config.redis.host}:${config.redis.port}`});

client.on('error', err => console.log('Redis client error', err));
(async function () {
  await client.connect();
})();

export async function productsExist(): Promise<boolean> {
  const keys: string[] = await client.keys('product:*');
  return keys.length !== 0;
}

export async function save(product: Product): Promise<Product> {
  return client.hSet(`product:${product.id}`, product)
    .then(() => new Promise(resolve => resolve(product)));
}

export const removeAll: () => Promise<void> = async (): Promise<void> => {
  const keys: string[] = await client.keys('*');
  if (keys.length === 0) {
    return;
  }

  await client.del(keys)
};
