import { Prisma } from "@prisma/client";
import { MealRepository } from "../../repositories/meal-repository";

export class CreateMealService {
  constructor(private mealRepository: MealRepository) {}

  async execute(data: Prisma.MealUncheckedCreateInput) {
    const newMeal = await this.mealRepository.create(data);

    return {
      newMeal,
    };
  }
}
