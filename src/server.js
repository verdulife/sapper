import sirv from "sirv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import * as sapper from "@sapper/server";
import { parseTokenSetUser, isLoggedIn } from "./middlewares";

const app = express();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(parseTokenSetUser);

app
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (req, res) => {
        return {
          locale: req.headers["accept-language"].substring(0, 2),
          token: req.cookies["token"] || req.session,
        };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
