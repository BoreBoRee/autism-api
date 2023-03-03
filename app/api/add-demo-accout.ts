import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from './json-read-format';
import { timestamp_export } from './timestamp';

var express = require("express");
var router = express.Router();
const prisma = new PrismaClient();

router.get(
    "/create-demo",
    async function (req: Request, res: Response, next: NextFunction) {
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
          const demo_accout = await prisma.users.create({
            data: {
                // id:parseInt(JSON.parse(highestIdComment_json)) + 1,
                username:"DollyFish",
                crypted_password:"1234",
                role_id:3,
                facebook_id: null,
                google_id: null,
                       
            },
            
          });
          const create_or_not = await prisma.screening_comments.findFirst({
            orderBy: {
              id: "desc",
            },
            
          });
          console.log(create_or_not?.id);
          const create_or_not_json = jsonRead(create_or_not);
          if (create_or_not_json == undefined) {
            return res.status(500).json({ message: "Can't prase to json" });
          }
          if (create_or_not_json == null) {
            return res.status(500).json({ message: "No history" });
          }
      
      
      res.json({ users: JSON.parse(create_or_not_json) });
    }
  );
export default router;