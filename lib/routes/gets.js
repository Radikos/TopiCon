	//		Topicon 1.0.0
var storage = require('../utils/storage')
  , emailReader = require('../utils/emailReader');

(function() {
	// ##Inital Setup

	// Create Export Object
	var topicon = {};

	topicon.set = function set(key, value){
		
		switch(key)
		{
			case 'storageFile':
				storage.set(key,value);
				break;
			case 'username':
			case 'password':
				emailReader.set(key,value);
				break;
		}
		return this;
	}


	topicon.start = function start(){

		storage.start();
		emailReader.start();

		emailReader.getNewTopics(function(coll) {

			for (var i = 0; i < coll.length; i++) {

				storage.addToCollection(coll[i]);

			};

		});

		topicon.topic = function( req, response ) {

			if( req.accepts('text/html') == 'text/html' ) {

				var cb = function( err, res ) {

					if( err ) return console.log( err );

					return response.render( 'index', {
						title : 'TopiCon',
						content : res
					});

				};

				//doCallToGetInfo(cb)

			}

			else if( req.accepts('json') == 'json' ) {

				var cb = function( err, res ) {

					if( err ) return console.log( err );

					return response.json( res );

				};

				//doCallToGetInfo(cb)

			}

		}



	}

	module.exports = topicon;

})();