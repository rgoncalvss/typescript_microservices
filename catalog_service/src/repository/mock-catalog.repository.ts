import { ICatalogRepository } from "../interface/catalog-repository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
  create(data: Product): Promise<Product> {
    const mockProduct: Product = {
      id: 1,
      ...data,
    };
    return Promise.resolve(mockProduct);
  }
  update(data: Product): Promise<Product> {
    return Promise.resolve({ ...data, name: "Updated" });
  }
  delete(id: number): Promise<any> {
    return Promise.resolve({ id } as Product);
  }
  find(limit: number, offset: number): Promise<Product[]> {
    return Promise.resolve([]);
  }
  findOne(id: number): Promise<Product> {
    return Promise.resolve({ id } as Product);
  }
}
