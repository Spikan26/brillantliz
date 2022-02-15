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
        table_current += "<td class='picture "+cols[j]+"'><img style='height:75px; width:75px;' src='characters_img/"+cols[j]+".png'></td>"
      } else if (j == 1) {
        //Add link to img for the JP name [NOT WORKING YET]
        table_current += "<td class='character_picture' id='"+cols[0]+"'>"+cols[j]+"</td>"
      } else if (j == 2) {
        //Icon for Type
        table_current += "<td class='type_icon "+cols[j]+"'><img style='width: 50px;' src='icon/"+cols[j]+".png'>   "+cols[j]+"</td>"
      } else if (j == 3) {
        //Icon for Attribut
        table_current += "<td class='attribut_icon "+cols[j]+"'><img style='width: 50px;'src='icon/"+cols[j]+".png'>   "+cols[j]+"</td>"
      } else if (j == 4) {
        //Weapon image
        table_current += "<td class='weapon_img "+cols[j]+"'><img style='height:75px; width:75px;' src='characters_weapon/"+cols[j]+".png'></td>"
      } else if (j == 8) {
        //Artifact 1
        table_current += "<td class='artifact1_img "+cols[j]+"'><img style='height:75px; width:75px;' src='characters_artefact/"+cols[j]+".png'></td>"
      } else if (j == 10) {
        //Artifact 2
        table_current += "<td class='artifact2_img "+cols[j]+"'><img style='height:75px; width:75px;' src='characters_artefact/"+cols[j]+".png'></td>"
      } else if (j == 12) {
        //Artifact 3
        table_current += "<td class='artifact3_img "+cols[j]+"'><img style='height:75px; width:75px;' src='characters_artefact/"+cols[j]+".png'></td>"
      }
	  
	  else {
        table_current += "<td>"+cols[j]+"</td>"
      }

  	}

  	table_total += table_current+'</tr>'
  }

  table_total += '</tbody>'
  
  //Final table with all data
  $('#characters_equipments_dataTable').html(table_header + table_total);

  //Datatable
  $('#characters_equipments_dataTable').DataTable({
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
  			url: "csv/character_equipment.csv",
  			dataType: "text",
  			success: parseCsv
			});
})