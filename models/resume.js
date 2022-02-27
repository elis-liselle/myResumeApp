// const fs = require("fs");
// const path = require("path");

// const pathToFile = path.join(
//   path.dirname(require.main.filename),
//   "data",
//   "logs.json"
// );

// module.exports = class Log {
//   constructor(log) {
//     //kasutajalt tuleb see
//     this.log = log;
//   }
//   saveLog() {
//     fs.readFile(pathToFile, (error, fileContent) => {
//       let logs = [];
//       //let logList = [];

//       if (!error) {
//         logs = JSON.parse(fileContent);
//       } else {
//         console.log(error);
//       }

//       logs.push(this);

//       fs.writeFile(pathToFile, JSON.stringify(logs), (error) => {
//         console.log("Error", error);
//       });
//     });
//   }
//   static fetchLogs(callBack) {
//     fs.readFile(pathToFile, (error, fileContent) => {
//       if (error) {
//         callBack([]);
//       }
//       callBack(JSON.parse(fileContent));
//     });
//   }
// };

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resumeSchema = new Schema({
  fullName: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  residence: {
    type: String,
  },
  schoolName: {
    type: String,
  },
  graduationDate: {
    type: Date,
  },
  technicalSkills: {
    type: String,
  },
  timeManagement: {
    type: Number,
  },
  creativeThinking: {
    type: Number,
  },
  teamwork: {
    type: Number,
  },
  image: {
    type: String,
  },
});

mongoose.model("Resume", resumeSchema);
