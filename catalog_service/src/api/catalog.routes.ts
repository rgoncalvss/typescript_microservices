import express, { NextFunction, Request, Response } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/request-validators/request-validtor";
import { CreateProductDto } from "../dtos/products.dto";

const router = express.Router();
export const catalogService = new CatalogService(new CatalogRepository());

router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreateProductDto,
        req.body
      );

      if (errors) {
        res.status(400).json(errors);
        return;
      }

      const data = await catalogService.create(input);

      res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      res.status(500).json(err.message);
      return;
    }
  }
);

export default router;
