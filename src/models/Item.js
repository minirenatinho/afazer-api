const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

itemSchema.plugin(mongoosePaginate);

mongoose.model('Item', itemSchema);