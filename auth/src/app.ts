import express from "express";
import cors from "cors";
import { GlobalErrorHandler } from "./utils/ApiHandler";
import helmet from "helmet";
import authRouter from "./routes/index";

const app = express();

// global middlewares
const allowedOrigins = ['http://localhost:3000'];

app.use(
  cors({
    origin: (origin: string | undefined, callback: (error: Error | null, allow: boolean) => void) => {
      if (allowedOrigins.includes(origin as string) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json())
app.use(authRouter);
app.use(GlobalErrorHandler)

// app.get('*', (req, res)=>{
//   res.send("Page not found!");
// })

export default app;