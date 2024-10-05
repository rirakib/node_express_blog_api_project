const express = require("express")
const { createPost } = require("../controllers/user/post.controller")
const upload = require("../middleware/upload")
const userRoute = express.Router()


userRoute.post("/post",upload.single('image'),createPost)


module.exports = userRoute