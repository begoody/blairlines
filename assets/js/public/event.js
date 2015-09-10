function makeClubsList(){
	$.ajax({
		url: "club/getclubs",
		method: "GET",
		dataType: "JSON",
		success: function(data){
			var club_option_html = "";
			for(var i=0; i<data.length; i++){
				club_option_html += "<option value="+data[i].id+">"+data[i].name+"</option>";
				$(".form-control[name=club]").html(club_option_html);
			}
		}
	});
}

$(document).ready(function(){ console.log('asdasd');
	$('#inputDate').datepicker({ dateFormat: "yy-mm-dd" });
	
	$(".create-event").on("click",function(){
		console.log("sdf");
		$(this).hide();

		$(".event-block").show();

		makeClubsList();
		
	});
	
	$(".create-event-form").submit(function(e){

		console.log('foo');
		var formData = $(this).serializeArray();

		var url = $(this).attr("action");

		var self = this;
		$(self).find(".bg-warning").html("");
		$(".form-group").removeClass("has-error");

		$.ajax({

			url: url,
			method: "GET",
			data: formData,
			success: function(data){

				if (data.error){
					//console.error(data.invalidAttributes);

					var arrErr = [];
					
					for(err in data.invalidAttributes){
						
						
						
						for (e in err){
							console.log(err);
							
							if(data.invalidAttributes[err][e]){
								arrErr.push({ "input":err,"message":data.invalidAttributes[err][e].message });
							}
						}

					}

					//console.log(arrErr.length);

					for(error in arrErr) {
						$(self).find("input[name="+arrErr[error].input+"]").parents(".form-group").addClass("has-error");
						if(arrErr[error]){ $(self).find(".bg-warning").append(arrErr[error].input+": "+arrErr[error].message+"<br />"); }
						
					}

				} else{
					console.log(data)
					$(self).html("<p>Event successfully created!</p>");
				}

			}

		});

		e.preventDefault();
	});
});