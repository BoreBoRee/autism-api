import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import advice_excercise from './advice-excercise';
import analyze_doctor from './analyze-doctor';
import children from './children';
import hospitals from './hospitals';
import location from './location';
import questionnaire from './questionnaire';
import user_auth from './user-auth';

var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
const prisma = new PrismaClient();
const port = 5000;

app.use('/advice', advice_excercise)
app.use('/analyze', analyze_doctor)
app.use('/children', children)
app.use('/hospitals', hospitals)
app.use('/location', location)
app.use('/questionnaire', questionnaire)
app.use('/user-auth', user_auth)

app.listen(port, function () {
    console.log(`CORS-enabled web server listening on port ${port}`);
  });
  