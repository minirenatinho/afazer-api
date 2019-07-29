module.exports = {
    dev: {
        mode: 'DEVELOPMENT',
        mongodbAddress: 'mongodb://localhost:27017/afazer',
        port: 3000
    },
    prod: {
        mode: 'PRODUCTION',
        mongodbAddress: 'mongodb://afazeradmin:afazeradmin0@ds251598.mlab.com:51598/afazer',
        port: process.env.PORT || 3000
    }
}