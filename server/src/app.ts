import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes";

const app = express();
const PORT = 8080;

const url = "mongodb://localhost:27017/db-todo";
mongoose.set("useFindAndModify", true);
app.use(cors());
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Server is listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    throw err;
  });
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.use(router);
