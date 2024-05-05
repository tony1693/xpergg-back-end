const express = require ('express')
const cors = require ('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const chatRouters = require ('./router/chat.router')
const friendsRouters = require ('./router/friends.router')
const newsApiRouters = require ('./router/newsApi.router')
const notificationsRouters = require ('./router/notifications.router')
const publicationsRouters = require ('./router/publications.router')
const reactionsRouters = require ('./router/reactions.router')
const threadsRouters = require ('./router/threads.router')
const userRouters = require ('./router/user.router')
const userModify = require ('./router/user.router')
const errorHandling = require('./error/xpergg.error')

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: false }));
app.use(express.json());

app.set('port', process.env.PORT || 3000)

app.use(chatRouters);
app.use(friendsRouters);
app.use(newsApiRouters);
app.use(notificationsRouters);
app.use(publicationsRouters);
app.use(reactionsRouters);
app.use(threadsRouters);
app.use(userRouters);
app.use(function(req, res, next)
{
    res.status(404).json({  error:true,
                            code: 404,
                            message:'endPoint not found'})
})

app.use(errorHandling);

module.exports = app;
