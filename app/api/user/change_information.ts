import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from "../json-read-format";

var express = require("express");
var router = express.Router();
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();

router.get(
    "/change-info/:user_id/:username/:birthdate",
    async function (req: Request, res: Response, next: NextFunction) {
        const username = req.params.username;
            const birthdate = req.params.birthdate;
        try {
           
            const user_id = req.params.user_id;
            const update_user = await prisma.users.update({
                where: { id: Number(user_id) },
                data: { birthday:new Date(birthdate), username: username },
            }).then((data) => console.log(data));
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `An error occurred while creating the screening comment. ${error}`,
            });
        }
        res.json({ message: "update success", updateinfo:`${username} ${birthdate}`});
    }
);



export default router;