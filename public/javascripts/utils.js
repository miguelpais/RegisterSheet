$(document).ready(function() {

	MYAPP.setEditAnimation("in");
	MYAPP.setCancelAction("in");
	MYAPP.showNewEntryForm("in");
	
});

var MYAPP = {
	setEditAnimation : function(table_id) {
		// getting all the row tables
		var rows = $("#" + table_id).find("tr");
		var length = rows.length;
		
		for(var i = 2; i < length -1; ++i) {
			// starting in 2 because first two rows are headers
			// ending in -1 because last row is the new data entry row
			(function(el) {
				// closure so that timeout variable is private to each row
				var timeout;
				
				// setting mouseenter and mouseleave properties for the row
				$(el).hover(
					function() {
						// show edit button
						clearTimeout(timeout);
						$(el.children(0)).css('visibility',"visible");
					},
					function() {
						// edit button only disappers after 60 seconds, and if 
						// timeout was not reset by the mouseenter function
						timeout = setTimeout(function() {			
							$(el.children(0)).css('visibility',"hidden");
						}, 300);
					}
				);
			})(rows[i]);
		}
	},
	
	showNewEntryForm : function(table_id) {
		// setting click property of the button new data entry
		
		input_areas_array = {
			1: "<input type=\"text\" id=\"ref\" size=4\/>",
			2: "<input type=\"text\" size=50\/>",
			3: "<input type=\"text\" size=4\/>",
		};
		
		$("#" + table_id + " .new").click(function() {
				// getting the columns of the last line of the table
				var columns = $("#" + table_id).find("tr").last().find("td");
				var length = columns.length;
				for(var i = 1; i < length; ++i) {
					var el = columns[i];
					$(el).append(input_areas_array[i]);
				}
				$("#ref").focus();
				$("#" + table_id + " .cancel").css('visibility', "visible");
				
				$(document).keydown(function(event) {
					if (event.keyCode == '27') {
						$("#" + table_id + " .cancel").trigger('click');
					}});
		});
		
	},
	
	setCancelAction: function(table_id) {
			$("#" + table_id + " .cancel").click(function() {
				// cancel button hides again
				$("#" + table_id + " .cancel").css('visibility', "hidden");
				// removes text boxes
				var columns = $("#" + table_id).find("tr").last().find("td");
				var length = columns.length;
				for(var i = 1; i < length; ++i) {
					columns[i].innerHTML = "";
				}
			});

			$(document).unbind('keydown');
	}
}
