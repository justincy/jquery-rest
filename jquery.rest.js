(function ($) {

  var verbs = {
		"GET"    : "get",
		"POST"   : "post",
		"PUT"    : "put",
		"DELETE" : "del"
	};

  // Rest service constructor
	$.rest = function (url, options, jsonp) {
    this.url_       = url;
    this.options_   = options || {};
	};

	var $restProto = $.rest.prototype;

  // Function that wraps $.ajax
	var _ajax = function (type, url, options) {
    if( typeof options !== 'object' ) {
      options = {};
    }
    options.type = type;
    options.url = this.url_ + url;
    // Recursively merge the default options and the new options;
    // New options trump; 
    // Maintain both original options by extending an empty object
    options = $.extend(true, {}, this.options_, options);
		return $.ajax(options);
	};

  // Add .get, .post, .put, and .del to the rest service prototype
	for (var httpMethod in verbs) {
    var restName = verbs[httpMethod];
    $restProto[restName] = function(url, options){
      return _ajax.call(this, httpMethod, url, options);
    };
	}

}(jQuery));
