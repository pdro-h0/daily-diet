import { MealRepository } from "../../repositories/meal-repository";

export class GetUserMetricsService {
  constructor(private mealRepositoy: MealRepository) {}

  async execute(userId: string) {
    const { mealsCount, mealsInDiet, mealsOutOfDiet, maxStreak } =
      await this.mealRepositoy.countByUserId(userId);

    return {
      mealsCount,
      mealsInDiet,
      mealsOutOfDiet,
      maxStreak,
    };
  }
}
