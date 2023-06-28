import { Request, Response, NextFunction } from "express";
import { fieldEncryptionMiddleware } from "prisma-field-encryption";
import { PrismaClient } from "@prisma/client";
import jsonRead from "../json-read-format";

var express = require("express");
var router = express.Router();
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();


router.get(
  "/user/all",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      var user_quantity = 0;
      var count = 0;

      const user = await prisma.users.findMany().then((data) => (count = data.length));
      user_quantity = user;;
      console.log(user);
      const allUserJson = jsonRead(user);
      if (allUserJson == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      console.log(user);
      res.json({ users: user_quantity });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/facebook-login/:uid/:username/:email/:birthdate",
  async function (req: Request, res: Response, next: NextFunction) {
    const username = req.params.username;
    const uid = req.params.uid;
    const provider = "facebook";
    const email = req.params.email;
    var user_json = JSON.parse("{}");
    var userStatus = "";
    var addUser = "";
    try {
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
            user_contact: email,
            username: username,
            facebook_id: uid,
            role_id: 1,
            birthday: null,
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
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);

router.get(
  "/google-login/:uid/:username/:email/:birthdate",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      var user_json = JSON.parse("{}");
      const username = req.params.username;
      const uid = req.params.uid;
      const provider = "google";
      const email = req.params.email;
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
            user_contact: email,
            username: username,
            google_id: uid,
            role_id: 1,
            birthday: null,
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
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);

router.get(
  "/email-login/:uid/:username/:email/:birthdate",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      var user_json = JSON.parse("{}");
      const username = req.params.username;
      const uid = req.params.uid;
      const birthdate = req.params.birthdate;
      const birthday = new Date(birthdate);
      const email = "email";
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
            user_contact: email,
            username: username,
            email_id: uid,
            role_id: 1,
            birthday: birthday,
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
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);

router.get(
  "/adminSSO-login/:uid/:username/:email/:birthdate",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      var user_json = JSON.parse("{}");
      const username = req.params.username;
      const uid = req.params.uid;
      const birthdate = req.params.birthdate;
      const birthday = new Date(birthdate);
      const email = "email";
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
            user_contact: email,
            username: username,
            email_id: uid,
            role_id: 3,
            birthday: birthday,
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
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/delete-user/:uid/:provider",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
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
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);

router.get(
  "/guest-login/",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const getID = await prisma.users.findMany({
        select: {
          id: true
        },
        orderBy: {
          id: 'desc'
        },
        take: 1
      })
      const getID_json = jsonRead(getID);
      const ID = Number(getID[0]['id']) + 1
      if (getID_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      const adduser = await prisma.users.create({
        data: {
          username: `Guest#${ID}`,
          role_id: 4,
        },
      });
      res.json({
        status: "guest Login",
        guestName: `Guest#${ID}`, guestID: ID
      });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);

router.get(
  "/doctor-login/:uid/:username/:email/:birthdate",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      var user_json = JSON.parse("{}");
      const username = req.params.username;
      const uid = req.params.uid;
      const birthdate = req.params.birthdate;

      const email = "email";
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
      }
      console.log(user);
      res.json({
        users: JSON.parse(user_json),
        userStatus: { userStatus },
        addUser: { addUser },
        provider: { provider },
        
      });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);

router.get(
  "/give-access/:role/:username/:email",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      var user_json = JSON.parse("{}");
      const username = req.params.username;
      const role:String = req.params.role;
      const email = req.params.email;

      var userStatus = "";
      var addUser = "";
      // const user = await prisma.users.findMany({
      //   where: { user_contact: email, username:username },
      // });
      if (role == '2'){
        const user = await prisma.users.updateMany({
          where:{user_contact: email},
          data:{role_id: Number(role)}
        });
        userStatus = `Add role to user ${email} to role staff`
      }
      else if (role == '3'){
        const user = await prisma.users.updateMany({
          where:{user_contact: email},
          data:{role_id: Number(role)}
        });
        userStatus = `Add role to user ${email} to role admin`
      }
      else {
        userStatus = `Any Error role couldn't update`
      }
        
      // console.log(user);
      res.json({
        users: JSON.parse(user_json),
        userStatus: { userStatus },
        addUser: { addUser },
        
        
      });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({

        error: `Update role error. ${error}`,
      });
    }
  }
);


export default router;
