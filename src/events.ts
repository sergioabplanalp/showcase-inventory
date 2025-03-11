export const PayloadType = {
  PRODUCT_CREATED: 'com.showcase.inventory.events.ProductCreatedEvent',
  PRODUCT_UPDATED: 'com.showcase.inventory.events.ProductUpdatedEvent'
};

export type ProductCreatedEvent = {
  id: string
  name: string
  description?: string
  imageUrl?: string
  price?: number
}

export type ProductUpdatedEvent = {
  id: string
  name: string
  description?: string
  imageUrl?: string
  price?: number
}
