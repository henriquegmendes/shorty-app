const mongoose = require('mongoose');
const shortid = require('shortid');

const { Schema } = mongoose;

const urlSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  redirectUrl: { type: String, required: true },
  expirationDateMs: { type: Number, required: true },
},
{
  timestamps: true,
});

const Url = mongoose.model('url', urlSchema);

module.exports = Url;
