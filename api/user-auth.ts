import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from './json-read-format';

var express = require("express");
var router = express.Router();
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();

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
export default router;