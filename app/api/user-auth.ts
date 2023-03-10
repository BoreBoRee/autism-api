import { Request, Response, NextFunction } from "express";
import { fieldEncryptionMiddleware } from "prisma-field-encryption";
import { PrismaClient } from "@prisma/client";
import jsonRead from "./json-read-format";

var express = require("express");
var router = express.Router();
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();

router.get(
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

router.get(
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
router.get(
  "/facebook-login/:uid/:username",
  async function (req: Request, res: Response, next: NextFunction) {
    const username = req.params.username;
    const uid = req.params.uid;
    const provider = "facebook";
    var user_json = JSON.parse("{}");
    var userStatus = "";
    var addUser = "";
    const user = await prisma.users.findMany({
      where: { facebook_id: uid },
    });

    user_json = jsonRead(user);
    console.log(user_json);
    if (user_json != "[]") {
      userStatus = "exist";
      addUser = `login with uid ${uid}`;
    } else {
      userStatus = "not exist";
      const adduser = await prisma.users.create({
        data: {
          username: username,
          facebook_id: uid,
          role_id: 1,
        },
      });
      const user = await prisma.users.findMany({
        where: { facebook_id: uid },
      });
      user_json = jsonRead(user);
      addUser = `add ${uid} into database`;
    }
    if (user_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(user);
    res.json({
      users: JSON.parse(user_json),
      userStatus: { userStatus },
      addUser: { addUser },
      provider: { provider },
    });
  }
);

router.get(
  "/google-login/:uid/:username",
  async function (req: Request, res: Response, next: NextFunction) {
    var user_json = JSON.parse("{}");
    const username = req.params.username;
    const uid = req.params.uid;
    const provider = "google";
    var userStatus = "";
    var addUser = "";
    const user = await prisma.users.findMany({
      where: { google_id: uid },
    });

    user_json = jsonRead(user);
    if (user_json != "[]") {
      userStatus = "exist";
      addUser = `login with uid ${uid}`;
    } else {
      userStatus = "not exist";
      const adduser = await prisma.users.create({
        data: {
          username: username,
          google_id: uid,
          role_id: 1,
        },
      });
      const user = await prisma.users.findMany({
        where: { google_id: uid },
      });
      user_json = jsonRead(user);
      addUser = `add ${uid} into database`;
    }
    if (user_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(user);
    res.json({
      users: JSON.parse(user_json),
      userStatus: { userStatus },
      addUser: { addUser },
      provider: { provider },
    });
  }
);

router.get(
  "/email-login/:uid/:username",
  async function (req: Request, res: Response, next: NextFunction) {
    var user_json = JSON.parse("{}");
    const username = req.params.username;
    const uid = req.params.uid;
    const provider = "email";
    var userStatus = "";
    var addUser = "";
    const user = await prisma.users.findMany({
      where: { email_id: uid },
    });

    user_json = jsonRead(user);
    if (user_json != "[]") {
      userStatus = "exist";
      addUser = `login with uid ${uid}`;
    } else {
      userStatus = "not exist";
      const adduser = await prisma.users.create({
        data: {
          username: username,
          email_id: uid,
          role_id: 3,
        },
      });
      const user = await prisma.users.findMany({
        where: { email_id: uid },
      });
      user_json = jsonRead(user);
      addUser = `add ${uid} into database`;
      if (user_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
    }
    console.log(user);
    res.json({
      users: JSON.parse(user_json),
      userStatus: { userStatus },
      addUser: { addUser },
      provider: { provider },
    });
  }
);

router.get(
  "/delete-user/:uid/:provider",
  async function (req: Request, res: Response, next: NextFunction) {
    const provider = req.params.provider;
    const uid = req.params.uid;
    if (provider == "google") {
      const delete_user = await prisma.users
        .deleteMany({
          where: { google_id: uid },
        })
        .then(console.log);
    }
    if (provider == "facebook") {
      const delete_user = await prisma.users
        .deleteMany({
          where: { facebook_id: uid },
        })
        .then(console.log);
    }
    if (provider == "email") {
      const delete_user = await prisma.users
        .deleteMany({
          where: { email_id: uid },
        })
        .then(console.log);
    }
    res.json({ delete_user: { uid }, provider: { provider } });
  }
);

export default router;
