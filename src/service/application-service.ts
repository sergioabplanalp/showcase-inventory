import * as repository from '../repository/inventory-repository';
import {Product} from "../types";

export function retrieveAllProducts(): Promise<Product[]> {
  return repository.retrieveAll();
}

