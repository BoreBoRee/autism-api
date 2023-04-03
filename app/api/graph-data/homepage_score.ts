import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from "../json-read-format";

const timestamp = Date.now();
var express = require("express");
var router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/get-highscore/:child_id/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const child_score = await prisma.screenings.findMany({
        where: {
          child_id: parseInt(req.params.child_id),
        },
        orderBy: {
          created_at: "desc",
        },
      });
      const child_score_most = await prisma.screenings.findMany({
        where: {
          child_id: parseInt(req.params.child_id),
        },
        orderBy: [{ score: "desc" }, { created_at: "desc" }],

        take: 1,
      });

      console.log(child_score);
      const child_score_json = jsonRead(child_score);
      const child_score_most_json = jsonRead(child_score_most);
      if (child_score_json == undefined || child_score_most_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      console.log(child_score_json);
      res.json({
        most_score: JSON.parse(child_score_most_json),
        all_children: JSON.parse(child_score_json),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/get-doctor-analyzed/:child_id",
  async function (req: Request, res: Response, next: NextFunction) {
    var status = "not finish";
    try {
      const child_analyzed = await prisma.screening_comments.findMany({
        where: {
          screening_id: parseInt(req.params.child_id),
          status: "finish",
        },
        orderBy: {},
      });
      console.log(child_analyzed);
      const child_analyzed_json = jsonRead(child_analyzed);
      if (child_analyzed_json != "[]") {
        status = "finish";
      }

      if (child_analyzed_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ users: JSON.parse(child_analyzed_json), status: status });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);

export default router;
