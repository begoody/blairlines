$(document).ready(function(){
	
	$(".get-started").on("click",function(){

		$(".sign-up").show();
		$(this).hide();

	});

	$(".signup-form").submit(function(){

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
					$(".sign-up").hide();
					$(".profile").show();
				}

			}

		});

		return false;

	});

});