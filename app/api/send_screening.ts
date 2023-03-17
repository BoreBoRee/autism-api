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
        try {
            let is_guest;
            if (req.params.is_guest == "true") {
                is_guest = true;
            }
            else if (req.params.is_guest == "false") {
                is_guest = false;
            }
            const highestIdComment = await prisma.screenings.create({

                data: {
                    score: parseInt(req.params.score),
                    child_id: parseInt(req.params.child_id),
                    is_guest: is_guest,
                    screening_result_id: parseInt(req.params.result_id),
                }

            });
            const status = `Send result successfully ${req.params.child_id} score: ${req.params.score} comment: ${req.params.comment} is_guest: ${req.params.is_guest} result_id: ${req.params.result_id}`;
            console.log(highestIdComment?.id);
            res.json({ users: status });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({

                error: `An error occurred while creating the screening comment. ${error}`,
            });
        }
    }
);
export default router;