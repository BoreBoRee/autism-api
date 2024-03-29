// import { Request, Response, NextFunction } from "express";
// import { PrismaClient } from "@prisma/client";
// import jsonRead from '../json-read-format';
// import * as fs from 'fs';
// import dumpfile from './dumpinformation.json';
// var express = require("express");
// var cors = require("cors");
// var app = express();
// app.use(cors());
// const prisma = new PrismaClient();

// //dump data to file
// app.get(
//     "/dump",
//     async function(req:Request, res:Response) {
//         const dumpinformation = await prisma.child_developers.findMany();
//         const dumpinformation_json = jsonRead(dumpinformation);
//         if (dumpinformation_json == undefined) {
//             return res.status(500).json({ message: "Can't prase to json" });
//         }
//         console.log(dumpinformation_json);
//         // fs.writeFileSync("./dumpinformation.json", JSON.stringify(JSON.parse(dumpinformation_json)));
//         res.json({ users: JSON.parse(dumpinformation_json) });
//     }
// );


// app.listen(5000, function () {
//     console.log("CORS-enabled web server listening on port 5000");
//   });

//   interface ArtistData {
//     id: JSON;
//     // Add any other properties here with their respective types
//   }
// // //use this to remove id, if you use an autogenerated ID
// // const artistData: ArtistData[] = JSON.parse(dumpfile).map(({ id, ...rest }) => rest);

// // // //insert data to current db
// // await prisma.child_developers.createMany({ data: artistData });
// app.get('/import-data', async (req:Request, res:Response) => {
//     const dataFilePath = JSON.parse(dumpfile).join(__dirname, 'data.json');
//     const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  
//     for (const record of data) {
//       try {
//         await prisma.child_developers.create({
//           data: {
//             // Map the record properties to the corresponding Prisma model fields
//             id: record.id
//             field1: record.property1,
//             field2: record.property2,
//             // Add more fields as necessary
//           },
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     }
  
//     res.send('Data imported successfully');
//   });