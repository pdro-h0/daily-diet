import express from "express";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { createMeal } from "../http/controlles/meal/create-meal";
import { editeMeal } from "../http/controlles/meal/edit-meal";
import { removeMeal } from "../http/controlles/meal/remove-meal";
import { getAllMeals } from "../http/controlles/meal/get-all-meals"
import { getOneMeal } from "../http/controlles/meal/get-one-meal";

const mealRoute = express.Router();

mealRoute.post("/meal", ensureAuthenticated, createMeal);
mealRoute.put("/meal/:id", ensureAuthenticated, editeMeal)
mealRoute.delete("/meal/:id", ensureAuthenticated, removeMeal)
mealRoute.get("/meal/user", ensureAuthenticated, getAllMeals )
mealRoute.get("/meal/:id/user", ensureAuthenticated, getOneMeal)

export default mealRoute
