var argv = require('minimist')(process.argv.slice(2));
var cities = require('./'+argv.json);
 var coord;
 var bbox='';
 
 
 for(i=0;i<cities.features.length;i++)
 
 {
       
 		if (cities.features[i].geometry.type="Polygon")

 		{
 			
 		for(j=0; j< cities.features[i].geometry.coordinates[0].length; j++)
 		{
 			
 			bbox = bbox  + cities.features[i].geometry.coordinates[0][j][1] + " " +
 			       cities.features[i].geometry.coordinates[0][j][0]+" ";
 			
 
 
 
 		}
 	}
 	
 		
 }
 
 console.log(bbox);