import { MealRepository } from "../../repositories/meal-repository";

export class GetOneMealService {
  constructor(private mealRepository: MealRepository) {}

  async execute(id: number, userId: string) {
    const meal = await this.mealRepository.getOne(id, userId);

    return {
      meal,
    };
  }
}
