import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from './json-read-format';
import { timestamp_export } from './timestamp';

var express = require("express");
var router = express.Router();
const prisma = new PrismaClient();

router.get(
    "/send-result/:score/:child_id/:comment/:is_guest/:result_id",
        
    async function (req: Request, res: Response, next: NextFunction) {
        let is_guest = false;
        if (req.params.is_guest == "true") {
            is_guest = true;
        }
        const highestIdComment = await prisma.screenings.create({
            
            data:{score:parseInt(req.params.score),
                child_id:parseInt(req.params.child_id),
            is_guest:is_guest,
        screening_result_id:parseInt(req.params.result_id),}

          });
          const status = `Send result successfully ${req.params.child_id} score: ${req.params.score} comment: ${req.params.comment} is_guest: ${req.params.is_guest} result_id: ${req.params.result_id}`;
          console.log(highestIdComment?.id);    
      res.json({ users: status });
    }
  );
export default router;