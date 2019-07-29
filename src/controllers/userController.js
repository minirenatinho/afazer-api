const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

const checkAccess = require('./authController').checkAccess;

module.exports = {

    async add(req, res){
        let messages = [];
        let result = {};
        let statusCode = 500;
        const { email, password } = req.body;

        try{
            const userExist = await User.findOne({ email, isActive: true });

            if(!userExist){
                const user = await User.create({ email, password: bcrypt.hashSync(password) });

                user.password = undefined;
                result = user;

                statusCode = 200;
                messages.push('User successfully created.');
            } else {
                statusCode = 409;
                messages.push('User already exists.');
            }

            return res.status(statusCode).json({ result, messages });
        } catch (err) {
            return res.status(statusCode).json({ result: err, messages });
        }
    },
    
    async index(req, res){
        let messages = [];
        let result = {};
        let statusCode = 500;
        const { id, token } = req.headers;

        try{
            if(await checkAccess(id, token)){
                const users = await User.find({ isActive: true });
            
                messages.push(`${users.length} results`);

                users.map(user => {
                    user.password = undefined;
                    user.token = undefined;
                    return user;
                });

                result = users;

                statusCode = 200;
                messages.push('Success.');
            } else {
                statusCode = 401;
                messages.push('Unauthorized.');
            }

            return res.status(statusCode).json({ result, messages });
        } catch(err){
            return res.status(statusCode).json({ result: err, messages });
        }
    },

    async getById(req, res){
        let messages = [];
        let result = {};
        let statusCode = 500;
        const { id, token } = req.headers;
        const { targetId } = req.params;

        try{
            if(await checkAccess(id, token)){
                const user = await User.findOne({ _id: targetId, isActive: true });
                
                if(user){
                    user.password = undefined;
                    user.token = undefined;
                    
                    result = user;

                    statusCode = 200;
                    messages.push('Success.');
                } else {
                    statusCode = 404;
                    messages.push('User not found.');
                }
            } else {
                statusCode = 401;
                messages.push('Unauthorized.');
            }

            return res.status(statusCode).json({ result, messages });
        } catch(err){
            return res.status(statusCode).json({ result: err, messages });
        }
    },

    async update(req, res){
        let messages = [];
        let result = {};
        let statusCode = 500;
        const { id, token } = req.headers;
        const { targetId } = req.params;
        const { email, password } = req.body;

        try{
            if(await checkAccess(id, token)){
                const user = await User.findOne({ _id: targetId, isActive: true });
                
                if(user){
                    if(password){
                        user.password = bcrypt.hashSync(password);

                        statusCode = 200;
                        messages.push('Password successfully updated.');
                    }
                    if(email){
                        const userExist = await User.findOne({ email, isActive: true });

                        if(!userExist){
                            user.email = email;

                            statusCode = 200;
                            messages.push('E-mail successfully updated.');
                        }
                        else {
                            statusCode = 409;
                            messages.push('E-mail already exists.');
                        }
                    }

                    await user.save();

                    user.password = undefined;
                    user.token = undefined;
                    
                    result = user;

                    statusCode = 200;
                    messages.push('Success.');
                } else {
                    statusCode = 404;
                    messages.push('User not found.');
                }
            } else {
                statusCode = 401;
                messages.push('Unauthorized.');
            }

            return res.status(statusCode).json({ result, messages });
        } catch(err){
            return res.status(statusCode).json({ result: err, messages });
        }
    },

    async delete(req, res){
        let messages = [];
        let result = {};
        let statusCode = 500;
        const { id, token } = req.headers;
        const { targetId } = req.params;

        try{
            if(await checkAccess(id, token)){
                const user = await User.findOne({ _id: targetId, isActive: true });
                
                if(user){
                    user.isActive = false;

                    await user.save();

                    user.password = undefined;
                    user.token = undefined;
                    
                    result = user;

                    statusCode = 200;
                    messages.push('Success.');
                } else {
                    statusCode = 404;
                    messages.push('User not found.');
                }
            } else {
                statusCode = 401;
                messages.push('Unauthorized.');
            }

            return res.status(statusCode).json({ result, messages });
        } catch(err){
            return res.status(statusCode).json({ result: err, messages });
        }
    }

}