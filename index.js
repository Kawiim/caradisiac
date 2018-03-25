const express = require('express')
const app = express()
var populate = require('./populate')

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
  });


app.get('/populate', function (req, res) {
	populate.startPopulate()
  	res.send('Populate page')
})

app.get('/suv', function (req, res) {
	let results = []
    client.search({
        index: 'cars',
        type: 'car',
        body: {
            query: {
               match_all: {},
            },
            sort: {
                "volume.keyword": {
                    order: "desc"
                }
            }
        }
      }).then(function (res) {
            res.hits.hits.forEach(model => {
                results.push(model['_source']);
          });
      }, function (err) {
        console.trace(err.message);
      }).then(() => {
        res.json(results);
      });
})


app.listen(9292, function () {
  console.log('My super app is listening on port 9292!')
})