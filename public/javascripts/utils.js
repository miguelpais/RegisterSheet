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
				tableObj.getRows().last().replaceWith(success);

//				MYAPP.setEditAnimation("in");

				saveButton.hide();
				cancelButton.hide();
				newButton.display();
				
				tableObj.entryMode = false;
				MYAPP.balanceObj.refresh();
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
	};
	
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
			cancelButton.hide();


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
			return refInputArea.id()[0].value;
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
			return descInputArea.id()[0].value;
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
			return valueInputArea.id()[0].value;
		}
	};

	var input_areas = {1:refInputArea, 2:descInputArea, 3:valueInputArea};

	var that = {};
	
	that.tableObj = tableObj;
	that.input_areas = input_areas;
	that.refInputArea = refInputArea;
	that.descInputArea = descInputArea;
	that.valueInputAre = valueInputArea;
	that.saveButton = saveButton;
	that.cancelButton = cancelButton;
	that.newButton = newButton;

	//seting jQuery actions to obj actions
	newButton.id().click(newButton.click);
	cancelButton.id().click(cancelButton.click);
	saveButton.id().click(saveButton.click);
	
	return that;
};

MYAPP.balanceObj = {
	id : function() {
		return $("#balance");
	},
	setBalance : function(balance) {
		this.id()[0].innerHTML = balance;
	},
	refresh : function() {
		var that = this;
		$.post("/app/balance", function(success) {
			that.setBalance(success);
		});
	}
};

MYAPP.saveNewEntry = function(table_id, ref, desc, value, callback) {
	$.post("/app/create", 
				{entry_ref: ref, entry_desc: desc, entry_value: value, direction: table_id}, 
				function(success) {
					callback(success);
				}
	);
};