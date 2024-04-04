import config from "./config";
import express, { Express, Request, Response } from "express";
import cors from "cors";
// import routes from "./routes";
import cookieParser from "cookie-parser";
const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: "*",
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:5172",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

// app.use("/api/v1", routes);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(config.port, () => {
  console.log(`[server]: Server is running at http://localhost:${config.port}`);
});
