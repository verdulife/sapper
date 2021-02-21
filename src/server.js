import sirv from "sirv";
import express from "express";
import cors from "cors";
import compression from "compression";
import * as sapper from "@sapper/server";

const app = express();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:${PORT}`,
  })
);

app
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (req, res) => {
        return {
          locale: req.headers["accept-language"].substring(0, 2),
        };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
