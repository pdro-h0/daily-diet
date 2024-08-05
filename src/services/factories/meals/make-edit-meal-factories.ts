import { PrismaMealRepository } from "../../../repositories/prisma/meal/meal-prisma-repository";
import { EditMealService } from "../../meals/edit-meal";

export const makeEditMeal = () => {
  const prismaMealRepository = new PrismaMealRepository();
  const editMealService = new EditMealService(prismaMealRepository);

  return editMealService;
};
