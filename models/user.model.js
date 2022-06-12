const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // name:String
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others']
  },
  dob: {
    type: Date
  },
  isMarried: {
    type: Boolean
  },
  nationality: {
    type: String,
    default: 'nepali'
  },
  phoneNumber: {
    type: Number
  },
  address: {
    temporaryAddress: [String],
    permanentAddress: {
      type: String
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  role: {
    type: Number, // 1 for admin, 2 for normal user
    default: 2
  },
  image: String
}, {
  timestamps: true
})

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;