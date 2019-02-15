const mongoose = require('mongoose');
const Item = mongoose.model('Item');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;
        const items = await Item.paginate({}, { page, limit: 10 });

        return res.json(items);
    },

    async get(req, res){
        const item = await Item.findById(req.params.id);

        return res.json(item);
    },

    async add(req, res){
        const item = await Item.create(req.body);

        return res.json(item);
    },

    async upd(req, res){
        const item = await Item.findByIdAndUpdate(req.params.id, req.body);

        return res.json(item);
    },

    async del(req, res){
        const item = await Item.findByIdAndRemove(req.params.id);

        return res.json(item);
    }
}