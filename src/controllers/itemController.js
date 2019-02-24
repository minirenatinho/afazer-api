const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const User = mongoose.model('User');

module.exports = {
    async index(req, res){
        const { username, password } = req.headers;
        const user = await User.findOne({ username });

        if(user && password === user.password){
            const { page = 1 } = req.query;
            const items = await Item.paginate({ username }, { page, limit: 10 });

            return res.json(items);
        }
        else {
            return res.json({ message: 'Not authorized.' });
        }
    },

    async get(req, res){
        const { username, password } = req.headers;
        const user = await User.findOne({ username });

        if(user && password === user.password){
            const item = await Item.findById(req.params.id);

            return res.json(item);
        }
        else {
            return res.json({ message: 'Not authorized.' });
        }
    },

    async add(req, res){
        const { username, password } = req.headers;
        const user = await User.findOne({ username });

        //add username from header
        req.body.username = username;

        if(user && password === user.password){
            const item = await Item.create(req.body);

            return res.json(item);
        }
        else {
            return res.json({ message: 'Not authorized.' });
        }
    },

    async upd(req, res){
        const { username, password } = req.headers;
        const user = await User.findOne({ username });

        if(user && password === user.password){
            const item = await Item.findByIdAndUpdate(req.params.id, req.body);

            return res.json(item);
        }
        else {
            return res.json({ message: 'Not authorized.' });
        }
    },

    async del(req, res){
        const { username, password } = req.headers;
        const user = await User.findOne({ username });

        if(user && password === user.password){
            const item = await Item.findByIdAndRemove(req.params.id);

            return res.json(item);
        }
        else {
            return res.json({ message: 'Not authorized.' });
        }
    }
}