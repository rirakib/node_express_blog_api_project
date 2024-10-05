const Category = require("../../models/category.js")
const { createCategoryValidateSchema } = require("../../validatorSchema/category.schema.js")

exports.allCategory = async (req, res) => {
    try {

        const categories = await Category.find({})
        return res.status(200).json({ data: categories })

    } catch (error) {
        return res.status(500).json({ message: err.message })
    }

}

exports.createCategory = async (req, res) => {
    try {

        const {error} = createCategoryValidateSchema.validate(req.body,{ abortEarly:false})

        if(error){
            return res.status(400).json({message: error.details.map(err => err.message)})
        }
        const title = req.body.title

        const cat = new Category({
            title: title
        })


        let createdData = await cat.save()


        return res.status(201).json({ data: createdData, message: "Category created successfull" })


    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.getCategory = async (req, res) => {

    try {

        const id = req.params.id;
        const category = await Category.findById(id); 

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ data: category });

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

exports.updateCategory = async (req, res) => {
    
}

exports.deleteCategory = async (req, res) => {

}