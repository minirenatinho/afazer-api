const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    async index(req, res){
        const users = await User.find({});

        return res.json(users);
    },

    async get(req, res){
        const user = await User.findById(req.params.id);
        user.password = undefined;

        return res.json(user);
    },

    async getByUsername(req, res){
        const user = await User.findOne({ username: req.params.username });
        user.password = undefined;

        return res.json(user);
    },

    async add(req, res){
        try{
            const user = await User.create(req.body);

            return res.json(user);
        } catch(err){
            return res.json(err);
        }
    },

    async upd(req, res){
        try{
            const user = await User.findById(req.params.id);
            if(user.password === req.body.currentPassword){
                const user = await User.findByIdAndUpdate(req.params.id, req.body);

                return res.json(user);
            }
            else {
                return res.json({ message: 'Wrong password.' });
            }
        } catch(err){
            return res.json(err);
        }
    },

    async del(req, res){
        try{
            const user = await User.findById(req.params.id);
            if(user.password === req.body.currentPassword){
                const user = await User.findByIdAndRemove(req.params.id);

                return res.json(user);
            }
            else {
                return res.json({ message: 'Wrong password.' });
            }
        } catch(err){
            return res.json(err);
        }
    }
}