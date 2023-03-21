import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from '../json-read-format';

var express = require("express");
var router = express.Router();
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();

router.get(
  "/province",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const provinces = await prisma.provinces.findMany({
        orderBy: {
          name: "asc",
        },
      });
      console.log(provinces);
      const provinces_json = jsonRead(provinces);
      if (provinces_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ province: JSON.parse(provinces_json) });
    } catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/province-test/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const provinces_id = Number(req.params.id) ;
      var where; 
      // provinces_id ? { provinces_id } : {};
      if (provinces_id == 0) {
        where = {}; 
      }
      else{
        where = provinces_id;
      }
      const provinces = await prisma.provinces.findMany({
        where: {id:where}
        
        
      })
      console.log(provinces);
      const provinces_json = jsonRead(provinces);
      if (provinces_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ province: JSON.parse(provinces_json) });
    } catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/regions",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const regions = await prisma.regions.findMany();
      console.log(regions);
      const regions_json = jsonRead(regions);
      if (regions_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ regions: JSON.parse(regions_json) });
    } catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/districts",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const districts = await prisma.districts.findMany();
      console.log(districts);
      const districts_json = jsonRead(districts);
      if (districts_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ districts: JSON.parse(districts_json) });
    } catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/sub_districts",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const sub_districts = await prisma.sub_districts.findMany();
      console.log(sub_districts);
      const sub_districts_json = jsonRead(sub_districts);
      if (sub_districts_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ sub_districts: JSON.parse(sub_districts_json) });
    } catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
export default router;