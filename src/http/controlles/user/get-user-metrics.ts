import { RequestHandler } from "express";
import { makeGetUserMetrics } from "../../../services/factories/user/get-user-metrics-factories";

export const getUserMetrics: RequestHandler = async (req, res) => {
  const getUserMetricsSerive = makeGetUserMetrics();

  const sub = req.userId;


  const { mealsCount, mealsInDiet, mealsOutOfDiet, maxStreak } =
    await getUserMetricsSerive.execute(sub);

  return res.json({ mealsCount, mealsInDiet, mealsOutOfDiet, maxStreak });
};
