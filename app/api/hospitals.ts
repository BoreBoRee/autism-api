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
  "/hospitals-information",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const hospitals = await prisma.hospitals.findMany();
      console.log(hospitals);

      const hospitals_json = jsonRead(hospitals);
      if (hospitals_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ users: JSON.parse(hospitals_json) });
    } catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
// Hospital GET information
router.get(
  "/hospitals-information/:regions",
  async function (req: Request, res: Response, next: NextFunction) {
    const regions = req.params.regions;
    try {
      const hospitals = await prisma.hospitals.findMany({
        where: {
          region_id: parseInt(regions),
        },
      });
      console.log(hospitals);
      const hospitals_json = jsonRead(hospitals);
      if (hospitals_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({
        hospitals: JSON.parse(hospitals_json),
        helper:
          "Regions id ภาคใต้:1, ภาคกลาง:2, ภาคกลาง(ปริมณฑล):3, ภาคตะวันออกเฉียงเหนือ:4, ภาคเหนือ:5",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
export default router;
