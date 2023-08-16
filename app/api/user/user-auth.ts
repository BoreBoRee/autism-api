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
      var time: Date;
      const user = await prisma.users
        .findMany()
        .then((data) => (count = data.length));
      time = await prisma.users
        .findMany({
          select: { created_at: true },
          orderBy: { created_at: "desc" },
          take: 1,
        })
        .then((data) => (time = data[0].created_at));
      user_quantity = user;
      console.log(user);
      const allUserJson = jsonRead(user);
      if (allUserJson == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      console.log(user);
      res.json({ users: user_quantity, time: time });
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
      const email = req.params.email;
      const provider = "email";
      var userStatus = "";
      var addUser = "";
      const id_table = await prisma.screening_comments.findMany({
        where: {},
        select: { id: true },
        orderBy: { id: "desc" },
        take: 1,
      });

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
            // id: Number(id_table[0].id) + 1,
            user_contact: email,
            username: username,
            email_id: uid,
            role_id: 5,
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
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/adminSSO-pending",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.users.findMany({
        where: { role_id: 5 },
      });
      const user_json = jsonRead(user);
      if (user_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({
        users: JSON.parse(user_json),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while Getting SSOLogin Accout. ${error}`,
      });
    }
  }
);
router.get(
  "/adminInsystem",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.users.findMany({
        where: { role_id: 2 },
      });
      const user_json = jsonRead(user);
      if (user_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({
        users: JSON.parse(user_json),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while Getting SSOLogin Doctor Accout. ${error}`,
      });
    }
  }
);
router.get(
  "/adminInsystem-1",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.users.findMany({
        where: { role_id: { in: [2, 3, 5] } },
      });
      const user_json = jsonRead(user);
      if (user_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({
        users: JSON.parse(user_json),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while Getting SSOLogin Doctor Accout. ${error}`,
      });
    }
  }
);
router.get(
  "/findUser/:user_id",
  async function (req: Request, res: Response, next: NextFunction) {
    const user_id = req.params.user_id;
    try {
      const user = await prisma.users.findMany({
        where: { role_id: { in: [2, 3, 5] }, id:Number(user_id) },
        include: {doctors:true}
      });
      const user_json = jsonRead(user);
      if (user_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({
        
        users: JSON.parse(user_json),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while Getting SSOLogin Doctor Accout. ${error}`,
      });
    }
  }
);
router.get(
  "/find-user/:email",
  async function (req: Request, res: Response, next: NextFunction) {
    const email = req.params.email;
    try {
      const user = await prisma.users.findMany({
        where: { user_contact: email },
      });
      const user_json = jsonRead(user);
      if (user_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({
        users: JSON.parse(user_json),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while Getting SSOLogin Doctor Accout. ${error}`,
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
    } catch (error) {
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
          id: true,
        },
        orderBy: {
          id: "desc",
        },
        take: 1,
      });
      const getID_json = jsonRead(getID);
      const ID = Number(getID[0]["id"]) + 1;
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
        guestName: `Guest#${ID}`,
        guestID: ID,
      });
    } catch (error) {
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

      const email = req.params.email;
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
    } catch (error) {
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
      const role: String = req.params.role;
      const email = req.params.email;

      var userStatus = "";
      var addUser = "";
      const user = await prisma.users.updateMany({
        where: { user_contact: email, username: username },
        data: { role_id: Number(role) },
      });

      res.json({
        status: "success",
        // users: JSON.parse(user_json),
        // userStatus: { userStatus },
        // addUser: { addUser },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `Update role error. ${error}`,
        status: "error",
      });
    }
  }
);

router.get(
  "/create-doctor-info/:user_id/:name/:surname/:hospital_id",
  async function (req: Request, res: Response, next: NextFunction) {
    const user_id = req.params.user_id;
    const name = req.params.name;
    const surname = req.params.surname;
    const hospital_id = req.params.hospital_id;
    try {
      const findDoctor = await prisma.doctors.findMany({
        where: { user_id: Number(user_id) },
      });
      const getID = await prisma.doctors.findMany({
        select: {
          id: true,
        },
        orderBy: {
          id: "desc",
        },
        take: 1,
      });
      const getID_json = jsonRead(getID);
      const ID = Number(getID[0]["id"]) + 1;
      // var user_json = JSON.parse("{}");
      const email = req.params.email;
      const findDoctor_json = jsonRead(findDoctor);

      console.log(findDoctor_json);
      var doctor;

      if (findDoctor_json == "[]") {
        console.log("create");
        doctor = await prisma.doctors.create({
          data: {
            id: ID,
            first_name: name,
            last_name: surname,
            hospital_id: (hospital_id != "null") ? Number(hospital_id) : null,
            user_id: Number(user_id),
          },
        });
        const user_json = jsonRead(doctor);
      } else {
        doctor = await prisma.doctors.updateMany({
          where: { user_id: Number(user_id) },
          data: {
            first_name: name,
            last_name: surname,
            hospital_id: Number(hospital_id),
          },
        });
      }

      const doctor_json = jsonRead(doctor) ?? "Error";
      res.json({
        status: "?",
        users: JSON.parse(doctor_json),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({});
    }
  }
);
router.get(
  "/get-doctor/:user_id",
  async function (req: Request, res: Response, next: NextFunction) {
    const user_id = req.params.user_id;

    try {
      const email = req.params.email;
      const doctor = await prisma.doctors
        .findFirst({
          where: { user_id: Number(user_id) },
        })
        .catch((err) => {
          err = "can't found doctor";
        });
      var doctor_json = jsonRead(doctor) ?? "Error";

      var status;
      doctor_json != null
        ? (status = "can't found doctor")
        : (status = "found doctor");
      // console.log(doctor_json);
      res.json({
        status: status,
        users: JSON.parse(doctor_json),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({});
    }
  }
);
router.get(
  "/suspend-user/:user_id/:status",
  async function (req: Request, res: Response, next: NextFunction) {
    const status = req.params.status;
    const user_id = req.params.user_id;
    const user = await prisma.users.updateMany({
      where: { id: Number(user_id) },
      data: { suspend_status: Number(status) },
    });
    var banStatus;
    Number(status) == 2
      ? (banStatus = `Ban user ${user_id} `)
      : (banStatus = `Unban user ${user_id}`);
    res.json({
      status: "success",
      users: banStatus,
    });
  }
);

export default router;
