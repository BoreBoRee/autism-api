import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from './json-read-format';

var express = require("express");
var router = express.Router();
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();

router.get(
  "/media",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const screening_media = await prisma.screening_media.findMany();
      console.log(screening_media);

      const screening_media_json = jsonRead(screening_media);
      if (screening_media_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ users: JSON.parse(screening_media_json) });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
export default router;