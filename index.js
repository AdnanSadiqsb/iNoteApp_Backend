const connectToMongo=require('./db.js')
const express = require('express')

connectToMongo();
const app = express()
const port = 5000
app.use(express.json())
//avaliable routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})