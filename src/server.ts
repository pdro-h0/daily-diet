import express from "express";
import { env } from "./env";
import cors from "cors"
import userRoute from "./routes/user-route";
import cookieParser from "cookie-parser";
import mealRoute from "./routes/meal-route";

const app = express();

const port = env.PORT;

app.use(cors({
  origin: "*",
}))
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoute);
app.use(mealRoute);

app.listen(port, () => {
  console.log(`SERVER RUNNING AT: http://localhost/${port}`);
});
