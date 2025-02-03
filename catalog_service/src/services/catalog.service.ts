import { ICatalogRepository } from "../interface/catalog-repository.interface";
import { Product } from "../models/product.model";

export class CatalogService {
  private _repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this._repository = repository;
  }

  async create(data: Product): Promise<Product> {
    const product = await this._repository.create(data);
    if (!product.id) {
      throw new Error("Unable to create product");
    }
    return product;
  }

  async update(data: Product): Promise<Product> {
    const product = await this._repository.update(data);
    //emit event to update record in Elastic Search
    return product;
  }

  async delete(id: number): Promise<any> {
    return await this._repository.delete(id);
  }

  // Isteand of this we will get product from Elastic Search
  async find(limit: number, offset: number): Promise<Product[]> {
    return await this._repository.find(limit, offset);
  }

  async findOne(id: number): Promise<Product> {
    return await this._repository.findOne(id);
  }
}
