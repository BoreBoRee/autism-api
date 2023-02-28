
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
var express = require("express");
var router = new express.Router;

var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();
function jsonRead(data: any) {
    return JSON.stringify(data, (_, v) =>
      typeof v === "bigint" ? `${v}n` : v
    ).replace(/"(-?\d+)n"/g, (_, a) => a);
  }
  
    router.get(
    "/advices-categories",
    async function (req: Request, res: Response, next: NextFunction) {
      const suggestion_categories = await prisma.suggestion_categories.findMany();
      console.log(suggestion_categories);
      res.json({ users: jsonRead(suggestion_categories) });
    }
  );

export default router
// module.exports = router;
  // app.listen(5000, function () {
  //   console.log("CORS-enabled web server listening on port 80");
  // });
  