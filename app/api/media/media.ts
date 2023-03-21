import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jsonRead from "../json-read-format";
import path from 'path';
var express = require("express");
var router = express.Router();
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();

const mediaPath = path.join(__dirname, 'media');

router.use('/media', express.static(mediaPath));

// Your other routes and configurations...


export default router;