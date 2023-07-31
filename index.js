require('dotenv').config();
const server = require('./src/app');
const { conn } = require('./src/db');

const { PORT } = process.env;

const port = PORT || 3001;
const message = `%s listening at  ${port}`;
conn
  .sync({ alter: true })
  .then(() => {
    server.listen(port, () => {
      console.log(message);
    });
  })
  .catch((err) => {
    console.error('The next error happens on the root:', err);
  });
