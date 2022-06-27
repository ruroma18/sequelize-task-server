const express = require('express');
const { basicError } = require('./middlewares/errorHandler');

const router = require('./routers');
const app = express();

app.use(express.json());

app.use('/api', router);

app.use(basicError)

const PORT = process.env.PORST || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});