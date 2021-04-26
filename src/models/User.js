const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    contextColorMap: { type: Object },
    token: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

mongoose.model('User', userSchema);