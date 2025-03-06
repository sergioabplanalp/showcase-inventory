import {createClient} from "redis";
import {Product} from "../types";

const client = createClient();

client.on('error', err => console.log('Redis client error', err));
(async function () {
  await client.connect();
})();

export async function productsExist(): Promise<boolean> {
  const keys: string[] = await client.keys('product:*');
  return keys.length !== 0;
}

export async function save(product: Product): Promise<number> {
  return client.hSet(`product:${product.id}`, product);
}

export const removeAll: () => Promise<void> = async (): Promise<void> => {
  const keys: string[] = await client.keys('*');
  if (keys.length === 0) {
    return;
  }

  await client.del(keys)
};
