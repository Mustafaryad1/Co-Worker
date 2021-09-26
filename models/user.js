const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // to add unique property
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true
  },
  city: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
  },
  firstname: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  },
  lastname: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  },
  avatar:{
    type:String,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "agancy", "admin"]
  },
  isactive: {
    type: Boolean,
    default: true
  },
  bio: String,
  image: String,
  hash: String,
  salt: String,
  reset_token:String,
  exp:Date,
 
}, {
  timestamps: true
});

UserSchema.plugin(uniqueValidator, {
  message: 'is already taken.'
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, keys.JWTSecret);
};

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.avatar,
    role: this.role
  };
};

// static method to login user
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({email});
  if (user) {
    const auth = await user.validPassword(password);
    console.log(password, user.hash);
    console.log(auth);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};


const User = mongoose.model('User', UserSchema, 'coWorkerUsers');

module.exports = User;
