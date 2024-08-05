import { RequestHandler } from "express";
import z from "zod";
import { makeRemoveMealFactories } from "../../../services/factories/meals/make-remove-meal-factories";

export const removeMeal: RequestHandler = async (req, res) => {
  const removeMealParamsSchema = z.object({
    id: z.coerce.number().positive(),
  });

  const params = removeMealParamsSchema.safeParse(req.params);

  if (!params.success) {
    return res.status(400).json({ message: "algo deu errado" });
  }

   const sub = req.userId

  const removeMealService = makeRemoveMealFactories();

  const { id } = params.data;
  await removeMealService.execute(id, sub);

  return res.end();
};
