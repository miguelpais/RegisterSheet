$(document).ready(function() {
	//setting hover function for data entries
	// rows has all tds in the table with the in id
	var rows = $("#in").children(0).children(0);
	var length = rows.length;
	for(var i = 2; i < length -1; ++i) {
		var f = function(el) {
			var timeout;
			$(el).hover(
				function() {
					clearTimeout(timeout);
					$(el.children(0)).css('visibility',"visible");
				},
				function() {
					timeout = setTimeout(function() {			
						$(el.children(0)).css('visibility',"hidden");
					}, 60);
				}
			);
		}(rows[i]);
	}
	
	$("#new").click(function() {
			var columns = $("#new").parent(0).parent(0)[0].children;
			var length = columns.length;
			for(var i = 1; i < length; ++i) {
				var el = columns[i];
				$(el).append("<input type=\"text\" \/>");
			}
	});
	
});
