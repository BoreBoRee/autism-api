import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from './json-read-format';

var express = require("express");
var router = express.Router();
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();


// Questionnaire
router.get(
    "/questionnaire",
    async function (req: Request, res: Response, next: NextFunction) {
      const screening_questions = await prisma.screening_questions.findMany();
      console.log(screening_questions);
      const screening_questions_json = jsonRead(screening_questions);
      if (screening_questions_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({
        users: JSON.parse(screening_questions_json),
        helper: "answered is collect by row 'collect' plus score by 1",
      });
    }
  );
  router.get(
    "/questionnaire/score-advice",
    async function (req: Request, res: Response, next: NextFunction) {
      const screening_comments = await prisma.screening_comments.findMany();
      console.log(screening_comments);
      const screening_comments_json = jsonRead(screening_comments);
      if (screening_comments_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ users: JSON.parse(screening_comments_json) });
    }
  );
  export default router;