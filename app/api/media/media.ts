import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from "../json-read-format";

var express = require("express");
var router = express.Router();
// var cors = require("cors");
var app = express();
// app.use(cors());
import path, { PlatformPath } from 'path';
import { promises as fs } from 'fs';
const prisma = new PrismaClient();
const bodyParser = require('body-parser');
const multer = require('multer');
// import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'uploads/', // Specify the destination directory
    filename: (req:Request, file:File, cb:Function) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.name);
      cb(null, uniqueSuffix + extension);
    },
  });
  const upload = multer({ storage });
  // File

// File upload endpoint
router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
    // Access the uploaded file details from `req.file`
    if (!req.file) {
      res.status(400).send('No file uploaded');
      return;
    }
  
    console.log(req.file);
    const { filename, path: filePath, originalname } = req.file;
    // const newPath = path.replace('uploads/', 'new-directory/');
    // fs.renameSync(path, newPath);
    // Process and save the file using Prisma
    // const { filename, path } = req.file;
    // const uploadedFile = await prisma.file.create({
    //   data: {
    //     filename,
    //     path
    //   }
    // });
  
    res.send('File uploaded successfully');
  });
  

export default router;