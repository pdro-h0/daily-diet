import { PrismaMealRepository } from "../../../repositories/prisma/meal/meal-prisma-repository";
import { CreateMealService } from "../../meals/create-meal";

export const makeCreateMealFactories = () => {
  const prismaMealRepository = new PrismaMealRepository();
  const createMealService = new CreateMealService(prismaMealRepository);

  return createMealService;
};
