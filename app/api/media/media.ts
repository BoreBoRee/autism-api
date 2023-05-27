
import express, { Request, Response } from 'express';
import multer, { Multer } from 'multer';
import path, { PlatformPath } from 'path';
import { promises as fs } from 'fs';
import { createReadStream } from 'fs';
import stream from 'stream';
import { PrismaClient } from "@prisma/client";
import jsonRead from "../json-read-format";
const prisma = new PrismaClient();
var router = express.Router();
const app = express();
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
router.post('/upload/:screening_id', upload.single('image'), async (req: Request, res: Response) => {
  const screening_id = req.params.screening_id;
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return res.send({ success: false });
  }
  else {
    console.log("file received",req.file);
    const uploadedFile = await prisma.screening_comments.updateMany({
      where: {
        
        screening_id: Number(screening_id),
      },
      data: {
        image_file_name: req.file.filename,
      },
    });
    return res.send({ success: true, filename: req.file.filename });}
});
router.post('/upload-child/:children_id', upload.single('image'), async (req: Request, res: Response) => {
  const children_id = req.params.children_id;
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return res.send({ success: false });
  }
  else {
    console.log("file received",req.file);
    const uploadedFile = await prisma.children.updateMany({
      where: {
        
        id: Number(children_id),
      },
      data: {
        image_file_name: req.file.filename,
      },
    });
    return res.send({ success: true, filename: req.file.filename });}
});
router.post('/upload-child/:user_id', upload.single('image'), async (req: Request, res: Response) => {
  const user_id = req.params.user_id;
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return res.send({ success: false });
  }
  else {
    console.log("file received",req.file);
    const uploadedFile = await prisma.users.updateMany({
      where: {
        
        id: Number(user_id),
      },
      //
      data: {
        image_file_name: req.file.filename,
      },
    });
    return res.send({ success: true, filename: req.file.filename });}
});
router.get('/uploads/:fileimage', async (req: Request, res: Response) => {
  var filepath = path.resolve('./././images', req.params.fileimage);
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


export default router;