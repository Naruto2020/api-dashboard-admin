const express = require("express");
const router = express.Router();

// import des fichiers 
const userController = require("../controllers/userController");

// CRUD
// add user 
router.post("/register", userController.signUp);

router.get("/", userController.getAllUsers);

router.get("/count", userController.numUsers);

router.get("/:id", userController.currentUser);

router.put("/:id", userController.editUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;