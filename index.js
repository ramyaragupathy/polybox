
var overpass = require('query-overpass');
var argv = require('yargs').argv;
var cities = require('./'+argv.json);
var geometries = ['node','way','rel'];
var bbox='poly:"';
var q_head = '[out:json];'
var q_body = '';
var q_tail = "out body;>;out skel qt;";
var wayID =[];
var nodeCount =0;
var featureID =[];



for(i=0;i < cities.features.length;i++)

{
	if(cities.features[i].properties.label==argv.city){
	process.stdout.write('Match Found!' + '\n');
    	if(cities.features[i].geometry.coordinates.length > 1){
		 
            process.stdout.write('Generating bbox...' + '\n');		
			for(j=0; j< cities.features[i].geometry.coordinates.length; j++)
			{
				
				bbox = bbox + cities.features[i].geometry.coordinates[j][1] + " " + cities.features[i].geometry.coordinates[j][0]+" ";
			

			}
			 bbox = bbox + '"';
			 
	    }
	    else{
	    	if (cities.features[i].properties.type=='exterior') {
	            for(j=0; j< cities.features[i].geometry.coordinates[0].length; j++)
				{
					
					bbox = bbox + cities.features[i].geometry.coordinates[0][j][1] + " " + cities.features[i].geometry.coordinates[0][j][0]+" ";
				

				}
			}
	    }
	    process.stdout.write('Constructing query...' + '\n');
			 geometries.forEach(function(item){
				q_body = q_body + item +"["+argv.tag+"]"+"("+bbox+")"+";";
			});
			var q = q_head+"("+q_body+");"+q_tail;
			// console.log(q);
			process.stdout.write('Executing query...' + '\n');
            overpass(q, function(err, data){


				// console.log(data.features.length);
				// console.log(JSON.stringify(data));
				
			 	for (var k = 0; k < data.features.length; k++) {
			 		// console.log(data.features[k].properties.relations.length);

			 		if(data.features[k].properties.relations.length>0)

			 		{
			 			// console.log(data.features[k].properties.relations);
			 			var relArr = data.features[k].properties.relations;
			 			relArr.forEach(function(item, index){
			 				
			 				if (featureID.indexOf(item.rel) < 0)
				 			{
					 			featureID.push(item.rel);
					 			
					 		}
							
						});

			 		}
			 		
			 		else{
			 			if(featureID.indexOf(data.features[k].properties.id)<0)
			 			{
			 				featureID.push(data.features[k].properties.id);
			 			}
			 		}
			 		
					


			 	}

			 	console.log("Count for "+argv.tag+": "+featureID.length);
			 	
			 });


	   
	   }

}


