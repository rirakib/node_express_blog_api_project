const express = require("express")
const adminRoute = express.Router()

const categoryController = require("../controllers/admin/category.controller")
const postController = require("../controllers/admin/post.controller")




adminRoute.route("/categories")
    .get(categoryController.allCategory)
    .post(categoryController.createCategory)

adminRoute.route("/category/:id")
    .get(categoryController.getCategory)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)


adminRoute.get('/posts', postController.allPost)
adminRoute.post('/post/status/:id', postController.changeStatus)




module.exports = adminRoute