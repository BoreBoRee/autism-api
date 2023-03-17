import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from './json-read-format';

var express = require("express");
var router = express.Router();
const prisma = new PrismaClient();

router.get(
    "/categories",
    async function (req: Request, res: Response, next: NextFunction) {
      
      try{
        const suggestion_categories = await prisma.suggestion_categories.findMany();
        console.log(suggestion_categories);
        const suggestion_categories_json = jsonRead(suggestion_categories);
        if (suggestion_categories_json == undefined) {
          return res.status(500).json({ message: "Can't prase to json" });
        }
        res.json({ categories: JSON.parse(suggestion_categories_json) });
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
    "/content",
    async function (req: Request, res: Response, next: NextFunction) {
      try{
      const suggestion_details = await prisma.suggestion_details.findMany();
      console.log(suggestion_details);
      const suggestion_details_json = jsonRead(suggestion_details);
      if (suggestion_details_json == undefined) {
        return res.status(500).json({ message: "Can't prase to json" });
      }
      res.json({ content: JSON.parse(suggestion_details_json) });
    }  catch (error) {
      console.log(error);
      res.status(500).json({
        
        error: `An error occurred while creating the screening comment. ${error}`,
      });
    }
    
  });
export default router;