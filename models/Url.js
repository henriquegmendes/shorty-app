const mongoose = require('mongoose');

const { Schema } = mongoose;

const urlSchema = new Schema({
  redirectUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  expirationDateMs: { type: Number, required: true },
},
{
  timestamps: true,
});

const Url = mongoose.model('url', urlSchema);

module.exports = Url;
