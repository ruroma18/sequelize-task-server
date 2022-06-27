const express = require('express');

const router = require('./routers');
const app = express();

app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORST || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});