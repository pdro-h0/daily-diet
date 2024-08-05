import { MealRepository } from "../../repositories/meal-repository";

export class RemoveMealService {
  constructor(private mealRepository: MealRepository) {}

  async execute(id: number, userId: string) {
    const mealToRemove = await this.mealRepository.remove(id, userId);

    if(!mealToRemove) return null
  }
}
