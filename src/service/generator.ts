import * as openAIClient from '../client/ai/open-ai-client';
import * as repository from '../repository/inventory-repository';
import * as rabbitClient from '../client/messaging/rabbit-client';
import * as cloudinaryClient from '../client/storage/cloudinary-client';
import {Product} from "../types";
import {PayloadType, ProductCreatedEvent, ProductUpdatedEvent} from "../events";

export const generate: () => Promise<void> = async (): Promise<void> => {
  const productsExist: boolean = await repository.productsExist();
  if (productsExist) {
    return;
  }

  openAIClient.generateProducts().forEach((product: Product) => {
    repository.save(product);
    const event: ProductCreatedEvent = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };

    rabbitClient.sendMessage(PayloadType.PRODUCT_CREATED, event);

    generateImage(product);
  });
};

function generateImage(product: Product): void {
  const prompt: string = product.name + ' - ' + product.description;
  openAIClient.generateImage(prompt)
    .then(generatedImageUrl => cloudinaryClient.uploadImage(generatedImageUrl))
    .then(uploadedImageUrl => repository.save({...product, imageUrl: uploadedImageUrl}))
    .then(product => {
      const event: ProductUpdatedEvent = {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
      };
      rabbitClient.sendMessage(PayloadType.PRODUCT_UPDATED, event);
    });
}
