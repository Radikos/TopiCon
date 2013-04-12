
/**
 * Module dependencies.
 */

var express = require('express')
  , gets    = require('./routes/gets')
  , http    = require('http')
  , path    = require('path')
  , app     = express()
  , server  = http.createServer(app);
  
(function(){

	var httpPort = 8500;

	exports.set = function set(key, value){
		switch(key)
		{
			case 'httpPort':
				httpPort = value;
				break;

			case 'storageFile' :
			case 'username':
			case 'password':
				gets.set(key,value);
				break;
		}
		return this;
	}

	exports.start = function start(){

		gets.start();
		console.log("Loading configs!");

		app.configure(function(){
			app.set('port', process.env.PORT || httpPort);
			app.set('views', __dirname + '/views');
  			app.set('view engine', 'jade');
			app.use(express.favicon());
			app.use(express.logger('dev'));
			app.use(express.bodyParser());
			app.use(express.methodOverride());
			app.use(express.cookieParser('your secret here'));
			app.use(express.session());
			app.use(app.router);
			app.use(express.static(path.join(__dirname, 'public')));
		});

		console.log("Loading Dev Error Logger");
		app.configure('development', function(){
			app.use(express.errorHandler());
		});


		console.log("Loading gets!");
		app.get('/', gets.topic);

		console.log("Ready to Go!");
		server.listen(app.get('port'));
	}

})();
