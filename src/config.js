module.exports = {
    dev: {
        mode: 'DEVELOPMENT',
        mongodbAddress: 'mongodb://localhost:27017/afazer',
        port: process.env.PORT || 3000
    },
    prod: {
        mode: 'PRODUCTION',
        mongodbAddress: 'mongodb+srv://user_0:PhmHciCE7wrYV2i@cluster0.jy8q2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        port: process.env.PORT || 3000
    }
}