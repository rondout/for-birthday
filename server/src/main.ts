import { Express } from "express";
/*
 * @Author: shufei.han
 * @Date: 2025-02-15 15:49:49
 * @LastEditors: shufei.han
 * @LastEditTime: 2025-02-15 15:52:17
 * @FilePath: \for-birthday\server\src\main.ts
 * @Description:
 */
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import { registerRoutes } from "./routes/index.route";

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8000;
export function startApp(port = PORT) {
  registerRoutes(app);
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
}
