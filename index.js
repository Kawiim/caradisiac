const express = require('express')
const app = express()
var elasticsearch = require('elasticsearch')

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


app.get('/populate', function (req, res) {
  res.send('Populate page')
})

app.get('/suv', function (req, res) {
  res.send('SUV page')
})

app.listen(9292, function () {
  console.log('My super app is listening on port 9292!')
})