import express from 'express';
const app = express();
import router from './routes/routes';
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

app.get('/', (req, res) => {
  res.sendfile('src/index.html');
});

app.use(router);

module.exports = app;