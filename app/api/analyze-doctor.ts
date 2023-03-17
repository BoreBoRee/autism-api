import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from "./json-read-format";

const timestamp = Date.now();
var express = require("express");
var router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/analyze-children/finish",
  async function (req: Request, res: Response, next: NextFunction) {
    const screening_comments = await prisma.screenings.findMany({
      where: {
        OR: [{ screening_comments: { none: {} } }],
      },
      select: { screening_comments: true },
    });
    console.log(screening_comments);
    const screening_comments_json = jsonRead(screening_comments);
    if (screening_comments_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(screening_comments.filter);
    res.json({ users: JSON.parse(screening_comments_json) });
  }
);
router.get(
  "/analyze-children/pending",
  async function (req: Request, res: Response, next: NextFunction) {
    const screenings = await prisma.screenings.findMany({
      select: { screening_comments: true, id: true, score: true },
      where: {
        OR: [
          { score: 8 },
          { score: 9 },
          { score: 10 },
          { score: 11 },
          { score: 12 },
          { score: 13 },
          { score: 14 },
          { score: 15 },
          { score: 16 },
          { score: 17 },
          { score: 18 },
          { score: 19 },
          { score: 20 },
        ],
      },
    });
    console.log(screenings);
    const screenings_json = jsonRead(screenings);
    if (screenings_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(screenings);
    res.json({ screenings_json: JSON.parse(screenings_json) });
  }
);
router.get(
  "/analyze-children/:uid/:child_id/:comment",
  async function (req: Request, res: Response, next: NextFunction) {
    const comment = req.params.comment;
    const screening_id = req.params.uid;

    // const time = String(DateTime)
    console.log(comment);
    const highestIdComment = await prisma.screening_comments.findFirst({
      orderBy: {
        id: "desc",
      },
      select: { id: true },
    });
    console.log(highestIdComment?.id);
    const highestIdComment_json = jsonRead(highestIdComment);
    if (highestIdComment_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    if (highestIdComment_json == null) {
      return res.status(500).json({ message: "No history" });
    }

    try {
      const newComment = await prisma.screening_comments.updateMany({
        where: {
          // user_id: parseInt(screening_id),
          screening_id: parseInt(req.params.child_id)
        },
        data: {
          id: parseInt(JSON.parse(highestIdComment_json)) + 1,
          comment: comment,
          // user_id: parseInt(screening_id),
          doctor_id: 1,
          status: "finish",
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while creating the screening comment.",
      });
    }

    res.json({ idLog: jsonRead(highestIdComment?.id) });
  }
);
// "/analyze_send/:user_id/:child_id/:score/:information",
router.get(
  "/analyze_send/:child_id/:score/:information",
  async function (req: Request, res: Response, next: NextFunction) {
    // const user_id = req.params.user_id;
    const child_id = req.params.child_id;
    const score = req.params.score;
    const information = req.params.information;
    try {
      const screening_comments = await prisma.screening_comments.create({
        data: {

          screening_id: parseInt(child_id),
          // user_id: parseInt(user_id),
          information: information,
          screening_score: parseInt(score),
          doctor_id: null,
          comment: null,
          status: "pending",
        },
      });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }


    const screening_info = `Send Child ${child_id} to doctor of this information ${information} score ${score}}`;
    console.log(screening_info);
    res.json({ screening_info: screening_info });
  }
);
//create read doctor information
router.get(
  "/analyze_doctor/:doctor_id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const doctor_id = req.params.doctor_id;
      const doctor = await prisma.doctors.findUnique({
        where: {
          id: parseInt(doctor_id),
        },
      });
      const doctor_json = jsonRead(doctor);
      if (doctor_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      console.log(doctor);
      res.json({ doctor: JSON.parse(doctor_json) });
    } catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/create-doctor/:doctor_id/:hospital_id/:name/:surname",
  async function (req: Request, res: Response, next: NextFunction) {
    const doctor_id = req.params.doctor_id;
    const hospital_id = req.params.hospital_id;
    const name = req.params.name;
    const surname = req.params.surname;
    try {
      const doctor = await prisma.doctors.create({
        data: {
          user_id: parseInt(doctor_id),
          hospital_id: parseInt(hospital_id),
          first_name: name,
          last_name: surname,
        }
      });
      const doctor_json = jsonRead(doctor);
      if (doctor_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      console.log(doctor);
      res.json({ doctor: `create doctor ${name} ${surname} hospital ID ${hospital_id}` });
    } catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
//http://localhost:5000/analyze/create-doctor/1446/1/borebo/doctor 
export default router;
