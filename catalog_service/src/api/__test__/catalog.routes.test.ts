import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import catalogRoutes, { catalogService } from "../catalog.routes";
import { ProductFactory } from "../../utils/mocks";

const app = express();
app.use(express.json());
app.use(catalogRoutes);

const mockRequest = (data: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...data,
  };
};

describe("Catalog routes", () => {
  describe("POST /products", () => {
    it("should create a product", async () => {
      const requestBody = mockRequest({});
      const product = ProductFactory.build();

      jest.spyOn(catalogService, "create").mockResolvedValueOnce(product);

      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toEqual(201);
      expect(response.body).toStrictEqual(product);
    });

    it("should respond with validation error", async () => {
      const requestBody = mockRequest({});

      const response = await request(app)
        .post("/products")
        .send({ ...requestBody, name: "" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });

    it("should respond with an internal error", async () => {
      const requestBody = mockRequest({});

      jest
        .spyOn(catalogService, "create")
        .mockRejectedValueOnce(new Error("error occurred on create product"));

      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toEqual("error occurred on create product");
    });
  });
});
