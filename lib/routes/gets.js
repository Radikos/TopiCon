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

/*
		emailReader.getNewTopics(function(coll) {

			for (var i = 0; i < coll.length; i++) {

				storage.addToCollection(coll[i]);

			};

		});
	*/

		topicon.topic = function( req, response ) {


			if( req.accepts('text/html') == 'text/html' ) {

				var cb = function( err, res ) {

					if( err ) return console.log( err );

					if(res[0] === '')
						res[0] = 'Talk about adding more topics, because I\'m fresh out';

					return response.render( 'index', {
						title : 'TopiCon',
						content : res[0]
					});

				};

				getATopic(cb);

			}

			else if( req.accepts('json') == 'json' ) {

				var cb = function( err, res ) {

					if( err ) return console.log( err );

					if(res[0] === '')
						res[0] = 'Talk about adding more topics, because I\'m fresh out';

					return response.json( res[0] );

				};

				getATopic(cb);

			}

		}

		var getATopic = function(cb)
		{

			//getNewTopics();
			storage.getCollection(function(coll){

				console.log(coll);

				var i= Math.floor((Math.random()*coll.length));
				cb(null, coll.splice(i,1));
				storage.replaceCollection(coll);

			});

		}

		var getNewTopics = function() {

			emailReader.getNewTopics(function(coll) {

				for (var i = 0; i < coll.length; i++) {

					storage.addToCollection(coll[i]);

				};

			});

		}

		//getNewTopics();

	}

	module.exports = topicon;

})();