import cors from "cors";
import express, { Application, Request, Response } from "express";
import { bookRouter } from "./controllers/book.controller";
import { borrowRouter } from "./controllers/borrow.controller";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-client-beta.vercel.app",
    ],
  })
);
app.use(express.json());
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management System!");
});

export default app;
