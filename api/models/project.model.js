const mongoose = require('mongoose');
const validations = require('../utils/validations');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: 'Project title is required',
    minlength: [3, 'Project title needs at least 3 chars']
  },
  description: {
    type: String,
    required: 'Project description is required',
    minlength: [10, 'Project description needs at least 10 chars']
  },
  authors: {
    type: [{
      type: String,
      minlength: [2, 'Project author needs al least 2 chars']
  }]},
  tags: [String],
  githubUrl: {
    type: String,
    required: 'GitHub url is required',
    validate: {
      validator: validations.isValidUrl,
      message: 'Not a valid github url'
    }
  }, 
  imageUrl: {
    type: String,
    required: 'Image url is required',
    validate: {
      validator: validations.isValidUrl,
      message: 'Not a valid url'
    }
  }
}, { 
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      }
    } 
  })

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;