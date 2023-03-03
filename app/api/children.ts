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
  export default router;