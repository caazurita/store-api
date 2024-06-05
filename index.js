const express = require("express");
const routerApi = require('./routes');
const { logError, errorHandler, boomErrorHandler, errorSqlHandler } = require('./middleware/error.handler');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/home', (req, res) => {
  res.send('Hello World from home!')
})







routerApi(app);

app.use(logError);
app.use(errorSqlHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


try {
  app.listen(port, () => {
    console.log('port running on ' + 'http://127.0.0.1:' + port)
  });


} catch (error) {
  console.log(error);
}

