import { RequestHandler } from "express";
import z from "zod";
import { makeGetOneMealFactories } from "../../../services/factories/meals/make-get-one-meal-factories";
import { decode } from "jsonwebtoken";

export const getOneMeal:RequestHandler = async (req, res) =>{
    const getOneMealParamsSchema = z.object({
        id: z.coerce.number().positive(),
    })

    const params = getOneMealParamsSchema.safeParse(req.params)

    if(!params.success){
    return res.status(400).json({ message: "algo deu errado" });
    }

    const sub = req.userId

    const getOneMealService = makeGetOneMealFactories()


    const { id } = params.data
    const { meal } = await getOneMealService.execute(id, sub);

    return res.json({ meal })
}