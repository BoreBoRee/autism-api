
import express, { Request, Response } from 'express';
import multer, { Multer } from 'multer';
import path, { PlatformPath } from 'path';
import { promises as fs } from 'fs';
// import prisma from './prisma';


var router = express.Router();
// var cors = require("cors");

// app.use(cors());

// import multer from 'multer';

const app = express();

// Set up Multer middleware for handling file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../uploads/'),// Specify the destination directory
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});
const upload = multer({ dest:'uploads/' });

// File upload endpoint
router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return;
  }

  // Process and save the file using Prisma
  const { filename, path: filePath, originalname } = req.file;
//   const uploadedFile = await prisma.file.create({
//     data: {
//       filename,
//       path: filePath,
//       originalname,
//     },
//   });

  // Move the uploaded file to a different directory
//   const newPath = filePath.replace('uploads/', 'new-directory/');
//   await fs.rename(filePath, newPath);
  console.log('File uploaded:', filePath);

  res.send('File uploaded successfully');
});

// const storage = multer.diskStorage({
//     destination: 'uploads/', // Specify the destination directory
//     fileFilter: (req:Request, file:File, cb:Function) => {
//     // filename: (req:Request, file:File, cb:Function) => {
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     //   const extension = path.extname(file.name);
//     //   cb(null, uniqueSuffix + extension);
//       cb(null, true);
//     },
//   });
//   const upload = multer({ storage });
//   // File

// // File upload endpoint
// router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
//     // Access the uploaded file details from `req.file`
//     if (!req.file) {
//       res.status(400).send('No file uploaded');
//       return;
//     }
  
//     console.log(req.file);
//     const { filename, path: filePath, originalname } = req.file;
//     // const newPath = path.replace('uploads/', 'new-directory/');
//     // fs.renameSync(path, newPath);
//     // Process and save the file using Prisma
//     // const { filename, path } = req.file;
//     // const uploadedFile = await prisma.file.create({
//     //   data: {
//     //     filename,
//     //     path
//     //   }
//     // });
  
//     res.send('File uploaded successfully');
//   });
  

export default router;