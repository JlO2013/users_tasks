const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/db');
const usersRouters = require('./routers/usersRouter')


connectDB()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouters)

const port = 8000;
app.listen(port, () => {
    console.log(`app is listening at: http://localhost:${port}`);
  });