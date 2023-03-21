import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from '../json-read-format';

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

// router.get(
//   "/test/:array",
//   async function (req: Request, res: Response, next: NextFunction) {
//     try {
//       var list = String(req.params.array);
//       let array_l;
//       var array_2 = Array(array_l);
//       // if (list == undefined) {
//       //   array_l = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//       // }
//       // else {
//       //   array_l = list;
//       // }

      
      
//       var i;
//       for (i = 0; i < list.length; i++) {
//        if (list[i] !== "[" || list[i] !== "]" || list[i] !== " " || list[i] !== ","){
//         array_2.push(list[i]);
//         console.log(array_2);
         
//        }
        
    
//       };
//       res.json({

//         helper: array_2,
//       });}
//     catch (error) {
//       console.log(error);
//       res.status(500).json({

//         error: `An error occurred while creating the screening comment. ${error}`,
//       });
//     }
//   }
// )

router.get(
  "/questionnaire_send/:child_id/:score/:n1/:n2/:n3/:n4/:n5/:n6/:n7/:n8/:n9/:n10/:n11/:n12/:n13/:n14/:n15/:n16/:n17/:n18/:n19/:n20",
  // /questionnaire_send/517/3/0/1/1/1/1/0/0/0/0/1/0/1/0/1/1/1/1/0/0/0
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const child_id = req.params.child_id;
      const score = req.params.score;
      const n1 = req.params.n1;
      const n2 = req.params.n2;
      const n3 = req.params.n3;
      const n4 = req.params.n4;
      const n5 = req.params.n5;
      const n6 = req.params.n6;
      const n7 = req.params.n7;
      const n8 = req.params.n8;
      const n9 = req.params.n9;
      const n10 = req.params.n10;
      const n11 = req.params.n11;
      const n12 = req.params.n12;
      const n13 = req.params.n13;
      const n14 = req.params.n14;
      const n15 = req.params.n15;
      const n16 = req.params.n16;
      const n17 = req.params.n17;
      const n18 = req.params.n18;
      const n19 = req.params.n19;
      const n20 = req.params.n20;
      var list_answer = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, n14, n15, n16, n17, n18, n19, n20];
      const get_chld_ID_4create = await prisma.screenings.findMany({
        where: {
          child_id: parseInt(child_id)
        },
      select: {
        id: true
      },
      orderBy: {
        id: 'desc'
      },
      take: 1
    })
      var i;
      for (i = 1; i <= 20; i++){
        const get_ID_4create = await prisma.screening_details.findMany({
       
        select: {
          id: true
        },
        orderBy: {
          id: 'desc'
        },
        take:1 })
        console.log(Number(get_ID_4create[0].id )+ 1);
      const screening_questions = await prisma.screening_details.create({
        data: {
          id: Number(get_ID_4create[0].id) + 1,
          screening_question_id: i,
          screening_id: Number(get_chld_ID_4create[0].id ) ,
          answered: Boolean(Number(list_answer[i])),
        },
      });
      }
      ;}
      catch (error) {
        console.log(error);
        res.status(500).json({ 
          error: `An error occurred while creating the screening comment. ${error}`,
        });
      }
    
    res.json({
      helper: "ส่งคำตอบแบบสอบถาม",
    });
    });

        
export default router;