import {createClient} from "redis";
import {Product} from "../types";
import config from '../../config';

const client = createClient({url: `redis://${config.redis.host}:${config.redis.port}`});

client.on('error', err => console.log('Redis client error', err));
(async function (): Promise<void> {
  await client.connect();
})();

export async function productsExist(): Promise<boolean> {
  const keys: string[] = await client.keys('product:*');
  return keys.length !== 0;
}

export async function save(product: Product): Promise<Product> {
  return client.json.set(`product:${product.id}`, '$', product)
    .then((): Promise<Product> => new Promise(resolve => resolve(product)));
}

export async function retrieveAll(): Promise<Product[]> {
  const productKeys: string[] = await client.keys('product:*');
  return client.json.mGet(productKeys, '$')
    .then((data: any[]): Promise<Product[]> => {
      const products: Product[] = data.map((productArray: any[]) => productArray[0]);
      return new Promise((resolve): void => resolve(products));
    });
}
