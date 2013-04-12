var Imap = require('imap')
  , inspect = require('util').inspect;

(function() {

	//Gmail Connection attributes
	var username = 'blank@gmail.com'
	  , password = 'userPassword'
	  , host     = 'imap.gmail.com'
	  , port     = 993
	  , secure   = true;

	exports.set = function set(key, value){
		switch(key)
		{
			case 'username':
				username = value;
				break;

			case 'password' :
				password = value;
				break;
		}
		return this;
	}

	exports.start = function () {

		// passes a collection of topics to cab, calls cab for each email received.
		exports.getNewTopics = function(cab) {

			openInbox( function(err, mailbox) {

				if(err) die(err + 'opening inbox');
				imap.search([ 'UNSEEN', ['SINCE', 'Apr 10, 2013'] ], function(err, results) {

					if(err) die(err + 'searching inbox');

					if(results.length == 0)
						return false;

					imap.fetch(results //source
					  , { //options
					  		markSeen: true
					  	  , struct  : false
					  	}
					  ,	{ //request
							body : false
						  , headers : ['subject']
						  , cb : function(fetch) {

						  		fetch.on('message', function(msg) {

						  			var topic = '';
						  			msg.on('headers', function(hdrs) {
						  				topic += hdrs.subject[0];
						  			})

						  			msg.on('end', function() {
						  				cab(parseSubj(topic));
						  			})

						  		});

						  	}
						}
					  , function(err) { //callback
							if(err) throw err;
							imap.logout();
						});
				});

			});

		}

		var imap = new Imap({
			'user': username
		  , 'password': password
		  , 'host': host
		  , 'port': port
		  , 'secure': true
		});

		function show(obj) {
			return inspect(obj, false, Infinity);
		}

		var die = function(err) {

			console.log('Uh oh: ' + err);
			process.exit(1);

		}

		var openInbox = function(cb) {

			imap.connect(function(err) {

				if (err) die(err + ' real open inbox ' + show(imap));

				imap.openBox('INBOX', false, cb);

			});

		}

		var parseSubj = function(body)
		{

			return body.split(',');

		}



	}

})();