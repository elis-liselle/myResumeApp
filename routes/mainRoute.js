const express = require("express");
const mainController = require('../controllers/mainController');
const router = express.Router();

router.get("/", mainController.getMainPage);

router.get("/admin", mainController.getAdminPage);
router.post("/admin", mainController.postAdminPage);

router.get("/authenticate", mainController.getAuthenticatePage);
router.get("/register", mainController.getRegisterPage);
router.post("/register", mainController.postRegister);
router.get("/login", mainController.getLoginPage);
router.post("/login", mainController.postLogin);
router.get("/logout", mainController.userLogout);

module.exports = router;