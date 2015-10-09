function makeClubsList(){
	$.ajax({
		url: "club/getclubs",
		method: "GET",
		dataType: "JSON",
		success: function(data){
			var club_option_html = "";
			for(var i=0; i<data.length; i++){
				club_option_html += "<option value="+data[i].id+">"+data[i].name+"</option>";
				$(".form-control[name=clubs]").html(club_option_html);
			}
		}
	});
}

function renderCalendar(){
	$("#calendar").html("");
	

	$.getScript('js/vendor/fullcalendar.js', function() {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $.ajax({
 
    	url: "event/calendar",

    	dataType: "JSON",
    	success: function(data){

    		//console.log(data);
    		eventArr = [];
    		for(i=0; i<data.length; i++){

    			var formatDateTime = data[i].date.split("T");
    			var formatDate = formatDateTime[0].split("-");
			var timeStartSplit = data[i].timeStart.split(" ");
			var timeStarts = timeStartSplit[0].split(":");
			var timeEndSplit = data[i].timeEnd.split(" ");
			var timeEnds = timeEndSplit[0].split(":");
			var desc = data[i].eventType.title + "\r\n" +  data[i].clubs[0].name;

    			eventArr.push({ 
    				id: data[i].id, 
    				title: desc, 
    				start: new Date(formatDate[0],formatDate[1]-1,formatDate[2],timeStarts[0],timeStarts[1]),
				end: new Date(formatDate[0],formatDate[1]-1,formatDate[2],timeEnds[0],timeEnds[1]),
				allDay: false
    			});

    		}
    		console.log(eventArr);
	    	 $('#calendar').fullCalendar({
			 height: 500,			 
			 disableDragging: true,
			 disableResizing: true,
		        header: {
		            left: 'prev,next today',
		            center: 'title',
		            right: 'month,agendaWeek,agendaDay'
		        },
		        editable: true,
		        events: eventArr,
			   
    // EventColor
eventAfterRender: function (event, element, view) 
{
	
				var NewDate = new Date();
				if(event.start < NewDate && event.end > NewDate) {            
					element.css('background-color', '#77dd77');//Present or In progress 
					$.ajax({
								url: "event/update/"+event.id+"?status=In progress",
								dataType: "JSON",
								success: function(data){}								
								});
				}else if (event.start < NewDate && event.end < NewDate) {
					element.css('background-color', '#7777dd');//Past or Completed 
					$.ajax({
								url: "event/update/"+event.id+"?status=Completed",
								dataType: "JSON",
								success: function(data){}								
								});
				}else if (event.start > NewDate && event.end > NewDate) {
					element.css('background-color', '#dd77dd');//Future or not Started 
					$.ajax({
								url: "event/update/"+event.id+"?status=Not Started",
								dataType: "JSON",
								success: function(data){}								
								});
				}
		
},
			    eventClick: function(event) {

			    	$(".join-event-button, .event-cart, .already-applied-event, .signup-before, .event-cancel").hide();

			    	$(".event-card").show();
			    	$.ajax({
			    		url: "event/"+event.id,
			    		dataType: "JSON",
			    		success: function(data){
			    			console.log(data);
						var dateNow = new Date();
			    			var date = data.date.split("T");
			    			$(".event-card-type").text(data.eventType.title);
			    			$(".event-card-description").text(data.description);
			    			$(".event-card-club").text(data.clubs[0].name);
			    			$(".event-card-date").text(date[0]);
			    			$(".event-card-time").text(data.timeStart + " - " + data.timeEnd);
						$(".event-card-status").text(data.status);
			    			$(".confirm-event-button").attr("data-event-id",data.id);
			    			$(".cancel-event-applying-button").attr("data-event-id",data.id);
			    			$(".event-cancel-button").attr("data-event-id",data.id);

			    			var alreadyAppliedEvent = false;
			    			var currentPilotEvent = false;
			    			var currentClubEvent = false;

			    			if(userObject.user.userType==1){

			    				for(pass in data.passengers){
			    					if(pass.id == userObject.user.PassengerId){ alreadyAppliedEvent = true; console.log(1); }
			    				}

			    				//if(userObject.user.userType==1 && !alreadyAppliedEvent ){ $(".join-event-button").show(); } 
			    				if(alreadyAppliedEvent){ $(".already-applied-event").show(); }
							//Validation Future events for booking
							if(event.start > dateNow && event.end > dateNow){
							if(userObject.user.userType==1 && !alreadyAppliedEvent){
								$(".join-event-button").show();}
							}

			    			} else if(userObject.user.userType==2) {
			    				
			    				for(var i=0; i<data.pilots.length; i++){

			    					if(data.pilots[i].user == userObject.user.id){ currentPilotEvent = true; }
			    				}

			    				if(currentPilotEvent){ $(".event-cancel").show();  }

			    			} else if(userObject.user.userType==3) {
			    				
			    				for(var i=0; i<data.clubs.length; i++){
			    					console.log('<');
			    					console.log(data.clubs[i].id);
			    					console.log('>');

			    					if(data.clubs[i].user == userObject.user.id){ currentClubEvent = true; }
			    				}

			    				if(currentClubEvent){ $(".event-cancel").show();  }

			    			} else {
							if(event.start > dateNow && event.end > dateNow){
			    				$(".signup-before").show();}
							
			    			}
			    			
			    		}
			    		
			    	});
				    
				  //   if (event.title) {
				  //       alert("ID: " + event.id + "\r\n" + "Event: " + event.title + "\r\n" + "Date: " + event.start + " - " + event.end);
					 // $(this).css('border-color', 'red');
				  //       return false;
				  //   }
				}
			});

    	}

    });   
        
    
	});
}

$(document).ready(function(){
	$('#inputDate').datepicker({ dateFormat: "yy-mm-dd" });
	
	$(".create-event").on("click",function(){

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
					$(self).hide();
					$(".event-created").show();

					renderCalendar();
					
					setTimeout(function(){ 
						$("a[href=#events]").click(); 
						$(".event-block").hide(); 
						$(".event-created").hide();
						$(".create-event-form").show();
						$(".create-event").show();
					},1500);
				       

				}

			}

		});

		e.preventDefault();
	});

	$(".event-close").on("click",function(){

		$(".event-card").hide();

	});

	$(".event-form-close").on("click",function(){

		$(".event-block").hide();
		$(".create-event").show();

	});


	$(".join-event-button").on("click",function(){

		$(".event-cart").show();
	});

	$(".confirm-event-button").on("click",function(){
		var eventId = $(this).attr("data-event-id");  
		$.ajax({
			url: "event/apply",
			dataType: "JSON",
			data: {"event": eventId },
			success: function(data){
				$(".already-applied-event, .event-cart, .join-event-button").toggle();
			}

		});
	});

	$(".cancel-event-applying-button").on("click",function(){
		var eventId = $(this).attr("data-event-id");
		var passengerId = userObject.id;
		$.ajax({
			url: "event/"+eventId+"/passengers/remove/"+passengerId,
			dataType: "JSON",
			success: function(data){
				alert('Your applying was sucessfully canceled!');
				$(".event-card").hide();
			}

		});
	});

	$(".event-cancel-button").on("click",function(){
		var eventId = $(this).attr("data-event-id");
		$.ajax({
			url: "event/destroy/"+eventId,
			dataType: "JSON",
			success: function(data){
				alert('Your event was sucessfully canceled!');
				$(".event-card").hide();
				renderCalendar();
			}

		});
	});

	renderCalendar();

});