import { UserRepository } from "../../repositories/user-repository";
import { hash } from "bcryptjs";

interface CreateUser {
  email: string;
  name: string;
  password: string;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUser) {
    const passwordHash = await hash(data.password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(data.email);

    if (userWithSameEmail) {
      throw new Error("USER ALREADY EXISTS");
    }

    await this.userRepository.create({
      email: data.email,
      name: data.name,
      password: passwordHash,
    });
  }
}
