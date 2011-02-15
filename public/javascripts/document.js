
// creating two table objects
MYAPP.tables = [];
MYAPP.tables.push(MYAPP.constructTableObject({
		tableId :"in",
		saveEntry : function(ref, desc, value, callback) { 
			MYAPP.saveNewEntry(this.tableId, ref, desc, value, callback);
		}
	}));
MYAPP.tables.push(MYAPP.constructTableObject({
		tableId :"out",
		saveEntry : function(ref, desc, value, callback) { 
			MYAPP.saveNewEntry(this.tableId, ref, desc, value, callback);
		}
	}));
	
	
// bind keyboard events

$(document).keydown(function(event) {
	if (event.keyCode == '13') {
		// Enter/Return key
		for(el in MYAPP.tables) {
			if (MYAPP.tables.hasOwnProperty(el)) {
				if (MYAPP.tables[el].tableObj.entryMode === true) {
					//assigning Enter to whichever table is in EntryMode
					MYAPP.tables[el].saveButton.click();
					break;
				}
			}
		}
	}
	else if (event.keyCode == '27') {
		for(el in MYAPP.tables) {
			if (MYAPP.tables.hasOwnProperty(el)) {
				if (MYAPP.tables[el].tableObj.entryMode === true) {
					//assigning Esc to whichever table is in EntryMode
					MYAPP.tables[el].cancelButton.click();
					break;
				}
			}
		}
	}
});