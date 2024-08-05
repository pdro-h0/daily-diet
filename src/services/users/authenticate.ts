import { compare } from "bcryptjs";
import { UserRepository } from "../../repositories/user-repository";
import { InvalidCredentials } from "../../errors/invalid-credentials";
import { UserDoesNotExist } from "../../errors/user-does-not-existis";

export class AuthenticateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserDoesNotExist("USER DOES NOT EXISTS");
    }

    const doesPasswordMatches = await compare(password, user.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentials("Email or password invalids");
    }

    return {
      user,
    };
  }
}
