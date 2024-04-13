const app = require('./app');

app.listen(app.get('port'),() => {
    console.log(`La api se está ejecutando en el puerto: ${app.get('port')}`);
})