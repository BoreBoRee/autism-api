import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from './json-read-format';

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
      res.json({ users: JSON.parse(screenings_json) });
    }
  );
  router.get(
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

      res.json({ idLog: jsonRead(highestIdComment?.id) });

    }
  );
  export default router;