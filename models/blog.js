/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// Validate Function to check blog name length
let nameLengthChecker = (name) => {
  // Check if blog name exists
  if (!name) {
    return false; // Return error
  } else {
    // Check the length of name
    if (name.length < 2 || name.length > 20) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid name
    }
  }
};

// Validate Function to check if valid name format
let alphaNumericnameChecker = (name) => {
  // Check if name exists
  if (!name) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid name
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(name); // Return regular expression test results (true or false)
  }
};

// Array of name Validators
const nameValidators = [
  // First name Validator
  {
    validator: nameLengthChecker,
    message: 'name must be more than 2 characters but no more than 20'
  },
  // Second name Validator
  {
    validator: alphaNumericnameChecker,
    message: 'name must be alphanumeric'
  }
];

// Validate Function to check body length
let bodyLengthChecker = (body) => {
  // Check if body exists
  if (!body) {
    return false; // Return error
  } else {
    // Check length of body
    if (body.length < 5 || body.length > 500) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid body
    }
  }
};

// Array of Body validators
const bodyValidators = [
  // First Body validator
  {
    validator: bodyLengthChecker,
    message: 'Body must be more than 5 characters but no more than 500.'
  }
];

// Validate Function to check comment length
let commentLengthChecker = (comment) => {
  // Check if comment exists
  if (!comment[0]) {
    return false; // Return error
  } else {
    // Check comment length
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false; // Return error if comment length requirement is not met
    } else {
      return true; // Return comment as valid
    }
  }
};

// Array of Comment validators
const commentValidators = [
  // First comment validator
  {
    validator: commentLengthChecker,
    message: 'Comments may not exceed 200 characters.'
  }
];

// Blog Model Definition
const blogSchema = new Schema({
  name: { type: String, required: true, validate: nameValidators },
  phone: { type: String, required: true },
  time: { type: String, required: true },
  tablenumber: { type: String, required: true },
  body: { type: String, required: true, validate: bodyValidators },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: Array },
  comments: [{
    comment: { type: String, validate: commentValidators },
    commentator: { type: String }
  }]
});

// Export Module/Schema
module.exports = mongoose.model('Blog', blogSchema);
