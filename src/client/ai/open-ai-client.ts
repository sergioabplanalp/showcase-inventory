import {Product} from "../../types";

export function generateProducts(): Product[] {
  return [
    {
      id: 'e49971e0-0c38-4f55-a8c3-4e58bffdcb8a',
      name: 'Inverted Umbrella Hat',
      description: 'A hat with an umbrella that stores water instead of repelling it.',
      price: 19.99,
    },
    {
      id: '8e1c7ae1-4194-4f60-8e02-aed7282a1e20',
      name: 'Pet Rock Whisperer Course',
      description: 'A comprehensive online course teaching you how to communicate with your pet rock.',
      price: 49.95,
    },
    {
      id: '4dada8b4-cbac-4c90-9e0b-d6bcfadc8823',
      name: 'DIY Bread Shoes Kit',
      description: 'A kit containing everything you need to bake your own shoes out of bread.',
      price: 35.99,
    }
  ];
}

export function generateImage(prompt: string): string {
  const productImages = {
    ['Inverted Umbrella Hat - A hat with an umbrella that stores water instead of repelling it.']: 'https://res.cloudinary.com/dwm70yyhu/image/upload/v1738440057/a4u63kgnp0j2ingu8vdj.png',
    ['Pet Rock Whisperer Course - A comprehensive online course teaching you how to communicate with your pet rock.']: 'https://res.cloudinary.com/dwm70yyhu/image/upload/v1738440082/amslvkyzzmiom5gjzvst.png',
    ['DIY Bread Shoes Kit - A kit containing everything you need to bake your own shoes out of bread.']: 'https://res.cloudinary.com/dwm70yyhu/image/upload/v1738440109/rcgv94gsydku2eoyoki9.png',
  };

  return productImages[prompt];
}
