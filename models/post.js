const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /\.(jpg|jpeg|png|gif)$/i.test(v);
            },
            message: props => `${props.value} is not a valid image format!`
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
