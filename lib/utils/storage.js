var fs = require('fs');

(function() {

	var filePath = 'things';

	exports.set = function set(key, value){
		switch(key)
		{
			case 'storageFile' :
				filePath = value;
				break;
		}
		return this;
	}

	exports.start = function() {
		
		//passes the collection to the callback function
		exports.getCollection = function(cb) {

			fs.readFile(filePath, "utf8", function(err, data) {

				if( err ) return console.log("Reading File Failed");
				
				var coll = data.split(',');
				cb(coll);

			});

		};

		exports.addToCollection = function(data) {

			fs.appendFile(filePath, "," + data, function(err) {

				if( err ) return console.log("Adding To Collection Failed");

			});

		};

		exports.replaceCollection = function(coll) {

			var str = coll.join(',');
			fs.writeFile(filePath, str, function(err) {

				if(err) return console.log("Failed to write to file");

			});

		};

	};

})();