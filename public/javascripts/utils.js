$(document).ready(function() {
	var rows = $("#data").children(0).children(0);
	var length = rows.length;
	for(var i = 2; i < length; ++i) {
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
					}, 100);
				}
			);
		}(rows[i]);
	}
});