const passport = require("passport");

const express = require("express");
const path = require("path");
const app = express();

const User = require("../models/user");
const multer = require("multer");
const Resume = require("../models/resume");
const mongoose = require("mongoose");
const ResumeFromMongoDb = mongoose.model("Resume");

exports.getMainPage = (req, res) => {
  ResumeFromMongoDb.find().then((document) => {
    let lastElement = document[document.length - 1];
    //console.log(lastElement);
    res.render("index.ejs", { myResume: lastElement });
  });
};

exports.getAuthenticatePage = (req, res) => {
  res.render("authenticate");
};

exports.getRegisterPage = (req, res) => {
  res.render("register");
};

exports.postRegister = (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    (error, user) => {
      if (error) {
        console.log(error);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.render("admin");
        });
      }
    }
  );
};

exports.getLoginPage = (req, res) => {
  res.render("login");
};

exports.postLogin = (req, res) => {
  const user = new User({
    username: req.body.username,
    passport: req.body.password,
  });

  req.login(user, (error) => {
    if (error) {
      console.log(error);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/admin");
      });
    }
  });
};

exports.getAdminPage = (req, res) => {
  if (req.isAuthenticated()) {
    User.find({ userLog: { $ne: null } }, (error, usersFound) => {
      if (error) {
        console.log(error);
      } else {
        console.log(usersFound);
        res.render("admin.ejs");
      }
    });
  } else {
    res.redirect("/authenticate");
  }
};

//setting multer
let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});

//app.post("/admin", upload.single("image"), (req, res) => {
exports.postAdminPage = (req, res) => {
  const fullName = req.body.fullName;
  const birthday = req.body.birthday;
  const residence = req.body.residence;
  const schoolName = req.body.schoolName;
  const graduationDate = req.body.graduationDate;
  const technicalSkills = req.body.technicalSkills;
  const timeManagement = req.body.timeManagement;
  const creativeThinking = req.body.creativeThinking;
  const teamwork = req.body.teamwork;
  const image = req.body.image;

  let newResume = new ResumeFromMongoDb();
  newResume.fullName = fullName;
  newResume.birthday = birthday;
  newResume.residence = residence;
  newResume.schoolName = schoolName;
  newResume.graduationDate = graduationDate;
  newResume.technicalSkills = technicalSkills;
  newResume.timeManagement = timeManagement;
  newResume.creativeThinking = creativeThinking;
  newResume.teamwork = teamwork;
  newResume.image = image;

  newResume.save((error, response) => {
    if (!error) {
      console.log(response);
      res.redirect("/");
    } else {
      console.log(error);
    }
  });
};

exports.userLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};
