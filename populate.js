const {getBrands} = require('node-car-api')
const {getModels} = require('node-car-api')
var elasticsearch = require('elasticsearch')


var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


function pushToElastic(model, count) {
	client.bulk({
		body: [
			{ index:  { _index: 'cars', _type: 'car', _id: count } },
			model
		]
	}, function (err, resp) {
		console.log(err)
	});
}


module.exports = {

	startPopulate : async function() {
		var count = 0
		const brands = await getBrands();
		
		brands.forEach(async function(brand){
			const models = await getModels(brand);
			models.forEach(function(model){
				pushToElastic(model, count++)
			})
			
		})
	}


}