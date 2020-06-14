const express = require('express')
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// db configuration
const dbConfig = require('./config/database.config')
const moongose = require('mongoose')

moongose.Promise = global.Promise


moongose.connect(dbConfig.url, {
  useNewUrlParser: true,
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch((err) => {
  console.log("Err occured =>", err);    
  process.exit()
})


app.get('/', (req, res) => {
  res.json({'message': 'Welcome to EasyNotes application. Take notes quickly. '})
})

require('./app/routes/note.routes')(app);

app.listen('3000', () => {
  console.log('Hi VN!!!')
})