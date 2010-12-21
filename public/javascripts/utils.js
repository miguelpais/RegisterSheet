$(document).ready(function() {

	MYAPP.setEditAnimation("in");
	MYAPP.setNewEntryAction("in");
	MYAPP.setCancelAction("in");
	MYAPP.setSaveAction("in");
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
						$(el).find(".edit").css("display", "block");
					},
					function() {
						// edit button only disappers after 60 seconds, and if 
						// timeout was not reset by the mouseenter function
						timeout = setTimeout(function() {			
							$(el).find(".edit").css("display", "none");
						}, 300);
					}
				);
			})(rows[i]);
		}
	},
	
	
	setCancelAction: function(table_id) {
			$("#" + table_id + " .cancel").click(function() {MYAPP.cancelClickHandler(table_id)});;
	},
	
	setSaveAction : function(table_id) {
		$("#" + table_id + " .save").click(function() {MYAPP.saveClickHandler(table_id);});
	},
	
	setNewEntryAction : function(table_id) {
		// setting click property of the button new data entry
		
		input_areas_array = {
			1: "<input type=\"text\" class=\"ref\" size=3\/>",
			2: "<input type=\"text\" class=\"desc\" size=60\/>",
			3: "<input type=\"text\" class=\"value\" size=8\/>",
		};
		
		$("#" + table_id + " .new").click(function() { MYAPP.newEntryClickHandler(table_id)});
		
	},
	
	newEntryClickHandler : function(table_id) {
		// getting the columns of the last line of the table
		var columns = $("#" + table_id).find("tr").last().find("td");
		var length = columns.length;
		for(var i = 1; i < length; ++i) {
			var el = columns[i];
			$(el).append(input_areas_array[i]);
		}
	
		$("#" + table_id + " .ref").focus();
		$("#" + table_id + " .cancel").css('display', "block");
	
		$(document).keydown(function(event) {
			if (event.keyCode == '27') {
				$("#" + table_id + " .cancel").trigger('click');
			}
		});

		$("#" + table_id + " .new").css("display", "none");
		$("#" + table_id + " .save").css("display", "block");
	},
	
	saveClickHandler : function(table_id) {
		var ref = $("#" + table_id + " .ref")[0].value;
		var desc = $("#" + table_id + " .desc")[0].value;
		var value = $("#" + table_id + " .value")[0].value;
		
		$.post("/app/create", 
					{entry_ref: ref, entry_desc: desc, entry_value: value}, 
					function(success) {
						MYAPP.addEntry(success, table_id);
					});
	},

	cancelClickHandler : function(table_id) {
		// cancel button hides again
		$("#" + table_id + " .cancel").css('display', "none");
		// removes text boxes
		var columns = $("#" + table_id).find("tr").last().find("td");
		var length = columns.length;
		for(var i = 1; i < length; ++i) {
			columns[i].innerHTML = "";
		}
		
		$(document).unbind('keydown')
		
		$("#" + table_id + " .save").css("display", "none");
		$("#" + table_id + " .new").css("display", "block");
	},
	
	addEntry: function(success, table_id) {
		// receives a new entry from a database 
		if (success !== "") {
			$("#" + table_id).find("tr").last().replaceWith(success);

			MYAPP.setEditAnimation("in");
			
			$("#" + table_id + " .save").css("display", "none");
			$("#" + table_id + " .cancel").css("display", "none");
			$("#" + table_id + " .new").css("display", "block");
		}
	}
}
