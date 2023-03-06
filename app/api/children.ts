import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from './json-read-format';

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
        res
          .status(500)
          .json({
            error: "An error occurred while creating the screening comment.",
          });
      }

      res.json({ Status: `Add child success information`,  });

    }
  );
  export default router;