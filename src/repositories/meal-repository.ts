import { Meal, Prisma } from "@prisma/client";

interface ICountByUserIdResult {
  mealsCount: number;
  mealsInDiet: number;
  mealsOutOfDiet: number;
  maxStreak: number;
}

export interface MealRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>;
  edit(
    data: Prisma.MealUpdateInput,
    userId: string,
    id: number
  ): Promise<Meal | null>;
  remove(id: number, userId: string): Promise<void | null>;
  getAll(userId: string): Promise<Meal[] | null>;
  getOne(id: number, userId: string): Promise<Meal | null>;
  countByUserId(userId: string): Promise<ICountByUserIdResult>;
}
