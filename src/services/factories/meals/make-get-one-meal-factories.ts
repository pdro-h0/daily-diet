import { PrismaMealRepository } from "../../../repositories/prisma/meal/meal-prisma-repository";
import { GetOneMealService } from "../../meals/get-one-meal";

export const makeGetOneMealFactories = () => {
  const prismaMealRepository = new PrismaMealRepository();
  const getOneMealService = new GetOneMealService(prismaMealRepository);

  return getOneMealService;
};
