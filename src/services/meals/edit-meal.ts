import { Prisma } from "@prisma/client";
import { MealRepository } from "../../repositories/meal-repository";

export class EditMealService {
  constructor(private mealRepository: MealRepository) {}

  async execute(data: Prisma.MealUpdateInput, userId: string, id: number) {
    const editedMeal = await this.mealRepository.edit(data, userId, id);

    return {
      editedMeal,
    };
  }
}
