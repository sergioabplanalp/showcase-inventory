export const PayloadType = {
  PRODUCT_CREATED: 'com.showcase.inventory.events.ProductCreatedEvent'
};

export type ProductCreatedEvent = {
  id: string
  name: string
  description?: string
  imageUrl?: string
  price?: number
}
