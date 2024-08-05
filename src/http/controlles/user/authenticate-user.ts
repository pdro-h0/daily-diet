import { RequestHandler } from "express";
import z from "zod";
import { makeAuthenticateFactory } from "../../../services/factories/user/authenticate-user-factory";
import { sign } from "jsonwebtoken";
import { env } from "../../../env";
import { InvalidCredentials } from "../../../errors/invalid-credentials";
import { UserDoesNotExist } from "../../../errors/user-does-not-existis";

export const authenticateUser: RequestHandler = async (req, res) => {
  const authenticateUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const body = authenticateUserBodySchema.safeParse(req.body);

  if (!body.success) {
    return res.json({ error: "INVALID DATA" });
  }

  try {
    const authenticateService = makeAuthenticateFactory();

    const { user } = await authenticateService.execute(
      body.data.email,
      body.data.password
    );

    const token = sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "1d"
    });

    const refreshToken = sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "1d",
    });

    return res
      .cookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .json({ token });
  } catch (error) {
    console.log(error);

    if (error instanceof UserDoesNotExist ) {
      return res.status(404).json({ error: "Email or password invalids" });
    } else if (error instanceof InvalidCredentials) {
      return res.status(400).json({ error: error.message });
    }
  }
};
