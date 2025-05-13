import config from "./config/env";
import express,{Request, Response} from "express";
import { connectPostgres } from "./config/db";
import app from './app';
// const app = express()

function serverStart(){
  const port = config.port;
  Promise.all([connectPostgres()])
  .then(() => {
    app.on("error", (err) => {
      throw err;
    });
    app.listen(port,() => {
      console.log(`server started at http://localhost:${port}`);
    });

    app.get("/", (req:Request, res:Response) => {
      res.send("Welecome to Rent-PE.....");
    });

    app.get("/health",(req:Request, res:Response) => {
      res.json("Auth:Health Check Pass 🧑‍⚕️✅");
    })
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
}

serverStart()