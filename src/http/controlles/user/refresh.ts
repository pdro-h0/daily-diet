import { RequestHandler } from "express";
import { decode, sign } from "jsonwebtoken";
import { env } from "../../../env";
import dayjs from "dayjs"

export const refresh: RequestHandler = async (req, res) => {
  const cookie: string = req.cookies.refreshToken;
  if(!cookie) return res.status(401).end()

  const code = decode(cookie)
  if(!code) throw new Error()

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(code.exp))

    if(refreshTokenExpired){
      return res.status(401).json()
    }

  const token = sign({}, env.JWT_SECRET, {
    subject: code.sub,
    expiresIn: "1800s",
  });

  const refreshToken = sign({}, env.JWT_SECRET, {
    subject: code.sub,
    expiresIn: "1d",
  });

  return res
    .cookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .json({ token });
};
