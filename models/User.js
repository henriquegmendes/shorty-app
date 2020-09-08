const mongoose = require('mongoose');
const shortid = require('shortid');

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cpf: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
  imageAvatar: { type: String, default: 'https://res.cloudinary.com/dobzwgcvl/image/upload/v1599596161/shorty-app/default-avatar.jpg' },
},
{
  timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
