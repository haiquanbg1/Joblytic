const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  otp: { type: String, required: true },
  email: { type: String, required: true },
  expire: { type: Date }
});

// Tạo model từ schema
module.exports = mongoose.model('Otp', otpSchema);
