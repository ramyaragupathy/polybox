var cities = require('./30cities_baseline.json');
var coord;
var bbox='';


for(i=0;i<cities.features.length;i++)

{

	if(cities.features[i].properties.label==process.argv[2])
	{
		coord = cities.features[i].geometry.coordinates;
		
		for(j=0; j< cities.features[i].geometry.coordinates.length; j++)
		{
			
			bbox = bbox + cities.features[i].geometry.coordinates[j][1] + " " + cities.features[i].geometry.coordinates[j][0]+" ";
			



		}
	}
		
}

console.log(bbox);




