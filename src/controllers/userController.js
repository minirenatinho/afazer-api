const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    async index(req, res){
        const users = await User.find({});
        users.map(value => {
            value.password = undefined;
            return value;
        });

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
            const { username, password } = req.headers;
            const user = await User.findOne({ username });

            if(user && user.password === password){
                const upUser = await User.findByIdAndUpdate(user.id, req.body);

                return res.json(upUser);
            }
            else {
                return res.json({ message: 'Wrong username or password.' });
            }
        } catch(err){
            return res.json(err);
        }
    },

    async del(req, res){
        try{
            const { username, password } = req.headers;
            const user = await User.findOne({ username });

            if(user && user.password === password){
                const upUser = await User.findByIdAndRemove(user.id);

                return res.json(upUser);
            }
            else {
                return res.json({ message: 'Wrong username or password.' });
            }
        } catch(err){
            return res.json(err);
        }
    }
}