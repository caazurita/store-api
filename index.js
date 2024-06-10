const express = require("express");
const routerApi = require('./routes');
const { logError, errorHandler, boomErrorHandler, errorSqlHandler } = require('./middleware/error.handler');
const app = express();
const port = 3000;
const { checkApiKey } = require('./middleware/auth.handler');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/home', checkApiKey, (req, res) => {
  res.send('Hello World from home!')
})







routerApi(app);
require('./utils/auth');
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

