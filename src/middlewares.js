require("dotenv").config();
import jwt from "jsonwebtoken";

export function parseTokenSetUser(req, res, next) {
  const authHeader = req.get("authorization");

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET || "NotARealSecreTT0k3nBaby&ItsNotR3allyLong@AllT00!", (error, user) => {
        if (!error) {
          req.user = user;
          next();
        } else next(error);
      });
    } else next();
  } else next();
}
