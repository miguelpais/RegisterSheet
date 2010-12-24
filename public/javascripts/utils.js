/*
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

			$(document).keydown(function(event) {
				if (event.keyCode == '13') {
					$("#" + table_id + " .save").trigger('click');
				}
			});

			$("#" + table_id + " .new").css("display", "none");
			$("#" + table_id + " .save").css("display", "block");
	},
	
	saveClickHandler : function(table_id) {
		var ref = $("#" + table_id + " .ref")[0].value;
		var desc = $("#" + table_id + " .desc")[0].value;
		var value = $("#" + table_id + " .value")[0].value;
		
		$("#" + table_id + " .save").css("display", "none");
		
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
		
		$(document).unbind('keydown');
		
		$("#" + table_id + " .new").css("display", "block");
		$("#" + table_id + " .save").css("display", "none");
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
}*/


var MYAPP = {};

MYAPP.constructTableObject = function (spec) {
	var tableObj = {
		id: function() {
			return $("#" + spec.tableId);
		}, 
		getFromDOMId : function(DOMid) {
			return $("#" + spec.tableId + " ." + DOMid);
		},
		getRows : function() {
			return $("#" + spec.tableId).find("tr");
		},
		getLastRowColumns : function() {
			return this.getRows().last().find("td");
		},
		addEntry : function(success) {
			// this function will be set as the callback 
			// for the post done to the server to add a new entry
			
			if (success !== "") {
				this.id.getRows.last().replaceWith(success);

				MYAPP.setEditAnimation("in");

				saveButton.hide();
				cancelButton.hide();
				newButton.display();
				
				entryMode = false;
			}
		},
		entryMode : false
	};
	
	var newButton = {
		// gets the jQuery object associated with the specified table
		id: function() {
			return tableObj.getFromDOMId("new");
		},
		// displays the DOM element
		display : function() {
			this.id().css("display", "block");
		},
		// hides the DOM element
		hide : function() {
			this.id().css("display", "none");
		},
		click : function() {
				tableObj.entryMode = true;

				var columns = tableObj.getLastRowColumns();
				var length = columns.length;
				
				for(var i = 1; i < length; ++i) {
					$(columns[i]).append(input_areas[i].getHTML());
				}

				refInputArea.focus();
				cancelButton.display();
				newButton.hide();
				saveButton.display();
		}
	}
	
	var saveButton = {
		id: function() {
			return tableObj.getFromDOMId("save");
		},
		display : function() {
			this.id().css("display", "block");
		},
		hide : function() {
			this.id().css("display", "none");
		},
		click : function() {
			var ref = refInputArea.getValue();
			var desc = descInputArea.getValue();
			var value = valueInputArea.getValue();

			saveButton.hide();

			
			spec.saveEntry(ref, desc, value, tableObj.addEntry);
		}
	};
	
	var cancelButton = {
		id : function() {
			return tableObj.getFromDOMId("cancel");
		},
		display : function() {
			this.id().css("display", "block");
		},
		hide : function() {
			this.id().css("display", "none");
		},
		click : function() {
			this.hide();

			var columns = tableObj.getLastRowColumns();
			var length = columns.length;
			for(var i = 1; i < length; ++i) {
				columns[i].innerHTML = "";
			}

			newButton.display();
			saveButton.hide();
			
			tableObj.entryMode = false;
		}
	};
	
	var refInputArea = {
		id: function() {
			return tableObj.getFromDOMId("ref");
		},
		focus: function() {
			this.id().focus();
		},
		getHTML : function() {
			return "<input type=\"text\" class=\"ref\" size=3\/>";
		},
		getValue : function() {
			return this.id()[0].value();
		}
	};
	
	var descInputArea = {
		id: function() {
			return tableObj.getFromDOMId("desc");
		},
		focus: function() {
			this.id.focus();
		},
		getHTML : function() {
			return "<input type=\"text\" class=\"desc\" size=60\/>";
		},
		getValue : function() {
			return this.id()[0].value();
		}
	};
	
	var valueInputArea = {
		id: function() {
			return tableObj.getFromDOMId("value");
		},
		focus: function() {
			this.id.focus();
		},
		getHTML : function() {
			return "<input type=\"text\" class=\"value\" size=8\/>";
		},
		getValue : function() {
			return this.id()[0].value();
		}
	};

	var input_areas = {1:refInputArea, 2:descInputArea, 3:valueInputArea};

	var that = {};

	that.input_areas = input_areas;
	that.tableObj = tableObj;
		
	that.saveButton = saveButton;
	that.cancelButton = cancelButton;
	that.newButton = newButton;

	//seting jQuery actions to obj actions
	newButton.id().click(newButton.click);
	cancelButton.id().click(cancelButton.click);
	saveButton.id().click(saveButton.click);
	
	return that;
}

MYAPP.saveNewEntry = function(table_id, ref, desc, value, callback) {
	$.post("/app/create", 
				{entry_ref: ref, entry_desc: desc, entry_value: value, direction: table_id}, 
				function(success) {
					callback(success);
				}
	);
}

$(document).ready(function() {
	// creating two table objects
	MYAPP.tables = [];
	MYAPP.tables.push(MYAPP.constructTableObject({
			tableId :"in",
			sendData : function() { 
				MYAPP.saveNewEntry(tableId, arguments);
			}
		}));
/*	MYAPP.tables.push(MYAPP.constructTableObject({
		tableID : "out",
		sendData : function() {
			MYAPP.saveNewEntry(tableId, arguments);
		}
	}));*/
	
	
	// bind keyboard events
	
	$(document).keydown = function(event) {
		if (event.keyCode == 13) {
			// Enter/Return key
			for(table in MYAPP.tables) {
				if (MYAPP.tables.hasOwnProperty(table)) {
					if (table.tableObj.entryMode === true) {
						//assigning Enter to whichever table is in EntryMode
						table.saveButton.click();
						break;
					}
				}
			}
		}
		else if (event.keyCode == 27) {
			for(table in MYAPP.tables) {
				if (MYAPP.tables.hasOwnProperty(table)) {
					if (table.tableObj.entryMode === true) {
						//assigning Esc to whichever table is in EntryMode
						table.cancelButton.click();
						break;
					}
				}
			}
		}
	}
});