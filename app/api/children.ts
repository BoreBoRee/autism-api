import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from "./json-read-format";

var express = require("express");
var router = express.Router();
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();

// current date
// adjust 0 before single digit date

router.get(
  "/childe/:userId",
  async function (req: Request, res: Response, next: NextFunction) {
    const user_id = req.params.userId;
    const children = await prisma.children.findMany({
      where: {
        user_id: parseInt(user_id),
      },
    });
    const children_json = jsonRead(children);
    if (children_json == undefined) {
      return res.status(500).json({ message: "Can't prase to json" });
    }
    console.log(children_json);
    res.json({ children: JSON.parse(children_json) });
  }
);

router.get(
  "/add-child/:name/:uid/:birthday/:address/:province/:district/:sub_district/:zip_code/:image/:gender_id/:total_child/:number_child/",
  async function (req: Request, res: Response, next: NextFunction) {
    const comment = req.params.comment;
    const child_name = req.params.name;
    const uid = req.params.uid;
    const birthday = req.params.birthday;
    const address = req.params.address;
    const province = req.params.province;
    const district = req.params.district;
    const sub_district = req.params.sub_district;
    const zip_code = req.params.zip_code;
    const image = req.params.image;
    const gender_id = req.params.gender_id;
    const total_child = req.params.total_child;
    const number_child = req.params.number_child;
    const screening_id = req.params.uid;

    // const time = String(DateTime)
    console.log(comment);
    

    try {
      const newComment = await prisma.children.create({
        data: {
          name: child_name,
          birthday: birthday,
          address: address,
          province_id: parseInt(province),
          district_id: parseInt(district),
          sub_district_id: parseInt(sub_district),
          zip_code: parseInt(zip_code),
          image_file_name: image,
          image_content_type: image,
          image_file_size: 0,
          user_id: parseInt(uid),
          gender_id: parseInt(gender_id),
          total_child: parseInt(total_child),
          number_child: parseInt(number_child),
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while creating the screening comment.",
      });
    }
    const get_chld_ID = await prisma.children.findMany({
      where:{
        name:child_name
      },
      select:{
        id: true
      },
      orderBy:{
        id:'desc'
      },
      take:1
    })
    const only_id = get_chld_ID[0].id

    res.json({ Status: `Add child success information`, child_id:only_id});
  }
);
router.get(
  "/add-child-info/:id/:child_id/:pregnancy/:birth_delay/:birth_category/:birth_after_effect/:weight/:health/:pregnancy_description/:birth_delay_description/:birth_after_effect_description/:health_description/:birth_category_description/:p_health",
  async function (req: Request, res: Response, next: NextFunction) {
    // create parameter from the api route
    const id = req.params.id;
    const child_id = req.params.child_id;
    const pregnancy = String(req.params.pregnancy);
    const birth_delay = req.params.birth_delay;
    const birth_category = req.params.birth_category;
    const birth_after_effect = req.params.birth_after_effect;
    const weight = req.params.weight;
    const health = req.params.health;
    const pregnancy_description = req.params.pregnancy_description;
    const birth_delay_description = req.params.birth_delay_description;
    const birth_after_effect_description =
      req.params.birth_after_effect_description;
    const health_description = req.params.health_description;
    const birth_category_description = req.params.birth_category_description;
    const p_health = req.params.p_health;


    try {
      const newComment = await prisma.child_pregnancies.create({
        data: {
          // change the data base on parameter
          pregnancy: pregnancy,
          birth_delay: birth_delay,
          birth_category: birth_category,
          birth_after_effect: birth_after_effect,
          weight: weight,
          health: health,
          pregnancy_description: pregnancy_description,
          birth_delay_description: birth_delay_description,
          birth_after_effect_description: birth_after_effect_description,
          health_description: health_description,
          birth_category_description: birth_category_description,
          p_health: p_health,
          child_id: parseInt(child_id),
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while creating the screening comment.",
      });
    }

    res.json({ Status: `Add child success information` });
  }
);
// create function to post data to database of child_developers
router.get(
  "/childe-developer/:id/:child_id/:eat/:sleep/:urine/:feces/:toilet_problem/:toilet_problem_description/:p_eat/:eat_description/:p_sleep/:sleep_description/:p_urine/:urine_description/:p_feces/:feces_description/:p_toilet_problem",
  async function (req: Request, res: Response, next: NextFunction) {
    // create parameter from the api route
    const id = req.params.id;
    const child_id = req.params.child_id;
    const eat = req.params.eat;
    const sleep = req.params.sleep;
    const urine = req.params.urine;
    const feces = req.params.feces;
    const toilet_problem = req.params.toilet_problem;
    const toilet_problem_description = req.params.toilet_problem_description;
    const p_eat = req.params.p_eat;
    const eat_description = req.params.eat_description;
    const p_sleep = req.params.p_sleep;
    const sleep_description = req.params.sleep_description;
    const p_urine = req.params.p_urine;
    const urine_description = req.params.urine_description;
    const p_feces = req.params.p_feces;
    const feces_description = req.params.feces_description;
    const p_toilet_problem = req.params.p_toilet_problem;
    // const time = String(DateTime)
    try {
      const newComment = await prisma.child_developers.create({
        data: {
          // change the data base on parameter
          eat: eat,
          sleep: sleep,
          urine: urine,
          feces: feces,
          toilet_problem: toilet_problem,
          toilet_problem_description: toilet_problem_description,
          p_eat: p_eat,
          eat_description: eat_description,
          p_sleep: p_sleep,
          sleep_description: sleep_description,
          p_urine: p_urine,
          urine_description: urine_description,
          p_feces: p_feces,
          feces_description: feces_description,
          p_toilet_problem: p_toilet_problem,
          child_id: parseInt(child_id),
          id: parseInt(id),
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while creating the screening comment.",
      });
    }
  }
);

export default router;
