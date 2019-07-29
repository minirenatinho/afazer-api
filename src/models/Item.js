const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const itemSchema = new mongoose.Schema({
    email: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

itemSchema.plugin(mongoosePaginate);

mongoose.model('Item', itemSchema);