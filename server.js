require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 3000
const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DB
})

db.connect()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.post('/record', (req, res) => {
  db.query('insert into record set ?', req.body, (err, data) => {
    if (err) throw err
    res.send(data)
  })
})

app.put('/record', (req, res) => {
  db.query(
    'update record set ? where id = ?',
    [req.body.data, req.body.id],
    (err, data) => {
      if (err) throw err
      res.end()
    }
  )
})

app.get('/record', (req, res) => {
  db.query('select * from record', (err, data) => {
    if (err) throw err
    res.send(data)
  })
})

app.delete('/record', (req, res) => {
  db.query('delete from record', (err, data) => {
    if (err) throw err
    res.end()
  })
})

app.listen(port, () => console.log(`\nlistening on port ${port}`))
