const express = require("express");
const handleSignUp = require("../controllers/userController/handleSignUp");
const handleSignIn = require("../controllers/userController/handleSignIn");
const handleFetchUser = require("../controllers/userController/handleFetchUser");
const checkAuth = require("../middlewares/checkAuth");
const handleUpdateUser = require("../controllers/userController/handleUserUpdate");

const UserRouter = express.Router();

UserRouter.post("/signUp", handleSignUp);
UserRouter.post("/signIn", handleSignIn);
UserRouter.get("/fetchUser", checkAuth, handleFetchUser);
UserRouter.patch("/updateUser", checkAuth, handleUpdateUser);

module.exports = UserRouter;
