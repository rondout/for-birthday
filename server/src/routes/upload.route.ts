/*
 * @Author: shufei.han
 * @Date: 2025-04-11 15:58:17
 * @LastEditors: shufei.han
 * @LastEditTime: 2025-04-14 09:46:19
 * @FilePath: \for-birthday\server\src\routes\upload.route.ts
 * @Description: 
 */
import { upload } from "../models/notes.model";
import { BaseResponse } from "../models/response.model";
import { Router } from "express";
import { BaseRoute } from "./base.route";

export default class UploadRoute extends BaseRoute {
    constructor() {
        super();
    }
     registerRoute(): void {
        this.router.post("/single", upload.single('file'), (req, res) => {
            console.log(req.file, req.body?.name);
            if(req.file) {
                res.send(new BaseResponse(true))
            }    
        });
    }
}
