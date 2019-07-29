const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const User = mongoose.model('User');

const checkAccess = require('./authController').checkAccess;

module.exports = {

    async add(req, res){
        let messages = [];
        let result = {};
        let statusCode = 500;
        const { id, token } = req.headers;
        const { title, description } = req.body;

        try{
            if(await checkAccess(id, token)){
                const itemExist = await Item.findOne({ title, isActive: true });

                if(!itemExist){
                    const user = await User.findOne({ _id: id, isActive: true });

                    if(user){
                        const item = await Item.create({ email: user.email, title, description });

                        result = item;

                        statusCode = 200;
                        messages.push('Item successfully created.');
                    }
                    else {
                        statusCode = 404;
                        messages.push('E-mail with no associated users.');
                    }
                } else {
                    statusCode = 409;
                    messages.push('Item already exists.');
                }
            } else {
                statusCode = 401;
                messages.push('Unauthorized.');
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
                const items = await Item.find({ isActive: true });
            
                messages.push(`${items.length} results`);

                result = items;

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
                const item = await Item.findOne({ _id: targetId, isActive: true });
                
                if(item){
                    result = item;

                    statusCode = 200;
                    messages.push('Success.');
                } else {
                    statusCode = 404;
                    messages.push('Item not found.');
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
        const { email, title, description } = req.body;

        try{
            if(await checkAccess(id, token)){
                const item = await Item.findOne({ _id: targetId, isActive: true });
                
                if(item){
                    if(email){
                        const userExist = await User.findOne({ email, isActive: true });

                        if(userExist){
                            item.email = email;

                            statusCode = 200;
                            messages.push('E-mail successfully updated.');
                        }
                        else {
                            statusCode = 404;
                            messages.push('E-mail with no associated users.');
                        }
                    }
                    if(title){
                        item.title = title;

                        statusCode = 200;
                        messages.push('Title successfully updated.');
                    }
                    if(description){
                        item.description = description;

                        statusCode = 200;
                        messages.push('Description successfully updated.');
                    }

                    await item.save();
                    
                    result = item;

                    statusCode = 200;
                    messages.push('Success.');
                } else {
                    statusCode = 404;
                    messages.push('Item not found.');
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
                const item = await Item.findOne({ _id: targetId, isActive: true });
                
                if(item){
                    item.isActive = false;

                    await item.save();
                    
                    result = item;

                    statusCode = 200;
                    messages.push('Success.');
                } else {
                    statusCode = 404;
                    messages.push('Item not found.');
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