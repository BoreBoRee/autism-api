import { PrismaClient } from '@prisma/client'

import advice_excercise from './api/feature-location/advice-excercise';
import analyze_doctor from './api/analyzed/analyze-doctor';
import children from './api/user/children';
import hospitals from './api/feature-location/hospitals';
import location from './api/feature-location/location';
import questionnaire from './api/questionnaires/questionnaire';
import user_auth from './api/user/user-auth';

import data from './api/graph-data/graph-data';
import demo from './api/other/add-demo-accout';
import send_screening from './api/analyzed/send_screening';
import score from './api/graph-data/homepage_score';
import update from './api/user/change_information';
import media from './api/media/media';
const fileUpload = require('express-fileupload');
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
const port = 5000;
interface RequestWithFiles extends Request {
    files?: any;
}
async function main() {
    app.use('/update', update)
    app.use('/score', score)
    app.use('/send-screening', send_screening)
    app.use('/data', data)
    app.use('/advice', advice_excercise)
    app.use('/analyze', analyze_doctor)
    app.use('/children', children)
    app.use('/hospitals', hospitals)
    app.use('/location', location)
    app.use('/questionnaire', questionnaire)
    app.use('/user-auth', user_auth)
    app.use('/demo', demo)
    app.use('/media', media)
    app.use(fileUpload());
    app.post('/media_upload', (req: RequestWithFiles, res:Response)  => {
        console.log(req.files?.file);
        // if (!req.files?.file) {
        //     return res.status(500).send('No files were uploaded.');
        // }
        // let sampleFile = req.files?.file;
    })

}
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

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
