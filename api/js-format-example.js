// import { Request, Response, NextFunction } from "express";
// import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const prisma = new PrismaClient();


function jsonRead(data) {
    if (data !== undefined) {
        let intCount = 0,
            repCount = 0;
        const json = JSON.stringify(data, (_, v) => {
            if (typeof v === 'bigint') {
                intCount++;
                return `${v}#bigint`;
            }
            return v;
        });
        const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
            repCount++;
            return a;
        });
        if (repCount > intCount) {
            // You have a string somewhere that looks like "123#bigint";
            throw new Error(`BigInt serialization conflict with a string value.`);
        }
        return res;
    }
}
// User
app.get(
    "/users-uid/:uid",
    async function(req, res) {
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
    async function(req, res) {
        const user = await prisma.users.findFirst();
        console.log(user);
        const allUserJson = jsonRead(user)
        if (allUserJson == undefined) {
            return res.status(500).json({ message: "Can't prase to json" })
        }
        console.log(user);
        res.json({ users: JSON.parse(allUserJson) });
    }
);
app.get(
    "/childe/:userId",
    async function(req, res) {
        const user_id = req.params.userId;
        const allUser = await prisma.children.findMany({
            where: {
                user_id: parseInt(user_id),
            },
        });
        console.log(allUser);
        res.json({ users: jsonRead(allUser) });
    }
);
// Advice and exercise


app.listen(5000, function() {
    console.log("CORS-enabled web server listening on port 80");
});
export default router;