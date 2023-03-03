import { PrismaClient } from '@prisma/client'

import advice_excercise from './api/advice-excercise';
import analyze_doctor from './api/analyze-doctor';
import children from './api/children';
import hospitals from './api/hospitals';
import location from './api/location';
import questionnaire from './api/questionnaire';
import user_auth from './api/user-auth';
import demo from './api/add-demo-accout';
const prisma = new PrismaClient()

var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
const port = 5000;

async function main() {
    app.use('/advice', advice_excercise)
    app.use('/analyze', analyze_doctor)
    app.use('/children', children)
    app.use('/hospitals', hospitals)
    app.use('/location', location)
    app.use('/questionnaire', questionnaire)
    app.use('/user-auth', user_auth)
    app.use('/demo', demo)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  app.listen(port, function () {
    console.log(`CORS-enabled web server listening on port ${port}`);
  });
