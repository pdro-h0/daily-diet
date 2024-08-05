import { UserPrismaRepository } from "../../../repositories/prisma/user/user-prisma-repository";
import { CreateUserService } from "../../users/create";

export const makeCreateUserFactory = () => {
  const createUserPrismaRepository = new UserPrismaRepository();
  const createUserService = new CreateUserService(createUserPrismaRepository);

  return createUserService;
};
