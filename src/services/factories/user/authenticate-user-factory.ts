import { UserPrismaRepository } from "../../../repositories/prisma/user/user-prisma-repository";
import { AuthenticateUserService } from "../../users/authenticate";

export const makeAuthenticateFactory = () => {
  const userPrismaRepository = new UserPrismaRepository();
  const authenticateUserService = new AuthenticateUserService(
    userPrismaRepository
  );

  return authenticateUserService;
};
