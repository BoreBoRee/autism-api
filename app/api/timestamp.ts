const dateObject = new Date();

var express = require("express");
var router = express.Router();
const date = (`0 ${dateObject.getDate()}`).slice(-2);
 
// current month
const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
 
// current year
const year = dateObject.getFullYear();
 
// current hours
const hours = dateObject.getHours();
 
// current minutes
const minutes = dateObject.getMinutes();
 
// current seconds
const seconds = dateObject.getSeconds();
 
// prints date in YYYY-MM-DD format
console.log(`${year}-${month}-${date}`);
 
// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(`${hours}:${minutes}:${seconds} ${year}-${month}-${date} `);
 
// prints time in HH:MM format
console.log(`${hours}:${minutes}`);
const timestamp_export = `${hours}:${minutes}:${seconds} ${year}-${month}-${date} `
export {timestamp_export}

