import { RequestHandler } from "express";
import { makeGetAllMealsFactories } from "../../../services/factories/meals/make-get-all-meals-factories copy";

export const getAllMeals: RequestHandler = async (req, res) => {
  const sub = req.userId;

  const getAllMealsService = makeGetAllMealsFactories();

  const { meals } = await getAllMealsService.execute(sub);

  return res.json({ meals });
};
