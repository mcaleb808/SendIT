import express from 'express';
const app = express();
import cors from 'cors';
import router from './routes/routes';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendfile('src/index.html');
});

app.use(router);

module.exports = app;