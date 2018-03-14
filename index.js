const express = require('express')
const app = express()
var populate = require('./populate')



app.get('/populate', function (req, res) {
	populate.startPopulate()
  	res.send('Populate page')
})

app.get('/suv', function (req, res) {
  res.send('SUV page')
})

app.listen(9292, function () {
  console.log('My super app is listening on port 9292!')
})