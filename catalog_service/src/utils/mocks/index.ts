import { faker } from "@faker-js/faker/.";
import { Product } from "../../models/product.model";
import { Factory } from "rosie";

export const ProductFactory = new Factory<Product>()
  .attr("id", faker.number.int({ min: 1, max: 1000 }))
  .attr("name", faker.commerce.productName())
  .attr("description", faker.commerce.productDescription())
  .attr("stock", faker.number.int({ min: 10, max: 100 }))
  .attr("price", Number(faker.commerce.price()));

export const MockProduct = (data: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...data,
  };
};
