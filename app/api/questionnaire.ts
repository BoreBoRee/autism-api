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
    try {
      const screening_questions = await prisma.screening_questions.findMany();
      console.log(screening_questions);
      const screening_questions_json = jsonRead(screening_questions);
      if (screening_questions_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({
        screening_questions: JSON.parse(screening_questions_json),
        helper: "answered is collect by row 'collect' plus score by 1",
      });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/questionnaire/score-advice/:score",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const score = req.params.score;
      let screening_score_send;
      var screening_score;
      if (parseInt(score) <= 2) {
        screening_score_send = 1
        screening_score = await prisma.screening_results.findMany({
          where: { id: 1 },

        });
      }
      else if (parseInt(score) > 2 && parseInt(score) <= 7) {
        screening_score_send = 2
        screening_score = await prisma.screening_results.findMany({
          where: { id: 2 },
        });
      }
      else {
        screening_score_send = 3
        screening_score = await prisma.screening_results.findMany({
          where: { id: 3 },
        });
      }

      console.log(screening_score);
      const screening_score_sjon = jsonRead(screening_score);
      if (screening_score_sjon == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ suggestion: JSON.parse(screening_score_sjon), screening_result_id: screening_score_send });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/questionnaire/adjust/:question/:id/:change-data",

  async function (req: Request, res: Response, next: NextFunction) {
    const question_at = req.params.question;
    const id = req.params.id;
    const question_change = req.params.changeData;
    // Call all questionnaire
    try {
      const screening_questions = await prisma.screening_questions.findMany();
      await prisma.screening_questions.findMany();
      console.log(screening_questions);
      const screening_questions_json = jsonRead(screening_questions);
      if (screening_questions_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      // Change questionnaire
      const screening_change_q = await prisma.screening_questions.update({
        where: { id: parseInt(id) },
        data: { question: question_change }
      });
      res.json({ all_questionnaire: JSON.parse(screening_questions_json), changeAt: {} });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  });
router.get(
  "/questionnaire/delete/:id/:question",

  async function (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const question = req.params.question;
    try {
      const screening_comments = await prisma.screening_questions.delete({
        where: { id: parseInt(id) }
      });
      console.log(screening_comments);
      const screening_comments_json = jsonRead(screening_comments);
      if (screening_comments_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ delete: `Delete question: ${question}, at id ${id}` });
    } catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/genderCreate/:gender",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const screening_questions = await prisma.genders.create({
        data: { id: 3, name: "อื่นๆ" }
      });

      res.json({

        helper: "genderate เพศอื่นๆ",
      });
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