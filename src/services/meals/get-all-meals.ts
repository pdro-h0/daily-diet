import { MealRepository } from "../../repositories/meal-repository";

export class GetAllMealsService {
  constructor(private mealRepository: MealRepository) {}

  async execute(userId: string) {
    const meals = await this.mealRepository.getAll(userId);

    return {
      meals,
    };
  }
}
