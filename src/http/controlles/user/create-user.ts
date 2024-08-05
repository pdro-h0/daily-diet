import { RequestHandler } from "express";
import z from "zod";
import { makeCreateUserFactory } from "../../../services/factories/user/create-user-factory";

export const createUser: RequestHandler = async (req, res) => {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
  });

  const body = createUserBodySchema.safeParse(req.body);

  if (!body.success) {
    throw new Error("INVALID DATA");
  }

  try {
    const createUserService = makeCreateUserFactory();
  
    await createUserService.execute(body.data);
    return res.status(201).json()
    
    
    } catch (error) {
      console.log(error)
      throw new Error("SOMETHING WENT WRONG")
      }
};
