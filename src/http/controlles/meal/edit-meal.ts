import { RequestHandler } from "express";
import z from "zod";
import { makeEditMeal } from "../../../services/factories/meals/make-edit-meal-factories";

export const editeMeal: RequestHandler = async (req, res) => {
  const editMealParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const editMealBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date(),
    isOnDiet: z.boolean().optional(),
  });

  const editMealParams = editMealParamsSchema.safeParse(req.params);
  const editMealBody = editMealBodySchema.safeParse(req.body);

  const sub = req.userId;

  if (!editMealParams.success || !editMealBody.success) {
    return res.status(400).json({ message: "algo deu errado" });
  }

  const editMealService = makeEditMeal();

  const { date, description, isOnDiet, name } = editMealBody.data;
  const { id } = editMealParams.data;
  const { editedMeal } = await editMealService.execute(
    {
      date: date ?? new Date(),
      description,
      isOnDiet,
      name,
    },
    sub,
    id
  );

  return res.json({ editedMeal });
};
