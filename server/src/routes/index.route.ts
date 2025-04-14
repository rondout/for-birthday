/*
 * @Author: shufei.han
 * @Date: 2025-02-15 15:55:24
 * @LastEditors: shufei.han
 * @LastEditTime: 2025-04-11 16:05:26
 * @FilePath: \for-birthday\server\src\routes\index.route.ts
 * @Description: 
 */
import { Router, Express } from "express";
import UploadRoute from "./upload.route";
import { BaseRoute } from "./base.route";

export default class IndexRoute extends BaseRoute {
    constructor() {
        super();
    }
     registerRoute(): void {
        this.router.get("/", (req, res) => {
            res.send("Hello World");
        });
        this.router.get('/notes', (req, res) => {
            
        })
    }
}

export const registerRoutes = (app: Express) => {
    app.use('/api', new IndexRoute().router);
    app.use('/api/upload', new UploadRoute().router);
}