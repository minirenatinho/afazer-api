const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

mongoose.model('User', userSchema);