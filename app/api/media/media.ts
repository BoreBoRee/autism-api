import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from "../json-read-format";
import path from 'path';
var express = require("express");
var router = express.Router();
// var cors = require("cors");
var app = express();
// app.use(cors());
const prisma = new PrismaClient();
const bodyParser = require('body-parser');
const multer = require('multer');
// import multer from 'multer';

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req:Request, file:File, cb:Function) => {
      // File filter logic (optional)
      // For example, you can restrict the file types or file size
      cb(null, true);
    }
  });
  
  // File

// File upload endpoint
app.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
    // Access the uploaded file details from `req.file`
    if (!req.file) {
      res.status(400).send('No file uploaded');
      return;
    }
  
    console.log(req.file);
  
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