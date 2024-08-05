import { PrismaMealRepository } from "../../../repositories/prisma/meal/meal-prisma-repository";
import { GetAllMealsService } from "../../meals/get-all-meals";

export const makeGetAllMealsFactories = () => {
  const prismaMealRepository = new PrismaMealRepository();
  const getAllMealsService = new GetAllMealsService(prismaMealRepository);

  return getAllMealsService;
};
