import { Request, Response, NextFunction } from "express";
const { prisma, screeningCommentsModel } = require('./prisma');
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());

function jsonRead(data: any) {
    return JSON.stringify(data, (_, v) =>
      typeof v === "bigint" ? `${v}n` : v
    ).replace(/"(-?\d+)n"/g, (_, a) => a);
  }
app.get(
    "/advice-categories",
    async function (req: Request, res: Response, next: NextFunction) {
      const suggestion_categories = await prisma.suggestion_categories.findMany();
      console.log(suggestion_categories);
      res.json({ users: jsonRead(suggestion_categories) });
    }
  );
  app.listen(5000, function () {
    console.log("CORS-enabled web server listening on port 80");
  });
  