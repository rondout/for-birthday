/*
 * @Author: shufei.han
 * @Date: 2025-02-15 16:14:41
 * @LastEditors: shufei.han
 * @LastEditTime: 2025-04-11 16:23:56
 * @FilePath: \for-birthday\server\src\models\notes.model.ts
 * @Description: 
 */
import { writeFile } from "fs/promises";
import { BaseData, checkFileExists, getImagePath, getVideoPath } from "./index.model";
import multer, { Options } from "multer";
import { Request } from "express";

export enum FileType {
  IMAGE = "image",
  VIDEO = "video",
}

export interface NoteFiles extends BaseData {
  name?: string;
  date: number | string;
  type: FileType;
  path: string;
}

export interface NoteItem extends BaseData {
  name: string;
  content: string;
  files: NoteFiles[];
}

export class NoteFileHandler implements NoteFiles {
    public date: number | string;
    public path: string;
    constructor(
        public name: string,
        public type: FileType = FileType.IMAGE,
    ) { 
        if(type === 'image') {
            this.path = getImagePath(name);
        }else if (type === 'video') {
            this.path = getVideoPath(name);
        }
    }

    public saveToDb(file: File) {
        NoteFileHandler.saveFileToDb(file, this.path);
    }

    static async saveFileToDb(file: File, path: string) {
        // try {
        //     if(await checkFileExists(path)) {
        //         console.log('file exists');
        //         return false;
        //     }else {
        //         await writeFile(path, file);
        //     }
        // } catch (error) {
            
        // }
    }

}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, getImagePath());
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter: Options['fileFilter']= (req: Request, file, cb: multer.FileFilterCallback) => {
    if (file.mimetype?.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('File Type Error'));
    }
};

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 50 // 20M限制
    },
    fileFilter,
});