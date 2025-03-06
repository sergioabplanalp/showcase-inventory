import * as openAIClient from '../client/ai/open-ai-client';
import * as repository from '../repository/inventory-repository';
import * as rabbitClient from '../client/messaging/rabbit-client';
import * as cloudinaryClient from '../client/storage/cloudinary-client';
import {Product} from "../types";
import {PayloadType, ProductCreatedEvent} from "../events";

export const generate: () => Promise<void> = async (): Promise<void> => {
  const productsExist: boolean = await repository.productsExist();
  if (productsExist) {
    return;
  }

  const products: Product[] = openAIClient.generateProducts();
  products.forEach((product: Product) => {
    product.imageUrl = generateImage(product);

    repository.save(product);

    const event: ProductCreatedEvent = {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
    };

    rabbitClient.sendMessage(PayloadType.PRODUCT_CREATED, event);
  });
};

function generateImage(product: Product): string {
  const prompt: string = product.name + ' - ' + product.description;
  const generatedImageUrl: string = openAIClient.generateImage(prompt);
  return cloudinaryClient.uploadImage(generatedImageUrl);
}
