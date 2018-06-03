var permData;

d3.json("dataPart.json", function(error, data){
	permData = data;
	tabulate(data, ['datetime','city','state','country','shape','durationMinutes','comments']);
	})

function tabulate(data, columns) {
	var table = d3.select('#table-area').append('table').attr("id","sightings")
	var thead = table.append('thead').attr("id","mythead")
	var tbody = table.append('tbody').attr("id","mytbody");
	
	var titles = ["Date", "City", "State", "Country", "Shape","Duration","Comments" ];
	// append the header row
	thead.append('tr')
	.selectAll('th')
	.data(titles).enter()
	.append('th')
	.text(function (titles) { return titles; });

	// create a row for each object in the data
	var rows = tbody.selectAll('tr')
	.data(data)
	.enter()
	.append('tr').attr("id","mydatarow");

	// create a cell in each row for each column
	var cells = rows.selectAll('td')
		.data(function (row) {
			return columns.map(function (column) {
			return {column: column, value: row[column]};
			});
		})
		.enter()
		.append('td')
		.text(function (d) { return d.value; });
	return table;
}

$(document).ready(function() {
    $('#sightings').DataTable( { 
		"pagingType": "full_numbers",
		"pageLength": 25,
        "searching": false,
		"paging": true,
		"lengthMenu": [10, 25, 50, 75, 100],
        "info": true,         
        "lengthChange":true 
    } );
} );

d3.selectAll("#search_sightings").on("click", function(){
	// define search variables
	var date = d3.select("#date-input").node().value;
	var city = d3.select("#city-input").node().value;
	var state = d3.select("#state-input").node().value;
	var country = d3.select("#country-input").node().value;
	var shape = d3.select("#shape-input").node().value;
	// reset table output
	d3.select('#table-area').html("");
	
	$(document).ready(function() {
		$('#sightings').DataTable( {     
			"pagingType": "full_numbers",
			"pageLength": 25,   
 			"searching": false,
			"paging": true,
			"lengthMenu": [10, 25, 50, 75, 100], 
			"info": true,         
			"lengthChange":true 
		} );
	} );

	var filterdata = permData;

	// apply filter based on search criteria
	if(date != ""){
			filterdata = filterdata.filter(function(data){
			return data.datetime == date;
			});
		} 
	if(city != ""){
			filterdata = filterdata.filter(function(data){
			return data.city == city.toLowerCase();
			});
		} 
	if(state != ""){
			filterdata = filterdata.filter(function(data){
			return data.state == state.toLowerCase();
			});	
		} 
	if(country != ""){
			filterdata = filterdata.filter(function(data){
			return data.country == country.toLowerCase();
			});	
		} 
	if(shape != ""){
			filterdata = filterdata.filter(function(data){
			return data.shape == shape.toLowerCase();
			});	
	
	$(document).ready(function() {
		$('#sightings').filterdata( { 
				"pagingType": "full_numbers",
				"pageLength": 25, 
				"lengthMenu": [10, 25, 50, 75, 100],    
    			"searching": false,
				"paging": true, 
				"info": true,         
				"lengthChange":true 
		} );
	 } );
}

	//console.log("Filtered total is " + filterdata.length)
		tabulate(filterdata, ['datetime','city','state','country','shape','durationMinutes','comments']);

})

d3.selectAll("#reset").on("click", function(){
	d3.select("#date-input").node().value ="";
	d3.select("#city-input").node().value ="";
	d3.select("#state-input").node().value ="";
	d3.select("#country-input").node().value ="";
	d3.select("#shape-input").node().value ="";
	// reset table output
	d3.select('#table-area').html("");

	$(document).ready(function() {
		$('#sightings').DataTable( { 
				"pagingType": "full_numbers",
				"pageLength": 25,  
				"lengthMenu": [10, 25, 50, 75, 100],   
    			"searching": false,
				"paging": true, 
				"info": true,         
				"lengthChange":true 
		} );
	 } );

	tabulate(permData, ['datetime','city','state','country','shape','durationMinutes','comments']);

})