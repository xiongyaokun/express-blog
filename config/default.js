module.exports = {
    port : 8000,
    session : {
        secret : 'zylblog',
        key : 'zylblog',
        maxAge : 1000 * 60 * 60 * 24
    },
    mongodb : 'mongodb://localhost:27017/zylblog1',
    rootUrl : 'http://localhost:8000'
}