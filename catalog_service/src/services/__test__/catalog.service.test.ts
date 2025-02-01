import { Factory } from "rosie";
import { ICatalogRepository } from "../../interface/catalog-repository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mock-catalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";

const productFactory = new Factory<Product>()
  .attr("id", faker.number.int({ min: 1, max: 1000 }))
  .attr("name", faker.commerce.productName())
  .attr("description", faker.commerce.productDescription())
  .attr("stock", faker.number.int({ min: 10, max: 100 }))
  .attr("price", Number(faker.commerce.price()));

const mockProduct = (data: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...data,
  };
};

describe("catalogService", () => {
  let repository: ICatalogRepository;

  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });

  describe("create", () => {
    it("should create a product", async () => {
      const service = new CatalogService(repository);
      const product: Product = mockProduct({});
      const result = await service.create(product);
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    it("should throw an error if unable to create product", async () => {
      const service = new CatalogService(repository);
      const product: Product = mockProduct({});

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));

      await expect(service.create(product)).rejects.toThrow(
        "Unable to create product"
      );
    });

    it("should throw an error if product already exists", async () => {
      const service = new CatalogService(repository);
      const product: Product = mockProduct({});

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Product already exists"))
        );

      await expect(service.create(product)).rejects.toThrow(
        "Product already exists"
      );
    });
  });

  describe("update", () => {
    it("should update a product", async () => {
      const service = new CatalogService(repository);
      const product = mockProduct({
        id: faker.number.int({ min: 10, max: 1000 }),
      });

      const result = await service.update(product);

      expect(result).toMatchObject({ ...product, name: "Updated" });
    });

    it("should throw an error if product doesn't exists", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Product doesn't exists"))
        );

      await expect(service.update({} as Product)).rejects.toThrow(
        "Product doesn't exists"
      );
    });
  });

  describe("get", () => {
    it("should get a product by id", async () => {
      const service = new CatalogService(repository);
      const product = productFactory.build();

      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() => Promise.resolve(product));

      const result = await service.findOne(product.id as number);

      expect(result).toMatchObject({
        id: product.id,
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });
  });

  describe("get all", () => {
    it("should return all products by limit and offset", async () => {
      const service = new CatalogService(repository);
      const limit = faker.number.int({ min: 10, max: 100 });
      const offSet = 0;
      const products = productFactory.buildList(limit);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() => Promise.resolve(products));

      const result = await service.find(limit, offSet);

      expect(result).toHaveLength(limit);
      expect(result).toMatchObject(products);
    });

    it("should throw an error if products doesn't exists", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Products doesn't exists"))
        );

      await expect(service.find(10, 1)).rejects.toThrow(
        "Products doesn't exists"
      );
    });
  });

  describe("delete", () => {
    it("should delete a product by id", async () => {
      const service = new CatalogService(repository);
      const product = productFactory.build();

      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() => Promise.resolve(product));

      const result = await service.delete(product.id as number);

      expect(result).toMatchObject({
        id: product.id,
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });
  });
});
