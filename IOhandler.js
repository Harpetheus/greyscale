/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const AdmZip = require("adm-zip"),
fs = require("fs"),
PNG = require("pngjs").PNG,
path = require("path");


const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

/*
* Description: decompress file from given pathIn, write to given pathOut
*
* @param {string} pathIn
* @param {string} pathOut
* @return {promise}
*/
const unzip = (pathIn) => {
return new Promise((resolve, reject) => {
  try {
    fs.mkdir(path.join(__dirname, 'unzipped'), (err) => {
        if (err) {
            reject(err);
        }

    });
    const pathUnZip = path.dirname(pathIn)+"/unzipped";
    const zip = new AdmZip(pathIn);
    zip.extractAllTo(pathUnZip);
    resolve("Extraction operation complete");
  } catch (error) {
    reject(error);
  }
});
};

/*
* Description: read all the png files from given directory and return Promise containing array of each png file path
*
* @param {string} path
* @return {promise}
*/
const readDir = (dir) => {
return new Promise((res, rej) =>{
  fs.readdir(dir, (err, files) => {
    if (err){
      rej(err);

    }else{
       filter = files.filter((file) => path.extname(file) === ".png");
       filtered = filter.map((file) => `${pathUnzipped}\\${file}`);


       res(filtered.toString());

   }


   });


})
};




/*
* Description: Read in png file by given pathIn,
* convert to grayscale and write to given pathOut
*
* @param {string} filePath
* @param {string} pathProcessed
* @return {promise}
*/






  const grayScale = (pathIn) => {
    return new Promise ((res, rej)=>{
      try{
        const files = pathIn.split(",");
        files.forEach((filepath)=> {
    fs.createReadStream(filepath)
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on('parsed', function () {
    
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const idx = (this.width * y + x) << 2;
          const red = this.data[idx];
          const green = this.data[idx + 1];
          const blue = this.data[idx + 2];
          const alpha = this.data[idx + 3];
    
    
          const grayscale = (red + green + blue) / 3;
    
    
          this.data[idx] = grayscale;
          this.data[idx + 1] = grayscale;
          this.data[idx + 2] = grayscale;
        }
      }
      const outputFilePath = `/Users/harpe/3012/grayscaled/out${Math.floor(Math.random() * 12)}.png`;
      this.pack().pipe(fs.createWriteStream(outputFilePath));
      res("Files have been converted")
    });
  });
    }catch(error){
      rej(error)
    }  
    });
    };

module.exports = {
  unzip,
  readDir,
  grayScale
};

