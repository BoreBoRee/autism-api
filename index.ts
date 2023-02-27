import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();

function jsonRead(data: any) {
  if (data !== undefined) {
    let intCount = 0,
      repCount = 0;
    const json = JSON.stringify(data, (_, v) => {
      if (typeof v === "bigint") {
        intCount++;
        return `${v}#bigint`;
      }
      return v;
    });
    const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
      repCount++;
      return a;
    });
    if (repCount > intCount) {
      // You have a string somewhere that looks like "123#bigint";
      throw new Error(`BigInt serialization conflict with a string value.`);
    }
    return res;
  }
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
  }
);

app.get(
  "/user/first",
  async function (req: Request, res: Response, next: NextFunction) {
    const user = await prisma.users.findFirst();
    console.log(user);
    const allUserJson = jsonRead(user);
    if (allUserJson == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(user);
    res.json({ users: JSON.parse(allUserJson) });
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
    const allUsers = jsonRead(allUser);
    if (allUsers == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(allUser);
    res.json({ users: JSON.parse(allUsers) });
  }
);
// Advice and exercise
app.get(
  "/advice-categories",
  async function (req: Request, res: Response, next: NextFunction) {
    const suggestion_categories = await prisma.suggestion_categories.findMany();
    console.log(suggestion_categories);
    const suggestion_categories_json = jsonRead(suggestion_categories);
    if (suggestion_categories_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    res.json({ users: JSON.parse(suggestion_categories_json) });
  }
);
app.get(
  "/advice-content",
  async function (req: Request, res: Response, next: NextFunction) {
    const suggestion_details = await prisma.suggestion_details.findMany();
    console.log(suggestion_details);
    const suggestion_details_json = jsonRead(suggestion_details);
    if (suggestion_details_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    res.json({ users: JSON.parse(suggestion_details_json) });
  }
);

// Hospitals raw data
app.get(
  "/location/province",
  async function (req: Request, res: Response, next: NextFunction) {
    const provinces = await prisma.provinces.findMany();
    console.log(provinces);
    const provinces_json = jsonRead(provinces);
    if (provinces_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    res.json({ users: JSON.parse(provinces_json) });
  }
);
app.get(
  "/location/regions",
  async function (req: Request, res: Response, next: NextFunction) {
    const regions = await prisma.regions.findMany();
    console.log(regions);
    const regions_json = jsonRead(regions);
    if (regions_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    res.json({ users: JSON.parse(regions_json) });
  }
);
app.get(
  "/location/districts",
  async function (req: Request, res: Response, next: NextFunction) {
    const districts = await prisma.districts.findMany();
    console.log(districts);
    const districts_json = jsonRead(districts);
    if (districts_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    res.json({ users: JSON.parse(districts_json) });
  }
);
app.get(
  "/hospitals-information",
  async function (req: Request, res: Response, next: NextFunction) {
    const allUser = await prisma.hospitals.findMany();
    console.log(allUser);

    const allUser_json = jsonRead(allUser);
    if (allUser_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    res.json({ users: JSON.parse(allUser_json) });
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
    const hospitals_json = jsonRead(hospitals);
    if (hospitals_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    res.json({
      users: JSON.parse(hospitals_json),
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
app.get(
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

app.get(
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
    const screenings_json = jsonRead(screenings);
    if (screenings_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(screenings);
    res.json({ users: JSON.parse(screenings_json) });
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
      const newComment = await prisma.screening_comments.create({
        data: {
          id: parseInt(JSON.parse(highestIdComment_json)) + 1,
          comment: comment,
          screening_id: parseInt(screening_id),
          doctor_id: 1,
          created_at: "2023-04-29T12:31:11.844Z",
          updated_at: "2023-04-29T12:31:11.844Z",
        },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          error: "An error occurred while creating the screening comment.",
        });
    }
    // comment: jsonRead(comment), id: jsonRead(screening_id),
    res.json({ idLog: jsonRead(highestIdComment?.id) });
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
