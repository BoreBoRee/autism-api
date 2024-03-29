import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from '../json-read-format';
import { timestamp_export } from '../other/timestamp';

var express = require("express");
var router = express.Router();
const prisma = new PrismaClient();

router.get(
    "/send-result/:score/:child_id/:comment/:is_guest/:result_id",
    
    async function (req: Request, res: Response, next: NextFunction) {
        var child_id = req.params.child_id;
        var child_save;
            const id_table = await prisma.screenings.findMany({
                select: { id: true },
                orderBy: { id: "desc" },
                take: 1,
            });
            var is_guest_bool; 
        try {
            if (child_id == "null"){
                child_save = null;
            }
            else {
                child_save = parseInt(child_id);

            }
            let is_guest;
            if (req.params.is_guest == "true") {
                is_guest_bool = true;
            }
            else {
                is_guest_bool = false;
            }
            const highestIdComment = await prisma.screenings.create({

                data: {
                    id: Number(id_table[0].id) + 1,
                    score: parseInt(req.params.score),
                    child_id: child_save,
                    is_guest: is_guest_bool,
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