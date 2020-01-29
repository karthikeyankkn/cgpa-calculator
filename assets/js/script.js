$(document).ready(function(){
	var cgpa_main_data = [], gpa_selected_semester, gpa_evaluation_data = [], collect_evaluation_values = [], result = 0, gpa_added_credit_value = 0, gpa_selected_department = [], gpa_selected_department_data = [];

	$.get("assets/docs/anna_university_courses.json", function(data, status){
		if(status == "success"){
	    	cgpa_main_data = data;

	    	//gpa click
	    	$("#gpa").click(function(){
	    		$("#home").hide();
	    		$("#category").fadeIn();
	    	});

	    	//department selection
	    	$("#department").on('change', function(e){
	    		gpa_selected_department = this.value;

	    		for(var i = 0; i < cgpa_main_data.length; i++){
			    	if (cgpa_main_data[i].department == gpa_selected_department) {
			    		gpa_selected_department_data.push(cgpa_main_data[i]);
			    	}
			    }
			    //debugger
	    	});
	    	//semester change
	    	$('#gpa_semester').on('change', function (e) {
	    		//debugger
	    		$("#category").hide();
	    		$("#evaluation").fadeIn();
			    gpa_selected_semester = this.value;

			    for(var i = 0; i < gpa_selected_department_data.length; i++){
			    	if (gpa_selected_department_data[i].semesterNumber == gpa_selected_semester) {
			    		gpa_evaluation_data.push(gpa_selected_department_data[i]);
			    	}
			    }

			    for(i = 0; i < gpa_evaluation_data.length; i++){
			    	$("#gpa_container").append('<div class="my-3 options-container"><label class="col-12 text-light text-capitalize mb-3">'+gpa_evaluation_data[i].subjectName +'&nbsp;<span class="text-warning text-uppercase mb-3">['+gpa_evaluation_data[i].subjectCode +']</span></label><div class="col-12 btn-group btn-group-toggle btn-group-sm" data-toggle="buttons"> <label class="btn btn-outline-success btn-toggle active"> <input type="radio" name="subject'+[i]+'" value="'+10*gpa_evaluation_data[i].credits+'" autocomplete="off" checked> <b>O</b> </label> <label class="btn btn-outline-success btn-toggle"> <input type="radio" name="subject'+[i]+'" value="'+9*gpa_evaluation_data[i].credits+'" autocomplete="off"> <b>A+</b> </label> <label class="btn btn-outline-success btn-toggle"> <input type="radio" name="subject'+[i]+'" value="'+8*gpa_evaluation_data[i].credits+'" autocomplete="off"> <b>A</b> </label> <label class="btn btn-outline-success btn-toggle"> <input type="radio" name="subject'+[i]+'" value="'+7*gpa_evaluation_data[i].credits+'" autocomplete="off"> <b>B+</b> </label> <label class="btn btn-outline-success btn-toggle"> <input type="radio" name="subject'+[i]+'" value="'+6*gpa_evaluation_data[i].credits+'" autocomplete="off"> <b>B</b> </label> <label class="btn btn-outline-danger btn-toggle"> <input type="radio" name="subject'+[i]+'" value="'+0*gpa_evaluation_data[i].credits+'" autocomplete="off"> <b>U</b> </label> <label class="btn btn-outline-danger btn-toggle"> <input type="radio" name="subject'+[i]+'" value="'+0*gpa_evaluation_data[i].credits+'" autocomplete="off"> <b>AB</b> </label></div></div>')
			    }
			    
			});

			// calculate gpa 
			$("#gpa_calculate").click(function(){
				for (var i = 0; i < gpa_evaluation_data.length; i++) {
					// gpa_value = $(".gpa_value"+[i]+"").val();
					gpa_value = $('[name=subject'+[i]+']:checked').val();
					//collect_evaluation_values.push(gpa_value);
					result = parseFloat(gpa_value) + result;
					gpa_added_credit_value = parseFloat(gpa_evaluation_data[i].credits) + gpa_added_credit_value;
				}
				$("#evaluation").hide();
				$("#result").fadeIn();
				$("#gpa_result_value").text((result / gpa_added_credit_value).toFixed(2));
			});

				$(".go_to_home").click(function(){				
		    	location.reload();
		    });
		    $(".go_to_category").click(function(){
		    	//debugger
		    	gpa_evaluation_data = [];
		    	$(".gpa_container").empty();
		    	$("#evaluation, #result, #home").hide();
		    	$("#category").fadeIn();
		    });

	  //   	for(var i = 0;i < cgpa_main_data.length; i++){		
			// 	$("table tbody").append("<tr><td>"+ cgpa_main_data[i].semesterNumber +"</td><td>"+ cgpa_main_data[i].subjectCode +"</td><td>"+ cgpa_main_data[i].subjectName +"</td><td>"+ cgpa_main_data[i].credits +"</td><td>"+ cgpa_main_data[i].catagory +"</td></tr>");
			// }

	    }else{
	    	alert("Data not Fetched");
	    }
	});
	
});