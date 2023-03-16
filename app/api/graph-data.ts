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
    "/graph-data",
    async function (req: Request, res: Response, next: NextFunction) {
      let store_answer: {[key: string]: number} = {}
      let count: number;
      for (let i = 1; i <= 20; i++) {
        const question_answer_false = await prisma.screening_details.findMany({
          where: {screening_question_id: i, answered: false},
          
          select: {answered: true}
        }).then((data) => count = data.length);
      
        // Add the count for false answers to the store_answer object
        store_answer[`${i}_false`] = question_answer_false;
      
        const question_answer_true = await prisma.screening_details.findMany({
          where: {screening_question_id: i, answered: true},
          select: {answered: true}
        }).then((data) => count = data.length);
      
        // Add the count for true answers to the store_answer object
        store_answer[`${i}_true`] = question_answer_true;
      }
  
      // const question_answer_json = jsonRead(question_answer);
      // if (question_answer_json == undefined) {
      //   return res.status(500).json({ message: "Can't prase to json" });
      // }
      res.json({ users: store_answer });
    }
  );

  router.get(
    "/gender-graph-data/:gender_id",
    async function (req: Request, res: Response, next: NextFunction) {
      const gender = req.params.gender_id;
      let store_answer: {[key: string]: number} = {}
      let count: number;
      for (let i = 1; i <= 20; i++) {
        const question_answer_false = await prisma.children.findMany({
          
          where:{gender_id:parseInt(gender), screenings: {some: {screening_details: {some: {screening_question_id: i, answered: false}}}}},
          include: {
            
            screenings: {
              include: {
                screening_details:{
                  where: {answered: false, screening_question_id: 3},
                  // select: {answered: true}
                },            
              },
            }
          },
        }).then((data) => count = data.length);
        store_answer[`${i}_false`] = question_answer_false;
        const question_answer_true = await prisma.children.findMany({
          
          where:{gender_id:parseInt(gender), screenings: {some: {screening_details: {some: {screening_question_id: i, answered: true}}}}},
          include: {
            
            screenings: {
              include: {
                screening_details:{
                  where: {answered: true, screening_question_id: 3},
                  // select: {answered: true}
                },            
              },
            }
          },
        }).then((data) => count = data.length);
        store_answer[`${i}_true`] = question_answer_true;
      }
  
      // const question_answer_json = jsonRead(question_answer_false);
      // if (question_answer_json == undefined) {
      //   return res.status(500).json({ message: "Can't prase to json" });
      // }users: JSON.parse(question_answer_json)
      res.json({ data:store_answer  });
    }
  );
  // create function to get gender
  
  router.get(
    "/genders",
    async function (req: Request, res: Response, next: NextFunction) {
      const gender = req.params.gender_id;
      let store_answer: {[key: string]: number} = {}
      let count: number;
      const getGender_boy = await prisma.children.findMany({
        where: {gender_id:1}
      }).then((data) => count = data.length);
      store_answer["ชาย"] = getGender_boy;
      const getGender_dauther= await prisma.children.findMany({
        where: {gender_id:2}
      }).then((data) => count = data.length);
      store_answer["หญิง"] = getGender_dauther;
      const getGender_other= await prisma.children.findMany({
        where: {gender_id:3}
      }).then((data) => count = data.length);
      store_answer["อื่นๆ"] = getGender_other;
      // const getGender_json = jsonRead(getGender);
      // if (getGender_json == undefined) {
      //   return res.status(500).json({ message: "Can't prase to json" });
      // }users: JSON.parse(getGender_json)
      res.json({ data:store_answer  });
    }
  );

  
  export default router;
  