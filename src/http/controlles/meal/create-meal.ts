import { RequestHandler } from "express";
import z from "zod";
import { makeCreateMealFactories } from "../../../services/factories/meals/make-create-meal-factories";

export const createMeal: RequestHandler = async (req, res) => {
  const sub = req.userId;

  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isOnDiet: z.boolean(),
    date: z.coerce.date()
  });

  const bodySchema = createMealBodySchema.safeParse(req.body);

  if (!bodySchema.success) {
    return res.status(400).json({ message: "algo deu errado" });
  }

  const createMealService = makeCreateMealFactories();

  const { newMeal } = await createMealService.execute({
    description: bodySchema.data.description,
    isOnDiet: bodySchema.data.isOnDiet,
    name: bodySchema.data.name,
    date: bodySchema.data.date ?? new Date(),
    userId: sub
  });

  return res.status(201).json({ ...newMeal, userId: undefined });
};
