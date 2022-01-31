function parseCsv(csv){
  var table_total = '';

  var rows=csv.split('\n');

  //Header
  var cols_header = rows[0].split(',');
  var table_header = '<tr>'

  for (var k = 0; k < cols_header.length ; k++){
    table_header += '<td>'+cols_header[k]+'</td>'
  }

  table_header += '</tr>';
  $('#mainheader').html(table_header);


  //Data
  for (var i = 1; i < rows.length ; i++){
  	var table_current = '<tr>'
  	var cols = rows[i].split(',');

    //Col
  	for (var j = 0; j < cols.length ; j++){
  		
		//Avatar picture
      if(j == 0){
        table_current += "<td class='picture "+cols[j]+"'><img style='height:75px; width:75px;' src='characters_img/"+cols[j]+".png'></td>"
      } else if (j == 1) {
        //Add link to img for the JP name [NOT WORKING YET]
        table_current += "<td class='character_picture' id='"+cols[0]+"'>"+cols[j]+"</td>"
      } else if (j == 2) {
        //Icon for Type
        table_current += "<td class='type_icon "+cols[j]+"'><img src='icon/"+cols[j]+".png'>   "+cols[j]+"</td>"
      } else if (j == 3) {
        //Icon for Attribut
        table_current += "<td class='attribut_icon "+cols[j]+"'><img src='icon/"+cols[j]+".png'>   "+cols[j]+"</td>"
      } else if (j == 4 || j == 5 || j == 6 || j == 7) {
        //Icon for Attribut
        table_current += "<td class='normal_attack'>"+cols[j]+"</td>"
      } else if (j == 8 || j == 9 || j == 10 || j == 11 || j == 12) {
        //Icon for Attribut
        table_current += "<td class='skill_attack'>"+cols[j]+"</td>"
      } else if (j == 13 || j == 14 || j == 15 || j == 16 || j == 17) {
        //Icon for Attribut
        table_current += "<td class='special_attack'>"+cols[j]+"</td>"
      }
	  
	  else {
        table_current += "<td>"+cols[j]+"</td>"
      }

  	}

  	table_total += table_current+'</tr>'
  }

  //Final table with all data
  $('#maintable').html(table_total);

  //Datatable
  $('#table_id').DataTable({
    "scrollX": true,
	"autoWidth": true,
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
  			url: "characters.csv",
  			dataType: "text",
  			success: parseCsv
			});
})