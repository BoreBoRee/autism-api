import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();


function jsonRead(data: any) {
  return JSON.stringify(data, (_, v) =>
    typeof v === "bigint" ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a);
}
// User
app.get(
  "/users-uid/:uid",
  async function (req: Request, res: Response, next: NextFunction) {
    const uid = req.params.uid;
    const allUser = await prisma.users.findMany({
      where: {
        OR: { google_id: uid, facebook_id: uid },
      },
    });
    console.log(allUser);
    res.json({ users: jsonRead(allUser) });
  }
);

app.get(
  "/user/first",
  async function (req: Request, res: Response, next: NextFunction) {
    const allUser = await prisma.users.findFirst();
    console.log(allUser);
    res.json({ users: jsonRead(allUser) });
  }
);
app.get(
  "/childe/:userId",
  async function (req: Request, res: Response, next: NextFunction) {
    const user_id = req.params.userId;
    const allUser = await prisma.children.findMany({
      where: {
        user_id: parseInt(user_id),
      },
    });
    console.log(allUser);
    res.json({ users: jsonRead(allUser) });
  }
);
// Advice and exercise
app.get(
  "/advice-categories",
  async function (req: Request, res: Response, next: NextFunction) {
    const suggestion_categories = await prisma.suggestion_categories.findMany();
    console.log(suggestion_categories);
    res.json({ users: jsonRead(suggestion_categories) });
  }
);
app.get(
  "/advice-content",
  async function (req: Request, res: Response, next: NextFunction) {
    const suggestion_details = await prisma.suggestion_details.findMany();
    console.log(suggestion_details);
    res.json({ users: jsonRead(suggestion_details) });
  }
);

// Hospitals raw data
app.get(
  "/location/province",
  async function (req: Request, res: Response, next: NextFunction) {
    const provinces = await prisma.provinces.findMany();
    console.log(provinces);
    res.json({ users: jsonRead(provinces) });
  }
);
app.get(
  "/location/regions",
  async function (req: Request, res: Response, next: NextFunction) {
    const regions = await prisma.regions.findMany();
    console.log(regions);
    res.json({ users: jsonRead(regions) });
  }
);
app.get(
  "/location/districts",
  async function (req: Request, res: Response, next: NextFunction) {
    const districts = await prisma.districts.findMany();
    console.log(districts);
    res.json({ users: jsonRead(districts) });
  }
);
app.get(
  "/hospitals-information",
  async function (req: Request, res: Response, next: NextFunction) {
    const allUser = await prisma.hospitals.findMany();
    console.log(allUser);
    res.json({ users: jsonRead(allUser) });
  }
);
// Hospital GET information
app.get(
  "/hospitals-information/:regions",
  async function (req: Request, res: Response, next: NextFunction) {
    const regions = req.params.regions;
    const hospitals = await prisma.hospitals.findMany({
      where: {
        region_id: parseInt(regions),
      },
    });
    console.log(hospitals);
    res.json({
      users: jsonRead(hospitals),
      helper:
        "Regions id ภาคใต้:1, ภาคกลาง:2, ภาคกลาง(ปริมณฑล):3, ภาคตะวันออกเฉียงเหนือ:4, ภาคเหนือ:5",
    });
  }
);

// Questionnaire
app.get(
  "/questionnaire",
  async function (req: Request, res: Response, next: NextFunction) {
    const screening_questions = await prisma.screening_questions.findMany();
    console.log(screening_questions);
    res.json({
      users: jsonRead(screening_questions),
      helper: "answered is collect by row 'collect' plus score by 1",
    });
  }
);
app.get(
  "/questionnaire/score-advice",
  async function (req: Request, res: Response, next: NextFunction) {
    const screening_comments = await prisma.screening_comments.findMany();
    console.log(screening_comments);
    res.json({ users: jsonRead(screening_comments) });
  }
);

app.get(
  "/analyze-children/finish",
  async function (req: Request, res: Response, next: NextFunction) {
    const screening_comments = await prisma.screenings.findMany({
      where: {
        OR: [{ screening_comments: { none: {} } }],
      },
      select: { screening_comments: true },
    });

    console.log(screening_comments.filter);
    res.json({ users: jsonRead(screening_comments) });
  }
);
app.get(
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
    res.json({ users: jsonRead(screenings) });
  }
);
app.get(
  "/analyze-children/:uid/:comment",
  async function (req: Request, res: Response, next: NextFunction) {
    const comment = req.params.comment;
    const screening_id = req.params.uid;
    // const time = String(DateTime)
    console.log(comment);
    const highestIdComment = await prisma.screening_comments.findFirst({
      orderBy: {
        id: 'desc',
      },
      select:{id:true}
    });
    console.log(highestIdComment?.id)
    try {
      const newComment = await prisma.screening_comments.create({
        data: {
          id: parseInt(jsonRead(highestIdComment?.id)) + 1,
          comment: comment,
          screening_id: parseInt(screening_id),
          doctor_id: 1,
          created_at: "2023-04-29T12:31:11.844Z",
          updated_at: "2023-04-29T12:31:11.844Z"
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while creating the screening comment.' });
    }
    // comment: jsonRead(comment), id: jsonRead(screening_id),
    res.json({  idLog:jsonRead(highestIdComment?.id)});
    // const upsertComment = await prisma.screening_comments.upsert({
    //   where
    // });
    // console.log(screening_comments);
    // {id:6, comment:test}
  }
);

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 80");
});
