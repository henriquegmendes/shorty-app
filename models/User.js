const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cpf: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
},
{
  timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
