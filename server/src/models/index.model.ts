import { access, constants } from 'fs';
import { resolve } from 'path';
export type Id = string | number;

export interface BaseObject {
  [propName: string]: any;
}

export interface BaseData<T extends Id = Id> extends BaseObject {
  _id?: T;
  [key: string]: any;
}

export interface BaseTimeData<T extends Id = Id> extends BaseData<T> {
  createdAt?: Date;
  updatedAt?: Date;
}

export const VIDEOS_PATH = resolve(__dirname, '../../files/videos/');
export const IMAGES_PATH = resolve(__dirname, '../../files/images/');

export const getVideoPath = (name: string) => {
  return resolve(VIDEOS_PATH, name);
};

export const getImagePath = (name?: string) => {
  if(!name) {
    return IMAGES_PATH
  }
  return resolve(IMAGES_PATH, name);
};

export function checkFileExists (path: string) {
  return new Promise((resolve) => {
    access(path, constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}