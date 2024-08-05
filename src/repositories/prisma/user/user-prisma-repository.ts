import { Prisma } from "@prisma/client";
import { db } from "../../../../lib/prisma";
import { UserRepository } from "../../user-repository";

export class UserPrismaRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
  
  async create(data: Prisma.UserCreateInput) {
    await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
  }
}
