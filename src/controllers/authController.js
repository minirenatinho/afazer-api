const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {

    async genAccess(req, res){
        let messages = [];
        let result = {};
        let statusCode = 500;
        const { email, password } = req.headers;

        try{
            const user = await User.findOne({ email });

            if(user){
                if(await bcrypt.compare(password, user.password)){
                    user.token = uuidv4();
                    
                    await user.save();

                    user.password = undefined;
                    result = user;

                    statusCode = 200;
                    messages.push('Access successfully generated.');
                } else {
                    statusCode = 401;
                    messages.push('Unauthorized.');
                }
            } else {
                statusCode = 404;
                messages.push('User not found.');
            }

            return res.status(statusCode).json({ result, messages });
        } catch (err) {
            return res.status(statusCode).json({ result: err, messages });
        }
    },

    async checkAccess(id, token){
        let result = false;

        try{
            const user = await User.findOne({ _id: id });

            if(user && user.token === token) result = true;
        } catch (err) {
            return false;
        }

        return result;
    }

}