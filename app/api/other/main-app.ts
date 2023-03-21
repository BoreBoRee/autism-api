
import { PrismaClient } from "@prisma/client";
import advice_excercise from '../feature-location/advice-excercise';
import analyze_doctor from '../analyzed/analyze-doctor';
import children from '../user/children';
import hospitals from '../feature-location/hospitals';
import location from '../feature-location/location';
import questionnaire from '../questionnaires/questionnaire';
import user_auth from '../user/user-auth';

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
  