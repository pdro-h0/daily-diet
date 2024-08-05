import { Prisma } from "@prisma/client";
import { MealRepository } from "../../meal-repository";
import { db } from "../../../../lib/prisma";

export class PrismaMealRepository implements MealRepository {
  async countByUserId(userId: string) {
    const mealsCount = await db.meal.count({
      where: {
        userId,
      },
    });

    const mealsInDiet = await db.meal.count({
      where: {
        userId,
        isOnDiet: true,
      },
    });

    const mealsOutOfDiet = await db.meal.count({
      where:{
        userId,
        isOnDiet: false
      }
    })

    const meals = await db.meal.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "asc",
      },
    });

    let currentStreak = 0;
    let maxStreak = 0;

    for (const meal of meals) {
      if (meal.isOnDiet) {
        currentStreak++;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    }

    return {
      mealsCount,
      mealsInDiet,
      mealsOutOfDiet,
      maxStreak,
    };
  }

  async getAll(userId: string) {
    const meals = await db.meal.findMany({
      where: {
        userId,
      },
      orderBy:{
        date: "asc"
      },
    });

    if (!meals) return null;

    return meals;
  }

  async getOne(id: number, userId: string) {
    const meal = await db.meal.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!meal) return null;

    return meal;
  }

  async remove(id: number, userId: string) {
    const mealToRemove = await db.meal.delete({
      where: {
        id,
        userId,
      },
    });

    if (!mealToRemove) return null;
  }
  async edit(data: Prisma.MealUpdateInput, userId: string, id: number) {
    const editedMeal = await db.meal.update({
      where: {
        id,
        userId,
      },
      data,
    });

    if (!editedMeal) return null;
    return editedMeal;
  }
  async create(data: Prisma.MealUncheckedCreateInput) {
    const newMeal = await db.meal.create({
      data,
    });

    return newMeal;
  }
}
