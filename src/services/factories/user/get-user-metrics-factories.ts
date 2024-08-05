import { PrismaMealRepository } from "../../../repositories/prisma/meal/meal-prisma-repository";
import { GetUserMetricsService } from "../../users/get-user-metrics";

export const makeGetUserMetrics = () => {
  const prismaMealRepository = new PrismaMealRepository();
  const getUserMetricsService = new GetUserMetricsService(prismaMealRepository);

  return getUserMetricsService;
};
