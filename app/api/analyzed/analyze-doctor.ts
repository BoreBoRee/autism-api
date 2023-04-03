import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from "../json-read-format";

const timestamp = Date.now();
var express = require("express");
var router = express.Router();
const prisma = new PrismaClient();
router.get(
  "/analyze-state/finish/:child_id",
  async function (req: Request, res: Response, next: NextFunction) {
    try{
      const child_id = req.params.child_id;
      const screening_comments = await prisma.screening_comments.findMany({
       where:{
        child_id: parseInt(child_id),
       }
        
      });
      console.log(screening_comments);
      const screening_comments_json = jsonRead(screening_comments);
      if (screening_comments_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      console.log(screening_comments.filter);
      res.json({ users: JSON.parse(screening_comments_json) });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
   
  }}
);
router.get(
  "/analyze-children/finish",
  async function (req: Request, res: Response, next: NextFunction) {
    const screening_comments = await prisma.screening_comments.findMany({
      where: {
        status: "finish",
      },
      include: {
        screenings: {
          include: {
            children: {
              include: {
                users: { select: { id: true, username: true } },
              },
            },
          },
        },
      },
    });
    console.log(screening_comments);
    const screening_comments_json = jsonRead(screening_comments);
    if (screening_comments_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(screening_comments.filter);
    res.json({ users: JSON.parse(screening_comments_json) });
  }
);
router.get(
  "/analyze-pending-list-user/:user_id",
  async function (req: Request, res: Response, next: NextFunction) {
    const user_id = req.params.user_id;
    var usernames = [];
    const screenings = await prisma.screening_comments.findMany({
      where: { status: "pending", user_id: parseInt(user_id) },
    });
    const get_chld_ID = await prisma.screening_comments.findMany({
      where: { status: "pending", user_id: parseInt(user_id) },
      // select: { child_id: true },
      include: {
        screenings: {
          include: {
            children: { select: { id: true, name: true } },
          },
        },
      },
    });
    console.log(screenings);
    const screenings_json = jsonRead(screenings);
    const child_id = jsonRead(get_chld_ID);
    if (screenings_json == undefined || child_id == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(screenings);
    res.json({
      screenings_json: JSON.parse(screenings_json),
      child_id: JSON.parse(child_id),
    });
  }
);
router.get(
  "/analyze-pending-list",
  async function (req: Request, res: Response, next: NextFunction) {
    var usernames = [];
    const screenings = await prisma.screening_comments.findMany({
      where: { status: "pending" },
    });
    console.log(screenings);
    const screenings_json = jsonRead(screenings);

    if (screenings_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(screenings);
    res.json({ screenings_json: JSON.parse(screenings_json) });
  }
);
router.get(
  "/analyze-pending",
  async function (req: Request, res: Response, next: NextFunction) {
    const user_id_only = await prisma.screening_comments.findMany({
      select: { user_id: true },
      distinct: ["user_id"],
    });
    var usernames = [];
    const username = user_id_only.map((screening_comments) =>
      user_id_only.map((screening_comments) =>
        usernames.push(screening_comments.user_id)
      )
    );
    const screenings = await prisma.screening_comments.findMany({
      where: { status: "pending" },
    });
    console.log(screenings);
    const screenings_json = jsonRead(screenings);
    const user_id_only_json = jsonRead(user_id_only);
    if (screenings_json == undefined || user_id_only_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(screenings);
    res.json({
      screenings_json: JSON.parse(screenings_json),
      userid: user_id_only_json,
    });
  }
);
router.get(
  "/analyze-children/pending",
  async function (req: Request, res: Response, next: NextFunction) {
    const user_id_only = await prisma.screening_comments.findMany({
      where: { status: "pending" },
      select: { user_id: true },
      distinct: ["user_id"],
    });
    var usernames = [];
    const screenings = await prisma.screening_comments.findMany({
      where: { status: "pending" },
      include: {
        screenings: {
          include: {
            children: {
              include: {
                users: {
                  select: { id: true, username: true, user_contact: true },
                },
              },
            },
          },
        },
      },
    });

    const screenings_json = jsonRead(screenings);
    const user_id_only_json = jsonRead(user_id_only);
    console.log(user_id_only[0].user_id);
    interface User {
      name: string;
      information: Record<string, unknown>;
    }

    const store: User = {
      name: "John",
      information: {},
    };
    var user;
    if (screenings_json == undefined || user_id_only_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }

    res.json({
      screenings_json: JSON.parse(screenings_json),
      userid: JSON.parse(user_id_only_json),
    });
  }
);

router.get(
  "/analyze-user_info/:uid",
  async function (req: Request, res: Response, next: NextFunction) {
    const user_id = req.params.uid;
    const screenings = await prisma.users.findMany({
      // select: { screening_comments: true, id: true, score: true },
      where: {
        id: Number(user_id),
      },
    });
    console.log(screenings);
    const screenings_json = jsonRead(screenings);
    if (screenings_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(screenings);
    res.json({ userData: JSON.parse(screenings_json) });
  }
);
router.get(
  "/analyze-children/:screening/:child_id/:comment",

  async function (req: Request, res: Response, next: NextFunction) {
    
    try {
      const comment = req.params.comment;
    const screening_id = req.params.screening;

    // const time = String(DateTime)
    console.log(comment);
    const highestIdComment = await prisma.screening_comments.findFirst({
      orderBy: {
        id: "desc",
      },
      select: { id: true },
    });
    console.log(highestIdComment?.id);
    const highestIdComment_json = jsonRead(highestIdComment);
    if (highestIdComment_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    if (highestIdComment_json == null) {
      return res.status(500).json({ message: "No history" });
    }

      const newComment = await prisma.screening_comments.updateMany({
        where: {
          // user_id: parseInt(screening_id),
          child_id: parseInt(req.params.child_id),
          screening_id: parseInt(screening_id),
        },
        data: {
          // id: parseInt(JSON.parse(highestIdComment_json)) + 1,
          comment: comment,
          // user_id: parseInt(screening_id),
          doctor_id: 1,
          status: "finish",
        },
      });
      res.json({ idLog: jsonRead(highestIdComment?.id), comment: `Comment complete Comment:${comment} child_id: ${req.params.child_id}` });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }

   
  }
);
// "/analyze_send/:user_id/:child_id/:score/:information",
router.get(
  "/analyze_send/:child_id/:score/:information/:user_id",
  async function (req: Request, res: Response, next: NextFunction) {
    const user_id = req.params.user_id;
    // const user_id = req.params.user_id;
    const child_id = req.params.child_id;
    const score = req.params.score;
    const information = req.params.information;

    try {
      const id_table = await prisma.screening_comments.findMany({
        where: {},
        select: { id: true },
        orderBy: { id: "desc" },
        take: 1,
      });
      const id_table_screening = await prisma.screenings.findMany({
        where: { child_id: parseInt(child_id), score: parseInt(score) },
        select: { id: true },
        orderBy: { id: "desc" },
        take: 1,
      });

      const screening_comments = await prisma.screening_comments.create({
        data: {
          id: Number(id_table[0].id) + 1,
          screening_id: Number(id_table_screening[0].id),
          // user_id: parseInt(user_id),
          information: information,
          screening_score: parseInt(score),
          doctor_id: null,
          comment: null,
          child_id: parseInt(child_id),
          user_id: parseInt(user_id),
          status: "pending",
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }

    const screening_info = `Send Child ${child_id} to doctor of this information ${information} score ${score}}`;
    console.log(screening_info);
    res.json({ screening_info: screening_info });
  }
);
//create read doctor information
router.get(
  "/analyze_doctor/:doctor_id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const doctor_id = req.params.doctor_id;
      const doctor = await prisma.doctors.findUnique({
        where: {
          id: parseInt(doctor_id),
        },
      });
      const doctor_json = jsonRead(doctor);
      if (doctor_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      console.log(doctor);
      res.json({ doctor: JSON.parse(doctor_json) });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/create-doctor/:doctor_id/:hospital_id/:name/:surname",
  async function (req: Request, res: Response, next: NextFunction) {
    const doctor_id = req.params.doctor_id;
    const hospital_id = req.params.hospital_id;
    const name = req.params.name;
    const surname = req.params.surname;
    try {
      const doctor = await prisma.doctors.create({
        data: {
          user_id: parseInt(doctor_id),
          hospital_id: parseInt(hospital_id),
          first_name: name,
          last_name: surname,
        },
      });
      const doctor_json = jsonRead(doctor);
      if (doctor_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      console.log(doctor);
      res.json({
        doctor: `create doctor ${name} ${surname} hospital ID ${hospital_id}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
//http://localhost:5000/analyze/create-doctor/1446/1/borebo/doctor
export default router;
