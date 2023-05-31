const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const {readDir, unzip, grayScale} = require("./IOhandler.js");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");



unzip("/Users/harpe/3012/myfile.zip")
.then((data) => console.log(data))
.then(() => readDir(pathUnzipped))
.then((data) => grayScale(data))
.catch((err)=> console.log(err));