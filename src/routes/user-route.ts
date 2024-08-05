import express, {  Request, Response } from "express";
import { createUser } from "../http/controlles/user/create-user";
import { authenticateUser } from "../http/controlles/user/authenticate-user";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { refresh } from "../http/controlles/user/refresh";
import { getUserMetrics } from "../http/controlles/user/get-user-metrics";

const userRoute = express.Router();

userRoute.post("/user", createUser);
userRoute.post("/sessions", authenticateUser);
userRoute.get("/me", ensureAuthenticated, getUserMetrics)
userRoute.patch("/token/refresh", ensureAuthenticated, refresh)

userRoute.get("/users",ensureAuthenticated ,(req: Request, res: Response) => {
    return res.json({pong: true})
})




export default userRoute;
