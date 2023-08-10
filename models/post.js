const mongoose = require('mongoose'); //import mongoose
const Schema = mongoose.Schema; //create schema
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }, //add timestamps to the schema for createdAt and updatedAt
);
module.exports = mongoose.model('Post', postSchema); // export the model with the name 'Post' and the schema
