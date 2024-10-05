const Post = require("../../models/post")
const { postCreateSchema } = require("../../validatorSchema/post.schema");
const slugify = require("slugify")



exports.createPost = async (req, res) => {
    try {

        const { error } = postCreateSchema.validate(req.body,{abortEarly:false});
        if (error) {
            return res.status(400).json({ errors: error.details.map(err => err.message) });
        }

        const { title, description, user_id, category_id } = req.body;


        const slug = slugify(title, { lower: true, strict: true });


        const imagePath = req.file ? `/uploads/images/${req.file.filename}` : null;


        const newPost = new Post({
            title,
            slug,
            description,
            user_id,
            category_id,
            image: imagePath,
        });

        await newPost.save();

        return res.status(201).json({ message: 'Post created successfully', post: newPost });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}