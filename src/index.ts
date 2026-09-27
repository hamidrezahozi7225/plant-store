import express from "express";
import { NotFoundHandler } from "./lib/helper/notFound";
import { ErrorHandler } from "./lib/helper/errorHandler";
import AllRouter from "./module/routes";
import { configDotenv } from "dotenv";
import { ConnectDb } from "./lib/helper/connextDB";
import path from "path";

configDotenv();
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static(path.join(__dirname, "../upload")));

app.use(AllRouter);

app.use(NotFoundHandler);
app.use(ErrorHandler);

const port = Number(process.env.PORT ?? 3000);

if (require.main === module) {
  app.listen(port, async () => {
    await ConnectDb();
    console.log(`Server is running on http://localhost:${port}`);
  });
}
