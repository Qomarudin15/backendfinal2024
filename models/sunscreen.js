const mongoose = require('mongoose');

const sunscreenSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    required: true
  },
  harga: {
    type: Number,
    required: true
  }
}, {collection: 'cosmetic'}
);

module.exports = mongoose.model('sunscreen', sunscreenSchema);
