const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

    title: { type: String},
    image: { type: String},
    content: {type:String},
    createdAt: {
    type: Date,
    default: Date.now
  }

})

const blogModel = mongoose.model('Blog',blogSchema);

module.exports = blogModel;