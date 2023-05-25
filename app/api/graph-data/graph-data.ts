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
  "/graph-data",
  async function (req: Request, res: Response, next: NextFunction) {
    let store_answer: { [key: string]: number } = {};
    let count: number;
    try {
      for (let i = 1; i <= 20; i++) {
        const question_answer_false = await prisma.screening_details
          .findMany({
            where: { screening_question_id: i, answered: false },

            select: { answered: true },
          })
          .then((data) => (count = data.length));

        // Add the count for false answers to the store_answer object
        store_answer[`${i}_false`] = question_answer_false;

        const question_answer_true = await prisma.screening_details
          .findMany({
            where: { screening_question_id: i, answered: true },
            select: { answered: true },
          })
          .then((data) => (count = data.length));

        // Add the count for true answers to the store_answer object
        store_answer[`${i}_true`] = question_answer_true;
      }

      // const question_answer_json = jsonRead(question_answer);
      // if (question_answer_json == undefined) {
      //   return res.status(500).json({ message: "Can't prase to json" });
      // }
      res.json({ users: store_answer });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);

router.get(
  "/gender-graph-data/:gender_id",
  async function (req: Request, res: Response, next: NextFunction) {
    const gender = req.params.gender_id;
    let store_answer: { [key: string]: number } = {};
    let count: number;
    try {
      for (let i = 1; i <= 20; i++) {
        const question_answer_false = await prisma.children
          .findMany({
            where: {
              gender_id: parseInt(gender),
              screenings: {
                some: {
                  screening_details: {
                    some: { screening_question_id: i, answered: false },
                  },
                },
              },
            },
            include: {
              screenings: {
                include: {
                  screening_details: {
                    where: { answered: false, screening_question_id: 3 },
                    // select: {answered: true}
                  },
                },
              },
            },
          })
          .then((data) => (count = data.length));
        store_answer[`${i}_false`] = question_answer_false;
        const question_answer_true = await prisma.children
          .findMany({
            where: {
              gender_id: parseInt(gender),
              screenings: {
                some: {
                  screening_details: {
                    some: { screening_question_id: i, answered: true },
                  },
                },
              },
            },
            include: {
              screenings: {
                include: {
                  screening_details: {
                    where: { answered: true, screening_question_id: 3 },
                    // select: {answered: true}
                  },
                },
              },
            },
          })
          .then((data) => (count = data.length));
        store_answer[`${i}_true`] = question_answer_true;
      }

      // const question_answer_json = jsonRead(question_answer_false);
      // if (question_answer_json == undefined) {
      //   return res.status(500).json({ message: "Can't prase to json" });
      // }users: JSON.parse(question_answer_json)
      res.json({ data: store_answer });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
// create function to get gender

router.get(
  "/genders",
  async function (req: Request, res: Response, next: NextFunction) {
    const gender = req.params.gender_id;
    let store_answer: { [key: string]: number } = {};
    let count: number;
    try {
      const getGender_boy = await prisma.children
        .findMany({
          where: { gender_id: 1 },
        })
        .then((data) => (count = data.length));
      store_answer["ชาย"] = getGender_boy;
      const getGender_dauther = await prisma.children
        .findMany({
          where: { gender_id: 2 },
        })
        .then((data) => (count = data.length));
      store_answer["หญิง"] = getGender_dauther;
      const getGender_other = await prisma.children
        .findMany({
          where: { gender_id: 3 },
        })
        .then((data) => (count = data.length));
      store_answer["อื่นๆ"] = getGender_other;
      
      res.json({ data: store_answer, all_user_haveData: store_answer["ชาย"] + store_answer["หญิง"]+ store_answer["อิ่นๆ"] , all_user: store_answer["ชาย"] + store_answer["หญิง"]+ store_answer["อิ่นๆ"]  });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/data-sorting/:province_id/:gender_id/:timeStart/:timeEnd",
  async function (req: Request, res: Response, next: NextFunction) {
    var gender = Number(req.params.gender_id);
    var province = Number(req.params.province_id);
    var timeStart = req.params.timeStart;
    var timeEnd = req.params.timeEnd;
    var timeStart_sort: Date;
    var timeEnd_sort: Date;
    var gender_sort, time_sort;
    var province_sort;

    const now = new Date();
    const timeStarts = new Date(
      now.getFullYear() - 5,
      now.getMonth(),
      now.getDate() - 7
    );

    if (timeStart != "0") {
      timeStart_sort = new Date(timeStart);
    } else {
      timeStart_sort = timeStarts;
      console.log("timeEnd", timeStart_sort);
    }

    if (timeEnd != "0") {
      timeEnd_sort = new Date(timeEnd);
    } else {
      timeEnd_sort = now;
      console.log("timeEnd", timeEnd_sort);
    }

    if (province != 0) {
      province_sort = province;
      console.log("province", province_sort);
    } else {
      province_sort = {};
      console.log("province", province_sort);
    }

    if (gender != 0) {
      gender_sort = gender;
      console.log("gender", gender_sort);
    } else {
      gender_sort = {};
      console.log("gender", gender_sort);
    }

    console.log(gender, gender_sort, province, province_sort);

    let store_answer: { [key: string]: number } = {};
    let count: number;
    try {
      for (let i = 1; i <= 20; i++) {
        const question_answer_false = await prisma.screening_details
          .findMany({
            where: {
              created_at: {
                gte: timeStart_sort,
                lte: timeEnd_sort,
              },
              screenings: {
                children: {
                  province_id: province_sort,
                  gender_id: gender_sort,
                },
              },

              answered: false,
              screening_question_id: i,
            },
          })
          .then((data) => (count = data.length));
        store_answer[`${i}_false`] = question_answer_false;
        const question_answer_true = await prisma.screening_details
          .findMany({
            where: {
              created_at: {
                gte: timeStart_sort,
                lte: timeEnd_sort,
              },
              screenings: {
                children: {
                  province_id: province_sort,
                  gender_id: gender_sort,
                },
              },

              answered: true,
              screening_question_id: i,
            },
          })
          .then((data) => (count = data.length));
        store_answer[`${i}_true`] = question_answer_true;
      }

      console.log(store_answer);
      res.json({ data: store_answer });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);

router.get(
  "/questionnaire_number",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      var user_quantity = 0;
      var count = 0;
      const questionnaire_number = await prisma.screenings
        .findMany({})
        .then((data) => (count = data.length));
      user_quantity = questionnaire_number;
      res.json({ data: user_quantity });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);
router.get(
  "/age-parent",
  async function (req: Request, res: Response, next: NextFunction) {
    // สัดส่วน 2< 3> 4> 5> 6>> บุตร
    // ผปค 16-20, 21-25, 26-30, 31-35, 36-40, 41-45, 46-50 50++
    var list = new Array();
    let all: number = 0;
    let all2: number = 0;
    let store_year: { [key: string]: number } = {
      "0-16": 0,
      "16-20": 0,
      "21-25": 0,
      "26-30": 0,
      "31-35": 0,
      "36-40": 0,
      "41-45": 0,
      "46-50": 0,
      "50++": 0,
    };
    const now = new Date();
    const year_now = now.getFullYear();
    try {
      const genders = await prisma.users
        .findMany({
          select: { birthday: true },
        })
        .then((data) => list.push(data));
      const gender_json = jsonRead(genders);
      console.log();
      var count: number = 0;
      var year_cal = null;
      for (let i = 0; i < list[0].length; i++) {
        var year;
        count = count + 1;
        if (list[0][i]["birthday"] == null) {
          continue;
        }
        year = list[0][i]["birthday"].getFullYear();

        if (list[0][i]["birthday"] != null) {
          all2 = all2 + 1 || 1;
          console.log(year);
          year_cal = year_now - year;

          if (year_cal >= 0 && year_cal <= 16) {
            store_year["0-16"] = store_year["0-16"] + 1 || 1;
          } else if (year_cal >= 16 && year_cal <= 20) {
            store_year["16-20"] = store_year["16-20"] + 1 || 1;
          } else if (year_cal >= 21 && year_cal <= 25) {
            store_year["21-25"] = store_year["21-25"] + 1 || 1;
          } else if (year_cal >= 26 && year_cal <= 30) {
            store_year["26-30"] = store_year["26-30"] + 1 || 1;
          } else if (year_cal >= 31 && year_cal <= 35) {
            store_year["31-35"] = store_year["31-35"] + 1 || 1;
          } else if (year_cal >= 36 && year_cal <= 40) {
            store_year["36-40"] = store_year["36-40"] + 1 || 1;
          } else if (year_cal >= 41 && year_cal <= 45) {
            store_year["41-45"] = store_year["41-45"] + 1 || 1;
          } else if (year_cal >= 46 && year_cal <= 50) {
            store_year["46-50"] = store_year["46-50"] + 1 || 1;
          } else if (year_cal >= 50) {
            store_year["50++"] = store_year["50++"] + 1 || 1;
          }
        }
      }
      all = count;

      if (gender_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ data: store_year, all_user_haveData: all, all_user: all2 });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);

router.get(
  "/age-children",
  async function (req: Request, res: Response, next: NextFunction) {
    // สัดส่วน 2< 3> 4> 5> 6>> บุตร
    var list = new Array();
    let store_year: { [key: string]: number } = {
      "0-2": 0,
      "2-3": 0,
      "3-4": 0,
      "4-5": 0,
      "5-6": 0,
      "6++": 0,
    };
    let all: number = 0;
    let all2: number = 0;
    const now = new Date();
    const year_now = now.getFullYear();
    try {
      const genders = await prisma.children
        .findMany({
          select: { birthday: true },
        })
        .then((data) => list.push(data));
      const gender_json = jsonRead(genders);
      console.log();
      var count: number = 0;
      var year_cal = null;
      for (let i = 0; i < list[0].length; i++) {
        var year;
        count = count + 1;
        if (list[0][i]["birthday"] == null) {
          continue;
        }
        year = list[0][i]["birthday"].getFullYear();

        if (list[0][i]["birthday"] != null) {
          all2 = all2 + 1 || 1;
          console.log(year);
          year_cal = year_now - year;

          if (year_cal >= 0 && year_cal <= 2) {
            store_year["0-2"] = store_year["0-2"] + 1 || 1;
          } else if (year_cal >= 2 && year_cal <= 3) {
            store_year["2-3"] = store_year["2-3"] + 1 || 1;
          }
          if (year_cal >= 3 && year_cal <= 4) {
            store_year["3-4"] = store_year["3-4"] + 1 || 1;
          }
          if (year_cal >= 4 && year_cal <= 5) {
            store_year["4-5"] = store_year["4-5"] + 1 || 1;
          }
          if (year_cal >= 5 && year_cal <= 6) {
            store_year["5-6"] = store_year["5-6"] + 1 || 1;
          }
          if (year_cal >= 6) {
            store_year["6++"] = store_year["6++"] + 1 || 1;
          }
        }
      }
      all = count;

      if (gender_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ data: store_year, all_user_haveData: all, all_user: all2 });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
  }
);

export default router;
