const passport = require("passport");
const User = require("../models/user");

const Resume = require("../models/resume");
let resumeList = [];

exports.getMainPage = (req, res) => {
  res.render("index");
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
        // var logTime = new Date().toUTCString();
        // let newLog = new Resume(logTime);
        // newLog.saveLog();

        // Log.fetchLogs((resume) => {
        //   console.log(resume);
          res.render("admin.ejs"); //, { myResume: resume });
        // });
      }
    });
  } else {
    res.redirect("/authenticate");
  }
};

exports.userLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};
