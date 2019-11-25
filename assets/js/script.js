$(document).ready(function(){
	var cgpa_main_data = [], gpa_selected_semester, gpa_evaluation_data = [], collect_evaluation_values = [], result = 0, gpa_added_credit_value = 0;

	$.get("assets/docs/anna_university_courses.json", function(data, status){
		if(status == "success"){
	    	cgpa_main_data = data;

	    	//gpa click
	    	$("#gpa").click(function(){
	    		$("#home").hide();
	    		$("#category").show();
	    	});

	    	//semester change
	    	$('#gpa_semester').on('change', function (e) {
	    		$("#category").hide();
	    		$("#evaluation").show();
			    gpa_selected_semester = this.value;

			    for(var i = 0; i < cgpa_main_data.length; i++){
			    	if (cgpa_main_data[i].semesterNumber == gpa_selected_semester) {
			    		gpa_evaluation_data.push(cgpa_main_data[i]);
			    	}
			    }
			    // debugger
			    console.log("Selected Sem data:"+ gpa_evaluation_data);

			    for(i = 0; i < gpa_evaluation_data.length; i++){
			    	$("#gpa_container").append('<li class="list-group-item bg-dark"> <div class="d-flex"> <label class="text-light text-capitalize">'+gpa_evaluation_data[i].subjectName+'</label> </div> <div class="form-group"><select class="form-control gpa_value'+[i]+'"><option disabled selected>Select Grade</option><option value="'+ 10*gpa_evaluation_data[i].credits +'">S</option><option value="'+ 9*gpa_evaluation_data[i].credits +'">A</option><option value="'+ 8*gpa_evaluation_data[i].credits +'">B</option><option value="'+ 7*gpa_evaluation_data[i].credits +'">C</option><option value="'+ 6*gpa_evaluation_data[i].credits +'">D</option><option value="'+ 5*gpa_evaluation_data[i].credits +'">E</option><option value="0">F</option><option value="0">AB</option></select></div> </li>');
			    }
			    
			});

			// calculate gpa 
			$("#gpa_calculate").click(function(){
				for (var i = 0; i < gpa_evaluation_data.length; i++) {
					gpa_value = $(".gpa_value"+[i]+"").val();
					//collect_evaluation_values.push(gpa_value);
					result = parseFloat(gpa_value) + result;
					gpa_added_credit_value = parseFloat(gpa_evaluation_data[i].credits) + gpa_added_credit_value;
				}
				$("#evaluation").hide();
				$("#result").show();
				$("#gpa_result_value").text((result / gpa_added_credit_value).toFixed(2));
			});

	  //   	for(var i = 0;i < cgpa_main_data.length; i++){		
			// 	$("table tbody").append("<tr><td>"+ cgpa_main_data[i].semesterNumber +"</td><td>"+ cgpa_main_data[i].subjectCode +"</td><td>"+ cgpa_main_data[i].subjectName +"</td><td>"+ cgpa_main_data[i].credits +"</td><td>"+ cgpa_main_data[i].catagory +"</td></tr>");
			// }

	    }else{
	    	alert("Data not Fetched");
	    }
	});
	
});