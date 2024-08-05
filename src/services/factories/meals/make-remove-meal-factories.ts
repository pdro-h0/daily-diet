import { PrismaMealRepository } from "../../../repositories/prisma/meal/meal-prisma-repository";
import { RemoveMealService } from "../../meals/remove-meal";

export const makeRemoveMealFactories = () => {
  const prismaMealRepository = new PrismaMealRepository();
  const removeMealService = new RemoveMealService(prismaMealRepository);

  return removeMealService;
};
