
import express, { Request, Response } from 'express';
import multer, { Multer } from 'multer';
import path, { PlatformPath } from 'path';
import { promises as fs } from 'fs';
import { createReadStream } from 'fs';
import stream from 'stream';
// import prisma from './prisma';


var router = express.Router();
// var cors = require("cors");

// app.use(cors());

// import multer from 'multer';

const app = express();
// const DIR = `.${process.env.UPLOAD_PATH}`;
// Set up Multer middleware for handling file uploads
// let storage = multer.diskStorage({
//     destination: async (req, file, cb) => {
//         const uploadPath = path.join(__dirname, 'uploads');
//         try {
//           await fs.access(uploadPath);
//           console.log("file are exist");
//         } catch (error) {
//           await fs.mkdir(uploadPath);
//           console.log("file are NOT exist");
//         }
//         cb(null, uploadPath);
//       },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       const extension = path.extname(file.originalname);
//       cb(null, uniqueSuffix + extension);
//     },
//   });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '/images');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// File upload endpoint
router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return res.send({ success: false });
  }
  else {
    console.log("file received",req.file);
    return res.send({ success: true, filename: req.file.filename });}
  // Process and save the file using Prisma
  // const { filename, path: filePath, originalname } = req.file;
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
  // console.log('File uploaded:', filePath);

  // res.send('File uploaded successfully');
});
router.get('/uploads/:fileimage', async (req: Request, res: Response) => {
  var filepath = path.resolve(process.env.UPLOAD_DIR || './uploads');
  filepath = filepath.replace(/\.[%/.]+$/, ".webp");
  const r = createReadStream(filepath);
  const ps = new stream.PassThrough();
  stream.pipeline(r, ps, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }
  );
  ps.pipe(res);
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