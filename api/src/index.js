const express = require('express')
const mysql = require('mysql')

const app = express()

var teste = 'haha'

const connection = mysql.createConnection({
  host: 'mysql-container',
  user: 'root',
  port: 3306,
  password: 'pass123',
  database: 'arthurdocker'
})

connection.connect(function (err) {
  if (err) {
    teste = err.message
    console.log('Connected to the MySQL server.')
    return console.error('error: ' + err.message)
  }

  console.log('Connected to the MySQL server.')
})

app.get('/products', function (req, res) {
  connection.query('SELECT * FROM products', function (error, results) {
    if (error) {
      throw error
    }

    res.send(results.map(item => ({ name: item.name, price: item.price })))
  })
})

app.listen(9001, '0.0.0.0', function () {
  console.log('Listening on port 9001')
})
