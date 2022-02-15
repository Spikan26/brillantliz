function parseCsv(csv){
  var table_total = '';

  var rows=csv.split('\n');

  //Header
  var cols_header = rows[0].split(',');
  var table_header = '<thead><tr>'

  for (var k = 0; k < cols_header.length ; k++){
    table_header += '<td>'+cols_header[k]+'</td>'
  }

  table_header += '</tr></thead><tbody>';

  //Data
  for (var i = 1; i < rows.length ; i++){
  	var table_current = '<tr>'
  	var cols = rows[i].split(',');

    //Col
  	for (var j = 0; j < cols.length ; j++){
  		
		//Avatar picture
      if(j == 0){
        table_current += "<td class='picture "+cols[j]+"'><img style='height:75px; width:75px;' src='icon/"+cols[j]+".png'></td>"
      } else {
        table_current += "<td>"+cols[j]+"</td>"
      }

  	}

  	table_total += table_current+'</tr>'
  }

  table_total += '</tbody>'
  
  //Final table with all data
  $('#asterisk_dataTable').html(table_header + table_total);

  //Datatable
  $('#asterisk_dataTable').DataTable({
    "scrollX": true,
	"autoWidth": false,
	"columnDefs": [
      { "width": "200px", "targets": 7 },
      { "width": "200px", "targets": 11 },
      { "width": "200px", "targets": 16 }
    ]
  });


  $('.character_picture').click(function(event){
    var path = "<img src='characters_img/"+event.currentTarget.id+".png'>";
    $('.modal-body').html(path);
    $('#myModal').modal('show');
  });

}


$(document).ready( function () {

	//Get the data from the file
		$.ajax({
  			type: "GET",
  			url: "csv/job_asterisk.csv",
  			dataType: "text",
  			success: parseCsv
			});
})