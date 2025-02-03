import { ICatalogRepository } from "../interface/catalog-repository.interface";
import { Product } from "../models/product.model";
import { ProductFactory } from "../utils/mocks";

export class CatalogRepository implements ICatalogRepository {
  async create(data: Product): Promise<Product> {
    const product = ProductFactory.build();
    return Promise.resolve(product);
  }
  async update(data: Product): Promise<Product> {
    const product = ProductFactory.build();
    return Promise.resolve(product);
  }
  async delete(id: number): Promise<any> {
    const product = ProductFactory.build();
    return Promise.resolve(product);
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    const product = ProductFactory.buildList(limit);
    return Promise.resolve(product);
  }
  async findOne(id: number): Promise<Product> {
    const product = ProductFactory.build();
    return Promise.resolve(product);
  }
}
