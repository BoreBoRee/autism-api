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
    "/province",
    async function (req: Request, res: Response, next: NextFunction) {
      const provinces = await prisma.provinces.findMany();
      console.log(provinces);
      const provinces_json = jsonRead(provinces);
      if (provinces_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ province: JSON.parse(provinces_json) });
    }
  );
  router.get(
    "/regions",
    async function (req: Request, res: Response, next: NextFunction) {
      const regions = await prisma.regions.findMany();
      console.log(regions);
      const regions_json = jsonRead(regions);
      if (regions_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ regions: JSON.parse(regions_json) });
    }
  );
  router.get(
    "/districts",
    async function (req: Request, res: Response, next: NextFunction) {
      const districts = await prisma.districts.findMany();
      console.log(districts);
      const districts_json = jsonRead(districts);
      if (districts_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ districts: JSON.parse(districts_json) });
    }
  );
  export default router;