require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  var _this = this;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  __webpack_require__(154);

  var _lodash = __webpack_require__(73);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _fs = __webpack_require__(71);

  var _fs2 = _interopRequireDefault(_fs);

  var _path = __webpack_require__(74);

  var _path2 = _interopRequireDefault(_path);

  var _express = __webpack_require__(69);

  var _express2 = _interopRequireDefault(_express);

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _mongoose = __webpack_require__(43);

  var _mongoose2 = _interopRequireDefault(_mongoose);

  var _bodyParser = __webpack_require__(175);

  var _bodyParser2 = _interopRequireDefault(_bodyParser);

  var _cookieParser = __webpack_require__(176);

  var _cookieParser2 = _interopRequireDefault(_cookieParser);

  var _jsonwebtoken = __webpack_require__(72);

  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

  //import './dispatchers/Dispatcher';
  //import './stores/AppStore';

  var _coreDatabase = __webpack_require__(63);

  var _coreDatabase2 = _interopRequireDefault(_coreDatabase);

  var _componentsApp = __webpack_require__(59);

  var _componentsApp2 = _interopRequireDefault(_componentsApp);

  var _utilsClientDetection = __webpack_require__(153);

  var _utilsClientDetection2 = _interopRequireDefault(_utilsClientDetection);

  var _databaseConfig = __webpack_require__(145);

  var _databaseConfig2 = _interopRequireDefault(_databaseConfig);

  var _modelsUser = __webpack_require__(148);

  var _modelsUser2 = _interopRequireDefault(_modelsUser);

  var _modelsNeighbourhood = __webpack_require__(147);

  var _modelsNeighbourhood2 = _interopRequireDefault(_modelsNeighbourhood);

  var _reactRouter = __webpack_require__(10);

  var _reactRouter2 = _interopRequireDefault(_reactRouter);

  var _routesRoutes = __webpack_require__(150);

  var _routesRoutes2 = _interopRequireDefault(_routesRoutes);

  var _componentsLoginPage = __webpack_require__(38);

  var _componentsLoginPage2 = _interopRequireDefault(_componentsLoginPage);

  var _componentsRegisterPage = __webpack_require__(39);

  var _componentsRegisterPage2 = _interopRequireDefault(_componentsRegisterPage);

  var _componentsUserHomePage = __webpack_require__(60);

  var _componentsUserHomePage2 = _interopRequireDefault(_componentsUserHomePage);

  var _nodemailer = __webpack_require__(180);

  var _nodemailer2 = _interopRequireDefault(_nodemailer);

  var server = (0, _express2['default'])();

  server.set('port', process.env.PORT || 5000);
  server.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));

  // db token seed
  server.set('superSecret', _databaseConfig2['default'].secret); // secret variable

  // use body parser so we can get info from POST and/or URL parameters
  server.use(_bodyParser2['default'].urlencoded({ extended: false }));
  server.use(_bodyParser2['default'].json());
  server.use((0, _cookieParser2['default'])());

  // TODO: move transporter to a diff file
  //--------------------------------------------------------------------------------
  // creating transporter for sending email.
  //--------------------------------------------------------------------------------
  var transporter = _nodemailer2['default'].createTransport({
    service: 'Gmail',
    auth: {
      user: 'closyaar@gmail.com',
      pass: 'antyka@gmail.com'
    }
  });
  //--------------------------------------------------------------------------------

  // db connection
  _mongoose2['default'].connect(_databaseConfig2['default'].database);
  var mongoDB = _mongoose2['default'].connection;

  mongoDB.on('error', console.error.bind(console, 'connection error:'));

  /*mongoDB.on('error', function callback (){
    console.log('Server.mongoDB.onError()| mongoDB connection error', arguments);
  });*/

  mongoDB.once('open', function callback() {
    console.log('Server.mongoDB.once()| mongoDB CONNECTED');
  });
  // console.log('superSecret:', server.get('superSecret'));
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  server.use('/routeapi/query', __webpack_require__(149));
  //
  // Register API authentication
  // -----------------------------------------------------------------------------
  // TODO: refactor and move to a module/class
  // -----------------
  // utility functions
  function expiresInMins(minutes) {
    var d1 = new Date();
    return new Date(d1.getTime() + minutes * 60000);
  }
  // -----------------
  var apiRoutes = _express2['default'].Router();

  // console.log('apiRoutes:', apiRoutes);
  apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
  });

  apiRoutes.post('/signup', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    console.log('server.post()| REST call /signup, request body:', req.body);

    _modelsUser2['default'].findOne({
      userid: email
    }, function (err, user) {

      if (err) {
        throw err;
      }

      if (!user) {
        console.log('server.post()| REST call /signup, creating new user...');

        var minExpire = 10; // expires in 10 min
        var expires = expiresInMins(minExpire);

        user = {
          userid: email,
          email: email,
          name: name,
          address: address
        };

        var signObj = {
          user: user,
          expires: expires // this acts a token differentiator
        };
        var token = _jsonwebtoken2['default'].sign(signObj, server.get('superSecret'), {});

        user.jwt = token;

        var newUser = new _modelsUser2['default'](user);

        console.log('server.post()| REST call /signup: trying to add:', newUser);

        newUser.save(function (error, result) {
          if (error) {
            console.log('server.post()| REST call /signup: Error during save:', error);
            throw error;
          }
          console.log('server.post()| REST call /signup: Inserted a document into the user collection:', result);

          var host = req.headers.host;
          console.log('server.post()| REST call /signup: server host:', host);
          // setup e-mail data with unicode symbols
          var mailOptions = {
            from: 'Closyaar<closyaar@gmail.com>', // sender address
            to: result.email, // list of receivers
            subject: 'Welcome to Closyaar', // Subject line
            text: '', // plaintext body
            html: '<div>Hello <b>' + result.name + '</b>,<p>Please <a href="http://' + host + '/signup?key=' + result.jwt + '">Complete your registration</a> to <a href="http://' + host + '">Closyaar</a></p>' + '<p>Looking forward to see you,<br><b>Closyaar Team</b></p></div>' // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log('server.post()| Email ERROR:', error);
            } else {
              console.log('server.post()| Email sent: ', info.response);
            }
          });
        });

        res.json({ success: true, message: 'User signup success!!!' });
      } else {
        res.json({ success: false, message: 'User already exists, did you forget your password?' }); // TODO: send error code instead of msg
      }
    });
  });

  apiRoutes.post('/authenticate', function (req, res) {
    var userid = req.body.userid;
    var password = req.body.password;
    // console.log('authenticate:', req.body);

    _modelsUser2['default'].findOne({
      userid: userid
    }, function (err, user) {

      if (err) {
        throw err;
      }

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        // check if password matches
        if (user.password !== password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          console.log('Server.apiRoutes.post()| Login Success for user:', user.name);
          // if user is found and password is right
          // create a token
          var minExpire = 10; // expires in 10 min
          var expires = expiresInMins(minExpire);

          var signObj = {
            userid: user.userid,
            name: user.name,
            id: user._id,
            expires: expires // this acts a token differentiator
          };
          var token = _jsonwebtoken2['default'].sign(signObj, server.get('superSecret'), {});

          // return the information including token as JSON
          user.password = null;
          //delete user.password;
          res.json({
            success: true,
            message: 'Login Success!',
            user: user,
            //expires: expires,
            token: token
          });
        }
      }
    });
  });

  apiRoutes.post('/changepassword', function (req, res) {
    var mongoDBUserId = req.body.id;
    var token = req.body.token;
    console.log('server.REST.POST.changepassword()| userid, token:', mongoDBUserId, token);

    _modelsUser2['default'].findOne({
      _id: mongoDBUserId
    }, function (err, user) {

      if (err) {
        console.log('server.REST.POST.changepassword()| DB error:', err);
        return res.status(403).json({ success: false, message: 'Password reset failed. database exception.' });
      }

      if (!user) {
        res.status(403).json({ success: false, message: 'Password reset failed. User not found.' });
      } else if (user) {

        console.log('server.REST.POST.changepassword()| trying to authenticate token:', token);

        _jsonwebtoken2['default'].verify(token, user.jwt, function (jwtError, decoded) {
          if (jwtError) {
            return res.status(403).json({ success: false, message: 'Password reset failed. Failed to authenticate token.' });
          } else {
            console.log('server.REST.POST.changepassword()| token verified... decoded user:', decoded);
            // TODO: ALERT!!!! this is not at all secure, just pseudo security.
            var query = { _id: decoded._id };

            _modelsUser2['default'].findOneAndUpdate(query, { $set: { jwt: undefined, password: decoded.password } }, function (updateError, numRow) {
              console.log('server.REST.POST.changepassword()| mongoDB update:', numRow, updateError);
              if (updateError) {
                return res.status(500).json({ success: false, message: 'Password reset failed. Failed to authenticate token.', error: updateError });
              }
              return res.status(200).json({ success: true, message: 'Password reset Successful!!!' });
            });

            // console.log('Auth Success decoded:', decoded);
          }
        });
      }
    });
  });

  // route middleware to verify a token
  // all requests after this will be authenticated via token
  apiRoutes.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-closyaar-access-token'];

    // decode token
    if (token) {
      // verifies secret and checks exp
      _jsonwebtoken2['default'].verify(token, server.get('superSecret'), function (err, decoded) {
        if (err) {
          return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          // console.log('Auth Success decoded:', decoded);
          req.decoded = decoded;
          req.token = token;
          next();
        }
      });
    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });

  apiRoutes.get('/verify', function (req, res) {
    console.log('Server.apiRoutes() REST Call to /verify:', req.decoded);
    var mongoDBUserId = req.decoded.id;
    /*let validUser = {
      verified: true,
      user: req.decoded
    }
    return res.status(200).json(validUser);*/

    _modelsUser2['default'].findOne({
      _id: mongoDBUserId
    }, function (err, user) {

      if (err) {
        console.log('server.REST.POST.changepassword()| DB error:', err);
        return res.status(403).json({ success: false, message: 'user verification failed. database exception.' });
      }

      if (!user) {
        return res.status(403).json({ success: false, message: 'user verification failed. User not found.' });
      } else if (user) {

        console.log('server.REST.POST.changepassword()| User found:', user);
        user.password = null;
        var validUser = {
          verified: true,
          user: user
        };
        return res.status(200).json(validUser);
      }
    });
  });

  apiRoutes.get('/verifyusertoken', function (req, res) {
    var token = req.body.token || req.query.token || req.headers['x-closyaar-access-token'];
    console.log('Server.apiRoutes() REST Call to /verifyusertoken token==>', token);
    var userID = req.decoded.user.userid;

    _modelsUser2['default'].findOne({
      userid: userID
    }, function (err, user) {

      if (err) {
        throw err;
      }

      if (!user) {
        res.status(403).json({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // check if jwt matches
        if (user.jwt !== token) {
          res.status(403).json({ success: false, message: 'Authentication failed. Token did not match.' });
        } else {
          console.log('Server.apiRoutes() REST Call to /verifyusertoken: Authentication success...');
          // TODO: verify expiry
          return res.status(200).send({
            success: true,
            user: user
          });
        }
      }
    });
  });

  apiRoutes.get('/neighbourhoods', function (req, res) {
    _modelsNeighbourhood2['default'].find({}).exec(function (err, neighbourhoods) {
      if (err) {
        console.log('GET: /neighbourhoods -> mongoDB error:', err);
        res.status(404).json({ success: false, message: 'Neighbourhoods not found.' });
      } else {
        console.log('GET: /neighbourhoods -> fetched neighbourhoods:', neighbourhoods);
        res.json({ success: true, neighbourhoods: neighbourhoods });
      }
    });
    return res;
  });

  apiRoutes.get('/neighbourhood/:neighbourhood_id', function (req, res) {
    var neighbourhood_id = req.params.neighbourhood_id;
    console.log('GET: /neighbourhood -> neighbourhood id:', neighbourhood_id);
    _modelsNeighbourhood2['default'].find({ _id: neighbourhood_id }).exec(function (err, neighbourhood) {
      if (err) {
        console.log('neighbourhoods mongoDB error:', err);
        res.status(404).json({ success: false, message: 'Neighbourhood not found.' });
      } else {
        console.log('getting neighbourhoods', neighbourhood);
        res.json({ success: true, neighbourhoods: neighbourhood });
      }
    });
    return res;
  });

  apiRoutes.post('/neighbourhood/:neighbourhood_id*?', function (req, res) {
    // console.log('get users called');
    var neighbourhood = JSON.parse(req.body.neighbourhood);
    var userid = req.body.userid;
    var neighbourhood_id = req.params.neighbourhood_id;
    console.log('POST: /neighbourhood -> neighbourhood: ', neighbourhood);
    console.log('POST: /neighbourhood -> neighbourhood id:', neighbourhood_id);
    if (neighbourhood_id) {
      _modelsNeighbourhood2['default'].findOne({
        neighbourhoodid: neighbourhood_id
      }).exec(function (err, neighbourhood) {
        if (err) {
          console.log('POST: /neighbourhood -> neighbourhood mongoDB error:', err);
          res.status(500).json({ success: false, message: 'Neighbourhood not found.' });
        } else {
          console.log('POST: /neighbourhood -> updating neighbourhood', neighbourhood);

          res.json(neighbourhood);
        }
      });
    } else {
      console.log('POST: /neighbourhood -> neighbourhood polygon: ', neighbourhood.encodedpolygon);
      neighbourhood.createdby = userid;
      _modelsNeighbourhood2['default'].create(neighbourhood, function (err, neighbourhood) {
        if (err) {
          console.log('POST: /neighbourhood -> neighbourhood mongoDB error:', err);
          res.status(500).json({ success: false, message: 'Could not create neighbourhood.' });
        } else {
          console.log('POST: /neighbourhood -> neighbourhood created:', neighbourhood);
          console.log('POST: /neighbourhood -> Updating user:', userid);
          var query = { _id: userid };

          _modelsUser2['default'].findOneAndUpdate(query, { $set: { neighbourhood: neighbourhood._id } }, function (updateError, numRow) {
            console.log('POST: /neighbourhood ->  mongoDB update:', numRow, updateError);
            if (updateError) {
              res.status(500).json({ success: false, message: 'Neighbourhood created and user could not be set', neighbourhood: neighbourhood, error: updateError });
            }
            res.status(200).json({ success: true, message: 'Neighbourhood created and user updated successfully!!!', neighbourhood: neighbourhood });
          });
        }
      });
    }
    return res;
  });

  apiRoutes.get('/users', function (req, res) {
    // console.log('get users call (POST)ed');

    _modelsUser2['default'].find({}).exec(function (err, users) {
      if (err) {}
      // console.log('getting users', users);
      res.json(users);
    });
  });

  server.use('/api', apiRoutes);
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------

  // The top-level React component + HTML template for it
  var templateFile = _path2['default'].join(__dirname, 'templates/index.html');
  var template = _lodash2['default'].template(_fs2['default'].readFileSync(templateFile, 'utf8'));

  server.get('*', function callee$0$0(req, res, next) {
    var dt, router;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          dt = new Date();

          console.log('=============================================');
          console.log('server.server.get()| render start...', dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + ':' + dt.getMilliseconds());
          console.log('server.server.get()| req query string==>', req.query);
          console.log('server.server.get()| req cookies string==>', req.cookies.rememberuser);
          try {
            (function () {
              var isMobile = _utilsClientDetection2['default'].isMobile(req.headers['user-agent']);
              // console.log('Serverjs AMIT: isMobile:', isMobile);
              // TODO: Temporary fix #159
              // if (['/about', '/privacy'].indexOf(req.path) !== -1) {
              //   console.log('dd');
              //   await db.getPage(req.path);
              // }
              var notFound = false;
              var css = [];
              var data = { description: '' };
              /*
              let app = (<App
                path={req.path}
                isMobile={isMobile}
                context={{
                  onInsertCss: value => css.push(value),
                  onSetTitle: value => {data.title = value; },
                  onSetMeta: (key, value) => data[key] = value,
                  onPageNotFound: () => notFound = true
                }} />);
               data.body = React.renderToString(app);
              data.css = css.join('');
              
              let html = template(data);
              if (notFound) {
                res.status(404);
              }
              res.send(html);*/
              /*
              var appRoutes = (
                <Route path="/" handler={App}>
                    <Route name="login" handler={LoginPage}/>
                    <Route name="register" handler={RegisterPage}/>
                    <Route name="home" handler={HomePage}/>
                </Route>
              );*/
              console.log('server.server.get()| req.url:', req.params);
              router = _reactRouter2['default'].create({
                location: req.url,
                routes: _routesRoutes2['default'],
                onAbort: function onAbort(abortReason) {
                  console.log('server.Router.create().onAbort()| reason:', abortReason);
                  console.log('server.Router.create().onAbort()| instance of ', abortReason.constructor.name);
                  if (abortReason.constructor.name === 'Redirect') {
                    var url = this.makePath(abortReason.to, abortReason.params, abortReason.query);
                    url += '?redirect=' + abortReason.query;
                    console.log('server.Router.create().onAbort()| url: [', url, '] q:', abortReason.params);
                    res.redirect(url);
                  } else {
                    // TODO: review logic here
                    if (abortReason.reason === 'NOTLOGGED') {
                      var url = this.makePath('login');
                      res.redirect(url);
                    }
                  }
                },
                onError: function onError(err) {
                  console.log('server.Router.create().onError()| err, arguments:', err, arguments);
                }
              });

              console.log('server.server.get()| router created...');
              router.run(function (Handler, state) {
                console.log('server.Router.run()| router running...');
                console.log('server.Router.run()| router Query params:', state.query);

                data.body = _react2['default'].renderToString(_react2['default'].createElement(Handler, { rememberuser: req.cookies.rememberuser === 'true', context: {
                    onInsertCss: function onInsertCss(value) {
                      return css.push(value);
                    },
                    onSetTitle: function onSetTitle(value) {
                      data.title = value;
                    },
                    onSetMeta: function onSetMeta(key, value) {
                      return data[key] = value;
                    },
                    onPageNotFound: function onPageNotFound() {
                      notFound = true;console.log('PAGE NOT FOUND!!!!');
                    }
                  } }));
                data.css = css.join('');
                var html = template(data);
                if (notFound) {
                  res.status(404);
                }
                res.send(html);
                // --------------------
                var dt = new Date();
                console.log('server.server.get()| render end...', dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + ':' + dt.getMilliseconds());
                console.log('-------------------------------------------------');
                // --------------------
              });
            })();
          } catch (err) {
            // console.log('AMIT: server exception:', err);
            next(err);
          }

        case 6:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });

  //
  // Launch the server
  // -----------------------------------------------------------------------------

  server.listen(server.get('port'), function () {
    // console.log('AMIT: Listening to port:', server.get('port'));
    if (process.send) {
      // console.log('AMIT: going online');
      process.send('online');
    } else {}
  });

  //expiresInMinutes: minExpire //never expires

  //expiresInMinutes: minExpire //never expires

  // console.log('user mongoDB error:', err);

  // console.log('The server is running at http://localhost:' + server.get('port'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var global = typeof self != 'undefined' ? self : Function('return this')()
    , core   = {}
    , defineProperty = Object.defineProperty
    , hasOwnProperty = {}.hasOwnProperty
    , ceil  = Math.ceil
    , floor = Math.floor
    , max   = Math.max
    , min   = Math.min;
  // The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
  var DESC = !!function(){
    try {
      return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
    } catch(e){ /* empty */ }
  }();
  var hide = createDefiner(1);
  // 7.1.4 ToInteger
  function toInteger(it){
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }
  function desc(bitmap, value){
    return {
      enumerable  : !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable    : !(bitmap & 4),
      value       : value
    };
  }
  function simpleSet(object, key, value){
    object[key] = value;
    return object;
  }
  function createDefiner(bitmap){
    return DESC ? function(object, key, value){
      return $.setDesc(object, key, desc(bitmap, value));
    } : simpleSet;
  }

  function isObject(it){
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  }
  function isFunction(it){
    return typeof it == 'function';
  }
  function assertDefined(it){
    if(it == undefined)throw TypeError("Can't call method on  " + it);
    return it;
  }

  var $ = module.exports = __webpack_require__(77)({
    g: global,
    core: core,
    html: global.document && document.documentElement,
    // http://jsperf.com/core-js-isobject
    isObject:   isObject,
    isFunction: isFunction,
    that: function(){
      return this;
    },
    // 7.1.4 ToInteger
    toInteger: toInteger,
    // 7.1.15 ToLength
    toLength: function(it){
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
    },
    toIndex: function(index, length){
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    },
    has: function(it, key){
      return hasOwnProperty.call(it, key);
    },
    create:     Object.create,
    getProto:   Object.getPrototypeOf,
    DESC:       DESC,
    desc:       desc,
    getDesc:    Object.getOwnPropertyDescriptor,
    setDesc:    defineProperty,
    setDescs:   Object.defineProperties,
    getKeys:    Object.keys,
    getNames:   Object.getOwnPropertyNames,
    getSymbols: Object.getOwnPropertySymbols,
    assertDefined: assertDefined,
    // Dummy, fix for not array-like ES3 string in es5 module
    ES5Object: Object,
    toObject: function(it){
      return $.ES5Object(assertDefined(it));
    },
    hide: hide,
    def: createDefiner(0),
    set: global.Symbol ? simpleSet : hide,
    each: [].forEach
  });
  /* eslint-disable no-undef */
  if(typeof __e != 'undefined')__e = core;
  if(typeof __g != 'undefined')__g = global;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  var $          = __webpack_require__(1)
    , global     = $.g
    , core       = $.core
    , isFunction = $.isFunction
    , $redef     = __webpack_require__(13);
  function ctx(fn, that){
    return function(){
      return fn.apply(that, arguments);
    };
  }
  global.core = core;
  // type bitmap
  $def.F = 1;  // forced
  $def.G = 2;  // global
  $def.S = 4;  // static
  $def.P = 8;  // proto
  $def.B = 16; // bind
  $def.W = 32; // wrap
  function $def(type, name, source){
    var key, own, out, exp
      , isGlobal = type & $def.G
      , isProto  = type & $def.P
      , target   = isGlobal ? global : type & $def.S
          ? global[name] : (global[name] || {}).prototype
      , exports  = isGlobal ? core : core[name] || (core[name] = {});
    if(isGlobal)source = name;
    for(key in source){
      // contains in native
      own = !(type & $def.F) && target && key in target;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      if(type & $def.B && own)exp = ctx(out, global);
      else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
      // extend global
      if(target && !own)$redef(target, key, out);
      // export
      if(exports[key] != out)$.hide(exports, key, exp);
      if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
    }
  }
  module.exports = $def;

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  // eslint-disable-line no-unused-vars

  var _node_modulesReactLibInvariant = __webpack_require__(67);

  var _node_modulesReactLibInvariant2 = _interopRequireDefault(_node_modulesReactLibInvariant);

  var _node_modulesReactLibExecutionEnvironment = __webpack_require__(16);

  var count = 0;

  function withStyles(styles) {
    return function (ComposedComponent) {
      return (function () {
        _createClass(WithStyles, null, [{
          key: 'contextTypes',
          value: {
            onInsertCss: _react.PropTypes.func
          },
          enumerable: true
        }]);

        function WithStyles() {
          _classCallCheck(this, WithStyles);

          this.refCount = 0;
          ComposedComponent.prototype.renderCss = (function (css) {
            var style = undefined;
            if (_node_modulesReactLibExecutionEnvironment.canUseDOM) {
              if (this.styleId && (style = document.getElementById(this.styleId))) {
                if ('textContent' in style) {
                  style.textContent = css;
                } else {
                  style.styleSheet.cssText = css;
                }
              } else {
                this.styleId = 'dynamic-css-' + count++;
                style = document.createElement('style');
                style.setAttribute('id', this.styleId);
                style.setAttribute('type', 'text/css');

                if ('textContent' in style) {
                  style.textContent = css;
                } else {
                  style.styleSheet.cssText = css;
                }

                document.getElementsByTagName('head')[0].appendChild(style);
                this.refCount++;
              }
            } else {
              this.context.onInsertCss(css);
            }
          }).bind(this);
        }

        _createClass(WithStyles, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            if (_node_modulesReactLibExecutionEnvironment.canUseDOM) {
              (0, _node_modulesReactLibInvariant2['default'])(styles.use, 'The style-loader must be configured with reference-counted API.');
              styles.use();
            } else {
              this.context.onInsertCss(styles.toString());
            }
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            styles.unuse();
            if (this.styleId) {
              this.refCount--;
              if (this.refCount < 1) {
                var style = document.getElementById(this.styleId);
                if (style) {
                  style.parentNode.removeChild(style);
                }
              }
            }
          }
        }, {
          key: 'render',
          value: function render() {
            //console.log('withStyles called:', this.props);
            return _react2['default'].createElement(ComposedComponent, this.props);
          }
        }]);

        return WithStyles;
      })();
    };
  }

  exports['default'] = withStyles;
  module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];

  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};

  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(1);
  function assert(condition, msg1, msg2){
    if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
  }
  assert.def = $.assertDefined;
  assert.fn = function(it){
    if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
    return it;
  };
  assert.obj = function(it){
    if(!$.isObject(it))throw TypeError(it + ' is not an object!');
    return it;
  };
  assert.inst = function(it, Constructor, name){
    if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  module.exports = assert;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , TAG      = __webpack_require__(8)('toStringTag')
    , toString = {}.toString;
  function cof(it){
    return toString.call(it).slice(8, -1);
  }
  cof.classof = function(it){
    var O, T;
    return it == undefined ? it === undefined ? 'Undefined' : 'Null'
      : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
  };
  cof.set = function(it, tag, stat){
    if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
  };
  module.exports = cof;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  var global = __webpack_require__(1).g
    , store  = __webpack_require__(35)('wks');
  module.exports = function(name){
    return store[name] || (store[name] =
      global.Symbol && global.Symbol[name] || __webpack_require__(11).safe('Symbol.' + name));
  };

/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports) {

  module.exports = require("react-router");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  var sid = 0;
  function uid(key){
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
  }
  uid.safe = __webpack_require__(1).g.Symbol || uid;
  module.exports = uid;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $                 = __webpack_require__(1)
    , cof               = __webpack_require__(7)
    , classof           = cof.classof
    , assert            = __webpack_require__(6)
    , assertObject      = assert.obj
    , SYMBOL_ITERATOR   = __webpack_require__(8)('iterator')
    , FF_ITERATOR       = '@@iterator'
    , Iterators         = __webpack_require__(35)('iterators')
    , IteratorPrototype = {};
  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  setIterator(IteratorPrototype, $.that);
  function setIterator(O, value){
    $.hide(O, SYMBOL_ITERATOR, value);
    // Add iterator for FF iterator protocol
    if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
  }

  module.exports = {
    // Safari has buggy iterators w/o `next`
    BUGGY: 'keys' in [] && !('next' in [].keys()),
    Iterators: Iterators,
    step: function(done, value){
      return {value: value, done: !!done};
    },
    is: function(it){
      var O      = Object(it)
        , Symbol = $.g.Symbol;
      return (Symbol && Symbol.iterator || FF_ITERATOR) in O
        || SYMBOL_ITERATOR in O
        || $.has(Iterators, classof(O));
    },
    get: function(it){
      var Symbol = $.g.Symbol
        , getIter;
      if(it != undefined){
        getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
          || it[SYMBOL_ITERATOR]
          || Iterators[classof(it)];
      }
      assert($.isFunction(getIter), it, ' is not iterable!');
      return assertObject(getIter.call(it));
    },
    set: setIterator,
    create: function(Constructor, NAME, next, proto){
      Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
      cof.set(Constructor, NAME + ' Iterator');
    }
  };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  var $   = __webpack_require__(1)
    , tpl = String({}.hasOwnProperty)
    , SRC = __webpack_require__(11).safe('src')
    , _toString = Function.toString;

  function $redef(O, key, val, safe){
    if($.isFunction(val)){
      var base = O[key];
      $.hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));
      if(!('name' in val))val.name = key;
    }
    if(O === $.g){
      O[key] = val;
    } else {
      if(!safe)delete O[key];
      $.hide(O, key, val);
    }
  }

  // add fake Function#toString for correct work wrapped methods / constructors
  // with methods similar to LoDash isNative
  $redef(Function.prototype, 'toString', function toString(){
    return $.has(this, SRC) ? this[SRC] : _toString.call(this);
  });

  $.core.inspectSource = function(it){
    return _toString.call(it);
  };

  module.exports = $redef;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  // Optional / simple context binding
  var assertFunction = __webpack_require__(6).fn;
  module.exports = function(fn, that, length){
    assertFunction(fn);
    if(~length && that === undefined)return fn;
    switch(length){
      case 1: return function(a){
        return fn.call(that, a);
      };
      case 2: return function(a, b){
        return fn.call(that, a, b);
      };
      case 3: return function(a, b, c){
        return fn.call(that, a, b, c);
      };
    } return function(/* ...args */){
        return fn.apply(that, arguments);
      };
  };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES = __webpack_require__(8)('unscopables');
  if(!(UNSCOPABLES in []))__webpack_require__(1).hide(Array.prototype, UNSCOPABLES, {});
  module.exports = function(key){
    [][UNSCOPABLES][key] = true;
  };

/***/ },
/* 16 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ExecutionEnvironment
   */

  /*jslint evil: true */

  "use strict";

  var canUseDOM = !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
  );

  /**
   * Simple, lightweight module assisting with the detection and context of
   * Worker. Helps avoid circular dependencies and allows code to reason about
   * whether or not they are in a Worker, even if they never include the main
   * `ReactWorker` dependency.
   */
  var ExecutionEnvironment = {

    canUseDOM: canUseDOM,

    canUseWorkers: typeof Worker !== 'undefined',

    canUseEventListeners:
      canUseDOM && !!(window.addEventListener || window.attachEvent),

    canUseViewport: canUseDOM && !!window.screen,

    isInWorker: !canUseDOM // For now, this is true - might change in the future.

  };

  module.exports = ExecutionEnvironment;


/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  var ctx  = __webpack_require__(14)
    , get  = __webpack_require__(12).get
    , call = __webpack_require__(51);
  module.exports = function(iterable, entries, fn, that){
    var iterator = get(iterable)
      , f        = ctx(fn, that, entries ? 2 : 1)
      , step;
    while(!(step = iterator.next()).done){
      if(call(iterator, f, step.value, entries) === false){
        return call.close(iterator);
      }
    }
  };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _classnames = __webpack_require__(17);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _TextBoxLess = __webpack_require__(169);

  var _TextBoxLess2 = _interopRequireDefault(_TextBoxLess);

  var TextBox = (function () {
    function TextBox() {
      _classCallCheck(this, _TextBox);
    }

    _createClass(TextBox, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(this.props.className, 'TextBox') },
          _react2['default'].createElement(
            'span',
            { className: 'TextBox-span' },
            this.props.textboxLabel
          ),
          this.props.maxLines > 1 ? _react2['default'].createElement('textarea', _extends({}, this.props, { className: (0, _classnames2['default'])(this.props.controlClassName, 'TextBox-input'), ref: 'input', key: 'input', rows: this.props.maxLines })) : _react2['default'].createElement('input', _extends({}, this.props, { className: (0, _classnames2['default'])(this.props.controlClassName, 'TextBox-input'), ref: 'input', key: 'input' }))
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        maxLines: _react.PropTypes.number,
        textboxLabel: _react.PropTypes.string
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        maxLines: 1
      },
      enumerable: true
    }]);

    var _TextBox = TextBox;
    TextBox = (0, _decoratorsWithStyles2['default'])(_TextBoxLess2['default'])(TextBox) || TextBox;
    return TextBox;
  })();

  exports['default'] = TextBox;
  module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _reactLibKeyMirror = __webpack_require__(68);

  var _reactLibKeyMirror2 = _interopRequireDefault(_reactLibKeyMirror);

  exports['default'] = (0, _reactLibKeyMirror2['default'])({
    GET_PAGE: null,
    RECEIVE_PAGE: null,
    CHANGE_LOCATION: null,
    LOGIN_USER: null,
    LOGOUT_USER: null,
    SIGNUP_USER: null,
    LOGIN_FAILED: null,
    TOKEN_VERIFIED: null
  });
  module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _storesLoginStore = __webpack_require__(24);

  var _storesLoginStore2 = _interopRequireDefault(_storesLoginStore);

  var _actionsAppActions = __webpack_require__(130);

  var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

  var _reactLibExecutionEnvironment = __webpack_require__(16);

  function withAuthentication(ComposedComponent) {
    return (function (_React$Component) {
      _inherits(withAuthentication, _React$Component);

      _createClass(withAuthentication, null, [{
        key: 'willTransitionTo',

        // This method is called before transitioning to this component. If the user is not logged in, we’ll send him or her
        // to the Login page.
        /*static willTransitionTo() {
          console.log('AMIMT withAuthentication:', LoginStore.isLoggedIn());
          if (!LoginStore.isLoggedIn()) {
            console.log('AMIMT withAuthentication: user not logged in');
            AppActions.navigateTo('/login');
            //AppActions.redirect('/login', {}, {'nextPath': transition.path});
          }
        }*/
        value: function willTransitionTo(transition) {
          console.log('withAuthentication.willTransitionTo()| userLoggedin?:', _storesLoginStore2['default'].isLoggedIn());
          console.log('withAuthentication.willTransitionTo()| transition:', transition);
          console.log('withAuthentication.willTransitionTo()| canUseDOM:', _reactLibExecutionEnvironment.canUseDOM);
          if (!_storesLoginStore2['default'].isLoggedIn()) {
            console.log('withAuthentication.willTransitionTo()| user not logged in, will transition to this path after login:', transition.path);
            transition.redirect('login', {}, transition.path);
          }
        }
      }]);

      function withAuthentication() {
        _classCallCheck(this, withAuthentication);

        _get(Object.getPrototypeOf(withAuthentication.prototype), 'constructor', this).call(this);
        this.state = this._getLoginState();
      }

      _createClass(withAuthentication, [{
        key: '_getLoginState',
        value: function _getLoginState() {
          return {
            userLoggedIn: _storesLoginStore2['default'].isLoggedIn(),
            user: _storesLoginStore2['default'].user,
            jwt: _storesLoginStore2['default'].jwt
          };
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.changeListener = this._onChange.bind(this);
          _storesLoginStore2['default'].addChangeListener(this.changeListener);
        }
      }, {
        key: '_onChange',
        value: function _onChange() {
          this.setState(this._getLoginState());
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          _storesLoginStore2['default'].removeChangeListener(this.changeListener);
        }
      }, {
        key: 'render',
        value: function render() {
          // if(this.state.userLoggedIn) {
          return _react2['default'].createElement(ComposedComponent, _extends({}, this.props, {
            user: this.state.user,
            jwt: this.state.jwt,
            userLoggedIn: this.state.userLoggedIn }));
          //} else {
          //  withAuthentication.willTransitionTo();
          //}
        }
      }]);

      return withAuthentication;
    })(_react2['default'].Component);
  }

  exports['default'] = withAuthentication;
  module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _flux = __webpack_require__(70);

  exports['default'] = new _flux.Dispatcher();
  module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _superagent = __webpack_require__(30);

  var _superagent2 = _interopRequireDefault(_superagent);

  var _actionsLoginAction = __webpack_require__(58);

  var _actionsLoginAction2 = _interopRequireDefault(_actionsLoginAction);

  var _jsonwebtoken = __webpack_require__(72);

  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

  var AuthService = (function () {
    function AuthService() {
      _classCallCheck(this, AuthService);
    }

    _createClass(AuthService, [{
      key: 'verifyJWT',
      value: function verifyJWT(jwt) {
        if (jwt) {
          _superagent2['default'].get('/api/verify').set('x-closyaar-access-token', jwt).end(function (err, response) {
            console.log('AuthService. rest call|  err, response', err, response);
            if (!err && response && response.body && response.body.verified) {
              console.log('AuthService.verifyJWT()| JWT verification success!!!');

              _actionsLoginAction2['default'].loginUser(jwt, response.body.user);
            } else {
              console.log('AuthService.verifyJWT()| JWT verification Fail!!!');
              _actionsLoginAction2['default'].loginFailed();
            }
            // console.log('LoginAction.loginUser()| RouterContainer.get().getCurrentQuery():', RouterContainer.get().getCurrentPathname());
            // var nextPath = RouterContainer.get().getCurrentQuery() && RouterContainer.get().getCurrentQuery().redirect || '/';
            // console.log('LoginAction.loginUser()| nextPath:', nextPath);
            // RouterContainer.get().transitionTo(nextPath);
          });
        }
      }
    }, {
      key: 'login',
      value: function login(username, password, errorCb) {
        console.log('AuthService.login()| Trying login user with', username, password);

        _superagent2['default'].post('/api/authenticate').type('form').send({
          userid: username,
          password: password
        }).set('Accept', 'application/json').end(function (err, response) {
          console.log('AuthService.login()|  err, response', err, response);
          if (!err && response && response.body && response.body.success) {
            console.log('AuthService.login()| Authentication success!!!');
            // We get a JWT back.
            var _jwt = response.body.token;
            // We trigger the LoginAction with that JWT.
            _actionsLoginAction2['default'].loginUser(_jwt, response.body.user);
            return true;
          } else {
            console.log('AuthService.login()| Authentication Failed!!!');
            errorCb();
          }
        });
        // We call the server to log the user in.
        /*
        return when(request({
          url: '/api/authenticate',
          method: 'POST',
          crossOrigin: true,
          type: 'json',
          data: {
            userid: username,
            password: password
          }
        }))
        .then(function(response) {
            console.log('AMIT AuthService', response);
            // We get a JWT back.
            let jwt = response.token;
            // We trigger the LoginAction with that JWT.
            LoginActions.loginUser(jwt);
            return true;
        });*/
      }
    }, {
      key: 'logout',
      value: function logout() {
        _actionsLoginAction2['default'].logoutUser();
      }
    }, {
      key: 'signUp',
      value: function signUp(user, errorCb) {
        console.log('AuthService.signUp()| Trying signUp user:', user);
        _superagent2['default'].post('/api/signup').type('form').send(user).set('Accept', 'application/json').end(function (err, response) {
          console.log('AuthService.signUp()|  err, response', err, response);
          if (!err && response && response.body && response.body.success) {
            console.log('AuthService.signUp()| signUp success!!!');
            // We get a JWT back.
            //let jwt = response.body.token;
            // We trigger the LoginAction with that JWT.
            _actionsLoginAction2['default'].signUpUser(user);
            return true;
          } else {
            console.log('AuthService.signUp()| signUp Failed!!!');
            errorCb(response);
          }
        });
      }
    }, {
      key: 'changePassword',
      value: function changePassword(user, cb) {
        console.log('AuthService.changePassword()| Trying changePassword for user:', user);
        // TODO: implement SSL. For the time being doing a pseudo security

        var token = _jsonwebtoken2['default'].sign(user, user.jwt);

        console.log('AuthService.changePassword()| jwt:', user.jwt);
        console.log('AuthService.changePassword()| token:', token);

        _superagent2['default'].post('/api/changepassword').type('form').send({
          id: user._id,
          token: token
        }).set('Accept', 'application/json').end(function (err, response) {
          console.log('AuthService.changePassword()|  err, response', err, response);
          if (!err && response && response.body && response.body.success) {
            console.log('AuthService.changePassword()| changePassword success!!!');
            // We get a JWT back.
            //let jwt = response.body.token;
            // We trigger the LoginAction with that JWT.
          } else {
            console.log('AuthService.changePassword()| changePassword Failed!!!');
          }
          cb(response.body);
        });
      }
    }]);

    return AuthService;
  })();

  exports['default'] = new AuthService();
  module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _constantsActionTypes = __webpack_require__(20);

  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

  var _BaseStore2 = __webpack_require__(40);

  var _BaseStore3 = _interopRequireDefault(_BaseStore2);

  //import jwt_decode from 'jwt-decode';

  var LoginStore = (function (_BaseStore) {
    _inherits(LoginStore, _BaseStore);

    function LoginStore() {
      var _this = this;

      _classCallCheck(this, LoginStore);

      _get(Object.getPrototypeOf(LoginStore.prototype), 'constructor', this).call(this);
      console.log('LoginStore.constructor()');
      this.subscribe(function () {
        return _this._registerToActions.bind(_this);
      });
      this._user = null;
      this._jwt = null;
      this._isloggedin = null;
      this._failedLogin = null;
    }

    _createClass(LoginStore, [{
      key: '_registerToActions',
      value: function _registerToActions(action) {
        console.log('LoginStore._registerToActions()| dispatchToken:', action);
        switch (action.type) {
          case _constantsActionTypes2['default'].LOGIN_FAILED:
            this._failedLogin = true;
            this.emitChange();
            break;
          case _constantsActionTypes2['default'].LOGIN_USER:
            //console.log('AMIT LOGINSTORE: emitchange with jwt', action.jwt);
            this._jwt = action.jwt;
            this._user = action.user;
            this._isloggedin = true;
            //this._user = jwt_decode(this._jwt);
            this.emitChange();
            break;
          case _constantsActionTypes2['default'].LOGOUT_USER:
            this._user = null;
            this._isloggedin = false;
            this.emitChange();
            break;
          case _constantsActionTypes2['default'].SIGNUP_USER:
            this._user = action.user;
            this.emitChange();
            break;
          case _constantsActionTypes2['default'].TOKEN_VERIFIED:
            this._user = action.user;
            this.emitChange();
          default:
            break;
        }
      }
    }, {
      key: 'isLoginFailed',
      value: function isLoginFailed() {
        return this._failedLogin;
      }
    }, {
      key: 'isLoggedIn',
      value: function isLoggedIn() {
        //console.log('LoginStore.isLoggedIn()| :', this._isloggedin);
        return this._isloggedin;
      }
    }, {
      key: 'user',
      get: function get() {
        return this._user;
      }
    }, {
      key: 'jwt',
      get: function get() {
        return this._jwt;
      }
    }]);

    return LoginStore;
  })(_BaseStore3['default']);

  exports['default'] = new LoginStore();
  module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex
  var $   = __webpack_require__(1)
    , ctx = __webpack_require__(14);
  module.exports = function(TYPE){
    var IS_MAP        = TYPE == 1
      , IS_FILTER     = TYPE == 2
      , IS_SOME       = TYPE == 3
      , IS_EVERY      = TYPE == 4
      , IS_FIND_INDEX = TYPE == 6
      , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
    return function($this, callbackfn, that){
      var O      = Object($.assertDefined($this))
        , self   = $.ES5Object(O)
        , f      = ctx(callbackfn, that, 3)
        , length = $.toLength(self.length)
        , index  = 0
        , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
        , val, res;
      for(;length > index; index++)if(NO_HOLES || index in self){
        val = self[index];
        res = f(val, index, O);
        if(TYPE){
          if(IS_MAP)result[index] = res;            // map
          else if(res)switch(TYPE){
            case 3: return true;                    // some
            case 5: return val;                     // find
            case 6: return index;                   // findIndex
            case 2: result.push(val);               // filter
          } else if(IS_EVERY)return false;          // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $     = __webpack_require__(1)
    , $def  = __webpack_require__(2)
    , BUGGY = __webpack_require__(12).BUGGY
    , forOf = __webpack_require__(18)
    , species = __webpack_require__(29)
    , assertInstance = __webpack_require__(6).inst;

  module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
    var Base  = $.g[NAME]
      , C     = Base
      , ADDER = IS_MAP ? 'set' : 'add'
      , proto = C && C.prototype
      , O     = {};
    function fixMethod(KEY){
      var fn = proto[KEY];
      __webpack_require__(13)(proto, KEY,
        KEY == 'delete' ? function(a){ return fn.call(this, a === 0 ? 0 : a); }
        : KEY == 'has' ? function has(a){ return fn.call(this, a === 0 ? 0 : a); }
        : KEY == 'get' ? function get(a){ return fn.call(this, a === 0 ? 0 : a); }
        : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
      );
    }
    if(!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
      // create collection constructor
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      __webpack_require__(28)(C.prototype, methods);
    } else {
      var inst  = new C
        , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
        , buggyZero;
      // wrap for init collections from iterable
      if(!__webpack_require__(32)(function(iter){ new C(iter); })){ // eslint-disable-line no-new
        C = wrapper(function(target, iterable){
          assertInstance(target, C, NAME);
          var that = new Base;
          if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
          return that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }
      IS_WEAK || inst.forEach(function(val, key){
        buggyZero = 1 / key === -Infinity;
      });
      // fix converting -0 key to +0
      if(buggyZero){
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }
      // + fix .add & .set for chaining
      if(buggyZero || chain !== inst)fixMethod(ADDER);
    }

    __webpack_require__(7).set(C, NAME);

    O[NAME] = C;
    $def($def.G + $def.W + $def.F * (C != Base), O);
    species(C);
    species($.core[NAME]); // for wrapper

    if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);

    return C;
  };

/***/ },
/* 27 */
/***/ function(module, exports) {

  // Fast apply
  // http://jsperf.lnkit.com/fast-apply/5
  module.exports = function(fn, args, that){
    var un = that === undefined;
    switch(args.length){
      case 0: return un ? fn()
                        : fn.call(that);
      case 1: return un ? fn(args[0])
                        : fn.call(that, args[0]);
      case 2: return un ? fn(args[0], args[1])
                        : fn.call(that, args[0], args[1]);
      case 3: return un ? fn(args[0], args[1], args[2])
                        : fn.call(that, args[0], args[1], args[2]);
      case 4: return un ? fn(args[0], args[1], args[2], args[3])
                        : fn.call(that, args[0], args[1], args[2], args[3]);
      case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
                        : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
    } return              fn.apply(that, args);
  };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  var $redef = __webpack_require__(13);
  module.exports = function(target, src){
    for(var key in src)$redef(target, key, src[key]);
    return target;
  };

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  var $       = __webpack_require__(1)
    , SPECIES = __webpack_require__(8)('species');
  module.exports = function(C){
    if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
      configurable: true,
      get: $.that
    });
  };

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("superagent");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  var $def            = __webpack_require__(2)
    , $redef          = __webpack_require__(13)
    , $               = __webpack_require__(1)
    , cof             = __webpack_require__(7)
    , $iter           = __webpack_require__(12)
    , SYMBOL_ITERATOR = __webpack_require__(8)('iterator')
    , FF_ITERATOR     = '@@iterator'
    , KEYS            = 'keys'
    , VALUES          = 'values'
    , Iterators       = $iter.Iterators;
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
    $iter.create(Constructor, NAME, next);
    function createMethod(kind){
      function $$(that){
        return new Constructor(that, kind);
      }
      switch(kind){
        case KEYS: return function keys(){ return $$(this); };
        case VALUES: return function values(){ return $$(this); };
      } return function entries(){ return $$(this); };
    }
    var TAG      = NAME + ' Iterator'
      , proto    = Base.prototype
      , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
      , _default = _native || createMethod(DEFAULT)
      , methods, key;
    // Fix native
    if(_native){
      var IteratorPrototype = $.getProto(_default.call(new Base));
      // Set @@toStringTag to native iterators
      cof.set(IteratorPrototype, TAG, true);
      // FF fix
      if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
    }
    // Define iterator
    if($.FW || FORCE)$iter.set(proto, _default);
    // Plug for library
    Iterators[NAME] = _default;
    Iterators[TAG]  = $.that;
    if(DEFAULT){
      methods = {
        keys:    IS_SET            ? _default : createMethod(KEYS),
        values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
        entries: DEFAULT != VALUES ? _default : createMethod('entries')
      };
      if(FORCE)for(key in methods){
        if(!(key in proto))$redef(proto, key, methods[key]);
      } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
    }
  };

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  var SYMBOL_ITERATOR = __webpack_require__(8)('iterator')
    , SAFE_CLOSING    = false;
  try {
    var riter = [7][SYMBOL_ITERATOR]();
    riter['return'] = function(){ SAFE_CLOSING = true; };
    Array.from(riter, function(){ throw 2; });
  } catch(e){ /* empty */ }
  module.exports = function(exec){
    if(!SAFE_CLOSING)return false;
    var safe = false;
    try {
      var arr  = [7]
        , iter = arr[SYMBOL_ITERATOR]();
      iter.next = function(){ safe = true; };
      arr[SYMBOL_ITERATOR] = function(){ return iter; };
      exec(arr);
    } catch(e){ /* empty */ }
    return safe;
  };

/***/ },
/* 33 */
/***/ function(module, exports) {

  'use strict';
  module.exports = function(regExp, replace, isStatic){
    var replacer = replace === Object(replace) ? function(part){
      return replace[part];
    } : replace;
    return function(it){
      return String(isStatic ? it : this).replace(regExp, replacer);
    };
  };

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var $      = __webpack_require__(1)
    , assert = __webpack_require__(6);
  function check(O, proto){
    assert.obj(O);
    assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
  }
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
      ? function(buggy, set){
          try {
            set = __webpack_require__(14)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
            set({}, []);
          } catch(e){ buggy = true; }
          return function setPrototypeOf(O, proto){
            check(O, proto);
            if(buggy)O.__proto__ = proto;
            else set(O, proto);
            return O;
          };
        }()
      : undefined),
    check: check
  };

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  var $      = __webpack_require__(1)
    , SHARED = '__core-js_shared__'
    , store  = $.g[SHARED] || ($.g[SHARED] = {});
  module.exports = function(key){
    return store[key] || (store[key] = {});
  };

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  // true  -> String#at
  // false -> String#codePointAt
  var $ = __webpack_require__(1);
  module.exports = function(TO_STRING){
    return function(that, pos){
      var s = String($.assertDefined(that))
        , i = $.toInteger(pos)
        , l = s.length
        , a, b;
      if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l
        || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
          ? TO_STRING ? s.charAt(i) : a
          : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

/***/ },
/* 37 */
/***/ function(module, exports) {

  module.exports = function(exec){
    try {
      exec();
      return false;
    } catch(e){
      return true;
    }
  };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _LoginPageLess = __webpack_require__(160);

  var _LoginPageLess2 = _interopRequireDefault(_LoginPageLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _Login = __webpack_require__(136);

  var _Login2 = _interopRequireDefault(_Login);

  var _LoadingPage = __webpack_require__(135);

  var _LoadingPage2 = _interopRequireDefault(_LoadingPage);

  var _RegisterPage = __webpack_require__(39);

  var _RegisterPage2 = _interopRequireDefault(_RegisterPage);

  var _servicesRouterContainer = __webpack_require__(66);

  var _servicesRouterContainer2 = _interopRequireDefault(_servicesRouterContainer);

  var _storesLoginStore = __webpack_require__(24);

  var _storesLoginStore2 = _interopRequireDefault(_storesLoginStore);

  var _reactLibExecutionEnvironment = __webpack_require__(16);

  // import Link from '../../utils/Link';
  // import AppActions from '../../actions/AppActions';
  // import AuthService from '../../auth/AuthService';

  var LoginPage = (function (_Component) {
    _inherits(LoginPage, _Component);

    _createClass(LoginPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    function LoginPage() {
      _classCallCheck(this, _LoginPage);

      _get(Object.getPrototypeOf(_LoginPage.prototype), 'constructor', this).call(this);
      this.state = {
        failed: false
      };
    }

    _createClass(LoginPage, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _storesLoginStore2['default'].removeChangeListener(this.changeListener);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.changeListener = this._onLoginStoreChange.bind(this);
        _storesLoginStore2['default'].addChangeListener(this.changeListener);
      }
    }, {
      key: '_onLoginStoreChange',
      value: function _onLoginStoreChange() {
        console.log('LoginPage._onLoginStoreChange()| LoginStore changed!!! isLoginFailed?', _storesLoginStore2['default'].isLoginFailed());
        if (_storesLoginStore2['default'].isLoginFailed()) {
          this.setState({ failed: true });
        }
        if (_storesLoginStore2['default'].isLoggedIn()) {
          console.log('LoginPage._onLoginStoreChange()| RouterContainer.get().getCurrentQuery():', _servicesRouterContainer2['default'].get().getCurrentQuery());
          var nextPath = _servicesRouterContainer2['default'].get().getCurrentQuery() && _servicesRouterContainer2['default'].get().getCurrentQuery().redirect || '/';
          console.log('LoginPage._onLoginStoreChange()| nextPath:', nextPath);
          _servicesRouterContainer2['default'].get().transitionTo(nextPath);
        }
        //this.setState(this._getLoginState());
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate() {
        console.log('LoginPage.componentWillUpdate()|', _storesLoginStore2['default'].isLoggedIn());
        // if(LoginStore.isLoggedIn()) {
        //   console.log('LoginPage.componentWillUpdate()| RouterContainer.get().getCurrentQuery():', RouterContainer.get().getCurrentQuery());
        //   var nextPath = RouterContainer.get().getCurrentQuery() && RouterContainer.get().getCurrentQuery().redirect || '/';
        //   console.log('LoginPage.componentWillUpdate()| nextPath:', nextPath);
        //   RouterContainer.get().transitionTo(nextPath);
        // }
      }
    }, {
      key: 'render',
      value: function render() {

        console.log('LoginPage.render()| state', this.state);
        console.log('LoginPage.render()| props', this.props);
        console.log('LoginPage.render()| loading page?', this.props.rememberuser && !this.state.failed);

        var title = 'Login to Closyaar';
        this.context.onSetTitle(title);
        return this.props.rememberuser && !this.state.failed ? _react2['default'].createElement(_LoadingPage2['default'], null) : _react2['default'].createElement(
          'div',
          { className: 'LoginPage' },
          _react2['default'].createElement(_Login2['default'], { className: 'Login' }),
          _react2['default'].createElement(_RegisterPage2['default'], { className: 'Register' })
        );
      }
    }]);

    var _LoginPage = LoginPage;
    LoginPage = (0, _decoratorsWithStyles2['default'])(_LoginPageLess2['default'])(LoginPage) || LoginPage;
    return LoginPage;
  })(_react.Component);

  exports['default'] = LoginPage;
  module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _RegisterPageLess = __webpack_require__(167);

  var _RegisterPageLess2 = _interopRequireDefault(_RegisterPageLess);

  var _TextBox = __webpack_require__(19);

  var _TextBox2 = _interopRequireDefault(_TextBox);

  var _classnames = __webpack_require__(17);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _servicesAuthService = __webpack_require__(23);

  var _servicesAuthService2 = _interopRequireDefault(_servicesAuthService);

  var _storesLoginStore = __webpack_require__(24);

  var _storesLoginStore2 = _interopRequireDefault(_storesLoginStore);

  var RegisterPage = (function (_React$Component) {
    _inherits(RegisterPage, _React$Component);

    _createClass(RegisterPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    function RegisterPage() {
      _classCallCheck(this, _RegisterPage);

      _get(Object.getPrototypeOf(_RegisterPage.prototype), 'constructor', this).call(this);
      this.state = {
        name: '',
        email: '',
        address: '',
        signUpError: false
      };
    }

    _createClass(RegisterPage, [{
      key: '_getUser',
      value: function _getUser() {
        return _storesLoginStore2['default'].user;
      }
    }, {
      key: '_onchange',
      value: function _onchange(event) {
        //console.log('RegisterPage._onchange()| event:', event.target);
        var controlState = {};
        controlState[event.target.id] = event.target.value;
        //console.log('RegisterPage._onchange()| controlState:', controlState);
        this.setState(controlState);
      }
    }, {
      key: 'signUp',
      value: function signUp(e) {
        var _this = this;

        e.preventDefault();

        //alert(this.state);
        console.log('RegisterPage.signUp()| state:', this.state, e);
        if (this.state.name && this.state.email) {
          var user = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address
          };
          _servicesAuthService2['default'].signUp(user, function (response) {
            console.log('AMIT response:', response);
            _this.setState({ signUpError: response.body });
          });
        } else {
          this.setState({ signUpError: {
              message: 'Name and Email are mandatory'
            } });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        console.log('RegisterPage.render()| signUpError:', this.state.signUpError);
        var title = 'New User Registration!';
        this.context.onSetTitle(title);
        var user = this._getUser();
        var component = undefined;
        if (user) {
          //let userEmail = ;
          component = _react2['default'].createElement(
            'div',
            null,
            'Hello ',
            _react2['default'].createElement(
              'b',
              null,
              user.name
            ),
            ', ',
            _react2['default'].createElement('br', null),
            'We have sent the verification email to ',
            _react2['default'].createElement(
              'a',
              { href: 'mailto:' + user.email },
              user.email
            ),
            '. Please fllow the instruction provided in the email to complete your registration'
          );
        } else {
          var errorComponent = undefined;
          if (this.state.signUpError && !this.state.signUpError.success) {
            errorComponent = _react2['default'].createElement(
              'div',
              { className: 'RegisterPage-error' },
              _react2['default'].createElement(
                'b',
                null,
                this.state.signUpError.message
              )
            );
          }

          component = _react2['default'].createElement(
            'form',
            null,
            _react2['default'].createElement(
              'b',
              null,
              title
            ),
            errorComponent,
            _react2['default'].createElement(_TextBox2['default'], { id: 'name', className: 'RegisterPage-textbox', ref: 'name', value: this.name, type: 'text', placeholder: 'Name', onChange: this._onchange.bind(this) }),
            _react2['default'].createElement(_TextBox2['default'], { id: 'email', className: 'RegisterPage-textbox', ref: 'email', value: this.email, type: 'text', placeholder: 'email id', onChange: this._onchange.bind(this) }),
            _react2['default'].createElement(_TextBox2['default'], { id: 'address', className: 'RegisterPage-textbox', ref: 'address', value: this.address, type: 'text', placeholder: 'address', maxLines: 3, onChange: this._onchange.bind(this) }),
            _react2['default'].createElement('input', { type: 'submit', value: 'Sign up', onClick: this.signUp.bind(this) })
          );
        }
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(this.props.className, 'RegisterPage-container') },
          component
        );
      }
    }]);

    var _RegisterPage = RegisterPage;
    RegisterPage = (0, _decoratorsWithStyles2['default'])(_RegisterPageLess2['default'])(RegisterPage) || RegisterPage;
    return RegisterPage;
  })(_react2['default'].Component);

  exports['default'] = RegisterPage;
  module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _events = __webpack_require__(42);

  var _dispatchersDispatcher = __webpack_require__(22);

  var _dispatchersDispatcher2 = _interopRequireDefault(_dispatchersDispatcher);

  var BaseStore = (function (_EventEmitter) {
    _inherits(BaseStore, _EventEmitter);

    function BaseStore() {
      _classCallCheck(this, BaseStore);

      _get(Object.getPrototypeOf(BaseStore.prototype), 'constructor', this).call(this);
      // console.log('BaseStore constructor');
    }

    _createClass(BaseStore, [{
      key: 'subscribe',
      value: function subscribe(actionSubscribe) {
        this._dispatchToken = _dispatchersDispatcher2['default'].register(actionSubscribe());
      }
    }, {
      key: 'emitChange',
      value: function emitChange() {
        this.emit('CHANGE');
      }
    }, {
      key: 'addChangeListener',
      value: function addChangeListener(cb) {
        this.on('CHANGE', cb);
      }
    }, {
      key: 'removeChangeListener',
      value: function removeChangeListener(cb) {
        this.removeListener('CHANGE', cb);
      }
    }, {
      key: 'dispatchToken',
      get: function get() {
        return this._dispatchToken;
      }
    }]);

    return BaseStore;
  })(_events.EventEmitter);

  exports['default'] = BaseStore;
  module.exports = exports['default'];

/***/ },
/* 41 */,
/* 42 */
/***/ function(module, exports) {

  module.exports = require("events");

/***/ },
/* 43 */
/***/ function(module, exports) {

  module.exports = require("mongoose");

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  // false -> Array#indexOf
  // true  -> Array#includes
  var $ = __webpack_require__(1);
  module.exports = function(IS_INCLUDES){
    return function($this, el, fromIndex){
      var O      = $.toObject($this)
        , length = $.toLength(O.length)
        , index  = $.toIndex(fromIndex, length)
        , value;
      if(IS_INCLUDES && el != el)while(length > index){
        value = O[index++];
        if(value != value)return true;
      } else for(;length > index; index++)if(IS_INCLUDES || index in O){
        if(O[index] === el)return IS_INCLUDES || index;
      } return !IS_INCLUDES && -1;
    };
  };

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $        = __webpack_require__(1)
    , ctx      = __webpack_require__(14)
    , safe     = __webpack_require__(11).safe
    , assert   = __webpack_require__(6)
    , forOf    = __webpack_require__(18)
    , step     = __webpack_require__(12).step
    , $has     = $.has
    , set      = $.set
    , isObject = $.isObject
    , hide     = $.hide
    , isExtensible = Object.isExtensible || isObject
    , ID       = safe('id')
    , O1       = safe('O1')
    , LAST     = safe('last')
    , FIRST    = safe('first')
    , ITER     = safe('iter')
    , SIZE     = $.DESC ? safe('size') : 'size'
    , id       = 0;

  function fastKey(it, create){
    // return primitive with prefix
    if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if(!$has(it, ID)){
      // can't set id to frozen object
      if(!isExtensible(it))return 'F';
      // not necessary to add id
      if(!create)return 'E';
      // add missing object id
      hide(it, ID, ++id);
    // return object id with prefix
    } return 'O' + it[ID];
  }

  function getEntry(that, key){
    // fast case
    var index = fastKey(key), entry;
    if(index !== 'F')return that[O1][index];
    // frozen object case
    for(entry = that[FIRST]; entry; entry = entry.n){
      if(entry.k == key)return entry;
    }
  }

  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
      var C = wrapper(function(that, iterable){
        assert.inst(that, C, NAME);
        set(that, O1, $.create(null));
        set(that, SIZE, 0);
        set(that, LAST, undefined);
        set(that, FIRST, undefined);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
      });
      __webpack_require__(28)(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear(){
          for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
            entry.r = true;
            if(entry.p)entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that[FIRST] = that[LAST] = undefined;
          that[SIZE] = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function(key){
          var that  = this
            , entry = getEntry(that, key);
          if(entry){
            var next = entry.n
              , prev = entry.p;
            delete that[O1][entry.i];
            entry.r = true;
            if(prev)prev.n = next;
            if(next)next.p = prev;
            if(that[FIRST] == entry)that[FIRST] = next;
            if(that[LAST] == entry)that[LAST] = prev;
            that[SIZE]--;
          } return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /*, that = undefined */){
          var f = ctx(callbackfn, arguments[1], 3)
            , entry;
          while(entry = entry ? entry.n : this[FIRST]){
            f(entry.v, entry.k, this);
            // revert to the last existing entry
            while(entry && entry.r)entry = entry.p;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key){
          return !!getEntry(this, key);
        }
      });
      if($.DESC)$.setDesc(C.prototype, 'size', {
        get: function(){
          return assert.def(this[SIZE]);
        }
      });
      return C;
    },
    def: function(that, key, value){
      var entry = getEntry(that, key)
        , prev, index;
      // change existing entry
      if(entry){
        entry.v = value;
      // create new entry
      } else {
        that[LAST] = entry = {
          i: index = fastKey(key, true), // <- index
          k: key,                        // <- key
          v: value,                      // <- value
          p: prev = that[LAST],          // <- previous entry
          n: undefined,                  // <- next entry
          r: false                       // <- removed
        };
        if(!that[FIRST])that[FIRST] = entry;
        if(prev)prev.n = entry;
        that[SIZE]++;
        // add to index
        if(index !== 'F')that[O1][index] = entry;
      } return that;
    },
    getEntry: getEntry,
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    setIter: function(C, NAME, IS_MAP){
      __webpack_require__(31)(C, NAME, function(iterated, kind){
        set(this, ITER, {o: iterated, k: kind});
      }, function(){
        var iter  = this[ITER]
          , kind  = iter.k
          , entry = iter.l;
        // revert to the last existing entry
        while(entry && entry.r)entry = entry.p;
        // get next entry
        if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
          // or finish the iteration
          iter.o = undefined;
          return step(1);
        }
        // return step by kind
        if(kind == 'keys'  )return step(0, entry.k);
        if(kind == 'values')return step(0, entry.v);
        return step(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
    }
  };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  var $def  = __webpack_require__(2)
    , forOf = __webpack_require__(18);
  module.exports = function(NAME){
    $def($def.P, NAME, {
      toJSON: function toJSON(){
        var arr = [];
        forOf(this, false, arr.push, arr);
        return arr;
      }
    });
  };

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $         = __webpack_require__(1)
    , safe      = __webpack_require__(11).safe
    , assert    = __webpack_require__(6)
    , forOf     = __webpack_require__(18)
    , $has      = $.has
    , isObject  = $.isObject
    , hide      = $.hide
    , isExtensible = Object.isExtensible || isObject
    , id        = 0
    , ID        = safe('id')
    , WEAK      = safe('weak')
    , LEAK      = safe('leak')
    , method    = __webpack_require__(25)
    , find      = method(5)
    , findIndex = method(6);
  function findFrozen(store, key){
    return find(store.array, function(it){
      return it[0] === key;
    });
  }
  // fallback for frozen keys
  function leakStore(that){
    return that[LEAK] || hide(that, LEAK, {
      array: [],
      get: function(key){
        var entry = findFrozen(this, key);
        if(entry)return entry[1];
      },
      has: function(key){
        return !!findFrozen(this, key);
      },
      set: function(key, value){
        var entry = findFrozen(this, key);
        if(entry)entry[1] = value;
        else this.array.push([key, value]);
      },
      'delete': function(key){
        var index = findIndex(this.array, function(it){
          return it[0] === key;
        });
        if(~index)this.array.splice(index, 1);
        return !!~index;
      }
    })[LEAK];
  }

  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
      var C = wrapper(function(that, iterable){
        $.set(assert.inst(that, C, NAME), ID, id++);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
      });
      __webpack_require__(28)(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        'delete': function(key){
          if(!isObject(key))return false;
          if(!isExtensible(key))return leakStore(this)['delete'](key);
          return $has(key, WEAK) && $has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has(key){
          if(!isObject(key))return false;
          if(!isExtensible(key))return leakStore(this).has(key);
          return $has(key, WEAK) && $has(key[WEAK], this[ID]);
        }
      });
      return C;
    },
    def: function(that, key, value){
      if(!isExtensible(assert.obj(key))){
        leakStore(that).set(key, value);
      } else {
        $has(key, WEAK) || hide(key, WEAK, {});
        key[WEAK][that[ID]] = value;
      } return that;
    },
    leakStore: leakStore,
    WEAK: WEAK,
    ID: ID
  };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , document = $.g.document
    , isObject = $.isObject
    // in old IE typeof document.createElement is 'object'
    , is = isObject(document) && isObject(document.createElement);
  module.exports = function(it){
    return is ? document.createElement(it) : {};
  };

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(1);
  module.exports = function(it){
    var keys       = $.getKeys(it)
      , getDesc    = $.getDesc
      , getSymbols = $.getSymbols;
    if(getSymbols)$.each.call(getSymbols(it), function(key){
      if(getDesc(it, key).enumerable)keys.push(key);
    });
    return keys;
  };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var $ = __webpack_require__(1)
    , toString = {}.toString
    , getNames = $.getNames;

  var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  function getWindowNames(it){
    try {
      return getNames(it);
    } catch(e){
      return windowNames.slice();
    }
  }

  module.exports.get = function getOwnPropertyNames(it){
    if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
    return getNames($.toObject(it));
  };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  var assertObject = __webpack_require__(6).obj;
  function close(iterator){
    var ret = iterator['return'];
    if(ret !== undefined)assertObject(ret.call(iterator));
  }
  function call(iterator, fn, value, entries){
    try {
      return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
    } catch(e){
      close(iterator);
      throw e;
    }
  }
  call.close = close;
  module.exports = call;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  var $            = __webpack_require__(1)
    , assertObject = __webpack_require__(6).obj;
  module.exports = function ownKeys(it){
    assertObject(it);
    var keys       = $.getNames(it)
      , getSymbols = $.getSymbols;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };

/***/ },
/* 53 */
/***/ function(module, exports) {

  module.exports = Object.is || function is(x, y){
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  // http://wiki.ecmascript.org/doku.php?id=strawman:string_padding
  var $      = __webpack_require__(1)
    , repeat = __webpack_require__(55);

  module.exports = function(that, minLength, fillChar, left){
    // 1. Let O be CheckObjectCoercible(this value).
    // 2. Let S be ToString(O).
    var S = String($.assertDefined(that));
    // 4. If intMinLength is undefined, return S.
    if(minLength === undefined)return S;
    // 4. Let intMinLength be ToInteger(minLength).
    var intMinLength = $.toInteger(minLength);
    // 5. Let fillLen be the number of characters in S minus intMinLength.
    var fillLen = intMinLength - S.length;
    // 6. If fillLen < 0, then throw a RangeError exception.
    // 7. If fillLen is +∞, then throw a RangeError exception.
    if(fillLen < 0 || fillLen === Infinity){
      throw new RangeError('Cannot satisfy string length ' + minLength + ' for string: ' + S);
    }
    // 8. Let sFillStr be the string represented by fillStr.
    // 9. If sFillStr is undefined, let sFillStr be a space character.
    var sFillStr = fillChar === undefined ? ' ' : String(fillChar);
    // 10. Let sFillVal be a String made of sFillStr, repeated until fillLen is met.
    var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));
    // truncate if we overflowed
    if(sFillVal.length > fillLen)sFillVal = left
      ? sFillVal.slice(sFillVal.length - fillLen)
      : sFillVal.slice(0, fillLen);
    // 11. Return a string made from sFillVal, followed by S.
    // 11. Return a String made from S, followed by sFillVal.
    return left ? sFillVal.concat(S) : S.concat(sFillVal);
  };

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $ = __webpack_require__(1);

  module.exports = function repeat(count){
    var str = String($.assertDefined(this))
      , res = ''
      , n   = $.toInteger(count);
    if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
    for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
    return res;
  };

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $      = __webpack_require__(1)
    , ctx    = __webpack_require__(14)
    , cof    = __webpack_require__(7)
    , invoke = __webpack_require__(27)
    , cel    = __webpack_require__(48)
    , global             = $.g
    , isFunction         = $.isFunction
    , html               = $.html
    , process            = global.process
    , setTask            = global.setImmediate
    , clearTask          = global.clearImmediate
    , MessageChannel     = global.MessageChannel
    , counter            = 0
    , queue              = {}
    , ONREADYSTATECHANGE = 'onreadystatechange'
    , defer, channel, port;
  function run(){
    var id = +this;
    if($.has(queue, id)){
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  }
  function listner(event){
    run.call(event.data);
  }
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if(!isFunction(setTask) || !isFunction(clearTask)){
    setTask = function(fn){
      var args = [], i = 1;
      while(arguments.length > i)args.push(arguments[i++]);
      queue[++counter] = function(){
        invoke(isFunction(fn) ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function(id){
      delete queue[id];
    };
    // Node.js 0.8-
    if(cof(process) == 'process'){
      defer = function(id){
        process.nextTick(ctx(run, id, 1));
      };
    // Modern browsers, skip implementation for WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is object
    } else if(global.addEventListener && isFunction(global.postMessage) && !global.importScripts){
      defer = function(id){
        global.postMessage(id, '*');
      };
      global.addEventListener('message', listner, false);
    // WebWorkers
    } else if(isFunction(MessageChannel)){
      channel = new MessageChannel;
      port    = channel.port2;
      channel.port1.onmessage = listner;
      defer = ctx(port.postMessage, port, 1);
    // IE8-
    } else if(ONREADYSTATECHANGE in cel('script')){
      defer = function(id){
        html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
          html.removeChild(this);
          run.call(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function(id){
        setTimeout(ctx(run, id, 1), 0);
      };
    }
  }
  module.exports = {
    set:   setTask,
    clear: clearTask
  };

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  var $          = __webpack_require__(1)
    , setUnscope = __webpack_require__(15)
    , ITER       = __webpack_require__(11).safe('iter')
    , $iter      = __webpack_require__(12)
    , step       = $iter.step
    , Iterators  = $iter.Iterators;

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  __webpack_require__(31)(Array, 'Array', function(iterated, kind){
    $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function(){
    var iter  = this[ITER]
      , O     = iter.o
      , kind  = iter.k
      , index = iter.i++;
    if(!O || index >= O.length){
      iter.o = undefined;
      return step(1);
    }
    if(kind == 'keys'  )return step(0, index);
    if(kind == 'values')return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  Iterators.Arguments = Iterators.Array;

  setUnscope('keys');
  setUnscope('values');
  setUnscope('entries');

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _dispatchersDispatcher = __webpack_require__(22);

  var _dispatchersDispatcher2 = _interopRequireDefault(_dispatchersDispatcher);

  var _constantsActionTypes = __webpack_require__(20);

  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

  var _servicesRouterContainer = __webpack_require__(66);

  var _servicesRouterContainer2 = _interopRequireDefault(_servicesRouterContainer);

  var _superagent = __webpack_require__(30);

  var _superagent2 = _interopRequireDefault(_superagent);

  var jwtKey = 'closyaar-jwt';
  exports['default'] = {
    loginUser: function loginUser(jwt, user) {
      console.log('LoginAction.loginUser()| supplied jwt:', jwt);

      if (jwt) {

        console.log('LoginAction.verifyJWT()| Saving jwt in localStorage for user...', document.cookie);
        localStorage.setItem(jwtKey, jwt);
        document.cookie = 'rememberuser=true';
        // Send the action to all stores through the Dispatcher
        _dispatchersDispatcher2['default'].dispatch({
          type: _constantsActionTypes2['default'].LOGIN_USER,
          jwt: jwt,
          user: user
        });
      } else {
        console.log('LoginAction.loginUser()| Authentication Fail!!!');
      }
    },

    loginFailed: function loginFailed() {
      console.log('LoginAction.loginFailed()| ');
      _dispatchersDispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].LOGIN_FAILED
      });
    },

    logoutUser: function logoutUser() {
      console.log('LoginAction.logoutUser()...');
      document.cookie = 'rememberuser=false';
      _servicesRouterContainer2['default'].get().transitionTo('/login');
      localStorage.removeItem(jwtKey);
      _dispatchersDispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].LOGOUT_USER
      });
    },

    signUpUser: function signUpUser(user) {
      //RouterContainer.get().transitionTo('/setpassword?emailsent=1');
      _dispatchersDispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].SIGNUP_USER,
        user: user
      });
    },

    // TODO: refator and move REST call to authservice.js
    verifyUserToken: function verifyUserToken(jwt) {
      console.log('LoginAction.verifyUserToken()| supplied jwt:', jwt);

      if (jwt) {
        _superagent2['default'].get('/api/verifyusertoken').set('x-closyaar-access-token', jwt).end(function (err, response) {
          console.log('LoginAction.verifyUserToken() rest call|  response', response.body);
          if (!err && response && response.body && response.body.success) {
            console.log('LoginAction.verifyUserToken()| Authentication success!!!', response.body.user);

            // Send the action to all stores through the Dispatcher

            _dispatchersDispatcher2['default'].dispatch({
              type: _constantsActionTypes2['default'].TOKEN_VERIFIED,
              user: response.body.user
            });
          } else {
            console.log('LoginAction.verifyUserToken()| Authentication Fail!!!');
            _dispatchersDispatcher2['default'].dispatch({
              type: _constantsActionTypes2['default'].TOKEN_VERIFIED,
              user: {
                invalidToken: true
              }
            });
            //console.log('LoginAction.verifyUserToken()| Err:', err);
          }
        });
      }
    }
  };
  module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _reactRouter = __webpack_require__(10);

  var _storesLoginStore = __webpack_require__(24);

  var _storesLoginStore2 = _interopRequireDefault(_storesLoginStore);

  var _storesAppStore = __webpack_require__(151);

  var _storesAppStore2 = _interopRequireDefault(_storesAppStore);

  var _servicesAuthService = __webpack_require__(23);

  var _servicesAuthService2 = _interopRequireDefault(_servicesAuthService);

  var _AppLess = __webpack_require__(155);

  var _AppLess2 = _interopRequireDefault(_AppLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _decoratorsWithContext = __webpack_require__(146);

  var _decoratorsWithContext2 = _interopRequireDefault(_decoratorsWithContext);

  var _Header = __webpack_require__(134);

  var _Header2 = _interopRequireDefault(_Header);

  var _Feedback = __webpack_require__(132);

  var _Feedback2 = _interopRequireDefault(_Feedback);

  var _Footer = __webpack_require__(133);

  var _Footer2 = _interopRequireDefault(_Footer);

  var _LoginPage = __webpack_require__(38);

  var _LoginPage2 = _interopRequireDefault(_LoginPage);

  var _reactLibExecutionEnvironment = __webpack_require__(16);

  var _decoratorsWithAuthentication = __webpack_require__(21);

  var _decoratorsWithAuthentication2 = _interopRequireDefault(_decoratorsWithAuthentication);

  var App = (function (_React$Component) {
    _inherits(App, _React$Component);

    _createClass(App, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    // static propTypes = {
    //   path: PropTypes.string.isRequired
    // };

    function App() {
      _classCallCheck(this, _App);

      _get(Object.getPrototypeOf(_App.prototype), 'constructor', this).call(this);
      this.state = this._getLoginState();
    }

    _createClass(App, [{
      key: '_getLoginState',
      value: function _getLoginState() {
        return {
          userLoggedIn: _storesLoginStore2['default'].isLoggedIn(),
          user: _storesLoginStore2['default'].user
        };
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _storesLoginStore2['default'].removeChangeListener(this.changeListener);
        _storesAppStore2['default'].removeChangeListener(this.changePageListener);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        this.changePageListener = this._onPageChange.bind(this);
        _storesLoginStore2['default'].addChangeListener(this.changeListener);
        _storesAppStore2['default'].addChangeListener(this.changePageListener);
      }
    }, {
      key: '_onPageChange',
      value: function _onPageChange() {
        console.log('App._onPageChange()| AppStore changed!!!');
        //this.setState(this._getLoginState());
      }
    }, {
      key: '_onChange',
      value: function _onChange() {
        console.log('App._onChange()| LoginStore changed!!!');
        this.setState(this._getLoginState());
      }
    }, {
      key: 'render',
      value: function render() {
        console.log('App.Render()| client?:', _reactLibExecutionEnvironment.canUseDOM);
        console.log('App.Render()| props:', this.props);
        console.log('App.Render()| state:', this.state);

        this.context.onSetTitle('Closyaar');

        if (this._getLoginState() && this._getLoginState().userLoggedIn) {
          console.log('App.Render()| user logged in...');
        } else {
          console.log('App.Render()| user NOT logged in...');
        }

        return _react2['default'].createElement(
          'div',
          { className: 'app-container' },
          _react2['default'].createElement(_Header2['default'], { LoginState: this.state }),
          _react2['default'].createElement(_reactRouter.RouteHandler, _extends({}, this.props, { user: this.state.user })),
          _react2['default'].createElement(_Feedback2['default'], null),
          _react2['default'].createElement(_Footer2['default'], { LoginState: this.state })
        );
      }
    }]);

    var _App = App;
    App = (0, _decoratorsWithStyles2['default'])(_AppLess2['default'])(App) || App;
    App = (0, _decoratorsWithContext2['default'])(App) || App;
    return App;
  })(_react2['default'].Component);

  exports['default'] = App;
  module.exports = exports['default'];

  //export default App;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _UserHomePageLess = __webpack_require__(170);

  var _UserHomePageLess2 = _interopRequireDefault(_UserHomePageLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _decoratorsWithAuthentication = __webpack_require__(21);

  var _decoratorsWithAuthentication2 = _interopRequireDefault(_decoratorsWithAuthentication);

  var _reactRouter = __webpack_require__(10);

  var _UserMenu = __webpack_require__(61);

  // import Link from '../../utils/Link';
  // import AppActions from '../../actions/AppActions';
  // import AuthService from '../../auth/AuthService';

  var _UserMenu2 = _interopRequireDefault(_UserMenu);

  var UserHomePage = (function (_React$Component) {
    _inherits(UserHomePage, _React$Component);

    function UserHomePage() {
      _classCallCheck(this, _UserHomePage);

      _get(Object.getPrototypeOf(_UserHomePage.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UserHomePage, [{
      key: 'render',
      value: function render() {
        console.log('UserHomePage.render()! user:', this.props.user);
        var title = this.props.user.name;
        this.context.onSetTitle(title);
        return _react2['default'].createElement(
          'div',
          { className: 'userhome' },
          _react2['default'].createElement(_UserMenu2['default'], null),
          _react2['default'].createElement(
            'div',
            { className: 'userhome-container' },
            _react2['default'].createElement(
              _reactRouter.Link,
              { to: 'neighbourhood' },
              'Go to your neighbourhood'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam efficitur vulputate mauris, nec maximus leo dignissim id.'
            )
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    var _UserHomePage = UserHomePage;
    UserHomePage = (0, _decoratorsWithStyles2['default'])(_UserHomePageLess2['default'])(UserHomePage) || UserHomePage;
    UserHomePage = (0, _decoratorsWithAuthentication2['default'])(UserHomePage) || UserHomePage;
    return UserHomePage;
  })(_react2['default'].Component);

  exports['default'] = UserHomePage;
  module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _UserMenuLess = __webpack_require__(171);

  var _UserMenuLess2 = _interopRequireDefault(_UserMenuLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _decoratorsWithAuthentication = __webpack_require__(21);

  var _decoratorsWithAuthentication2 = _interopRequireDefault(_decoratorsWithAuthentication);

  var _reactRouter = __webpack_require__(10);

  // import Link from '../../utils/Link';
  // import AppActions from '../../actions/AppActions';
  // import AuthService from '../../auth/AuthService';

  var UserMenu = (function (_React$Component) {
    _inherits(UserMenu, _React$Component);

    function UserMenu() {
      _classCallCheck(this, _UserMenu);

      _get(Object.getPrototypeOf(_UserMenu.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UserMenu, [{
      key: 'render',
      value: function render() {
        var title = this.props.user.name;
        this.context.onSetTitle(title);
        return _react2['default'].createElement(
          'div',
          { className: 'usermenu' },
          _react2['default'].createElement(
            'ul',
            null,
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { className: 'usermenu-link', to: '/' },
                title
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { className: 'usermenu-link', to: '/' },
                'Messages'
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { className: 'usermenu-link', to: '/' },
                'Closyaars'
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { className: 'usermenu-link', to: 'map' },
                'Map'
              )
            ),
            _react2['default'].createElement(
              'li',
              null,
              _react2['default'].createElement(
                _reactRouter.Link,
                { className: 'usermenu-link', to: 'neighbourhood' },
                'Neighbourhood'
              )
            )
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    var _UserMenu = UserMenu;
    UserMenu = (0, _decoratorsWithStyles2['default'])(_UserMenuLess2['default'])(UserMenu) || UserMenu;
    UserMenu = (0, _decoratorsWithAuthentication2['default'])(UserMenu) || UserMenu;
    return UserMenu;
  })(_react2['default'].Component);

  exports['default'] = UserMenu;
  module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _reactLibKeyMirror = __webpack_require__(68);

  var _reactLibKeyMirror2 = _interopRequireDefault(_reactLibKeyMirror);

  exports['default'] = (0, _reactLibKeyMirror2['default'])({
    LOAD_NEIGHBOURHOOD: null,
    SEARCH_NEIGHBOURHOOD: null
  });
  module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _fs = __webpack_require__(71);

  var _fs2 = _interopRequireDefault(_fs);

  var _path = __webpack_require__(74);

  var _path2 = _interopRequireDefault(_path);

  var _jade = __webpack_require__(178);

  var _jade2 = _interopRequireDefault(_jade);

  var _frontMatter = __webpack_require__(177);

  var _frontMatter2 = _interopRequireDefault(_frontMatter);

  var _Dispatcher = __webpack_require__(144);

  var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

  var _constantsActionTypes = __webpack_require__(20);

  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

  // A folder with Jade/Markdown/HTML content pages
  var CONTENT_DIR = _path2['default'].join(__dirname, './content');

  // Check if that directory exists, print an error message if not
  _fs2['default'].exists(CONTENT_DIR, function (exists) {
    if (!exists) {
      console.error('Error: Directory \'' + CONTENT_DIR + '\' does not exist.');
    }
  });

  // Extract 'front matter' metadata and generate HTML
  function parseJade(uri, jadeContent) {
    var content = (0, _frontMatter2['default'])(jadeContent);
    var html = _jade2['default'].render(content.body, null, '  ');
    var page = Object.assign({ path: uri, content: html }, content.attributes);
    return page;
  }

  exports['default'] = {

    getPage: function getPage(uri) {
      // Read page content from a Jade file
      return new Promise(function (resolve) {
        var fileName = _path2['default'].join(CONTENT_DIR, (uri === '/' ? '/index' : uri) + '.jade');
        console.log('Database.getpage()| fileName:', fileName);
        _fs2['default'].readFile(fileName, { encoding: 'utf8' }, function (err, data) {
          if (err) {
            fileName = _path2['default'].join(CONTENT_DIR, uri + '/index.jade');
            _fs2['default'].readFile(fileName, { encoding: 'utf8' }, function (err2, data2) {
              resolve(err2 ? null : parseJade(uri, data2));
            });
          } else {
            resolve(parseJade(uri, data));
          }
        });
      }).then(function (page) {
        _Dispatcher2['default'].dispatch({
          type: _constantsActionTypes2['default'].RECEIVE_PAGE,
          page: page });
        return Promise.resolve(page);
      });
    }

  };
  module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  // eslint-disable-line no-unused-vars

  var _events = __webpack_require__(42);

  var _events2 = _interopRequireDefault(_events);

  var _node_modulesReactLibExecutionEnvironment = __webpack_require__(16);

  var eventEmitter = undefined;
  var viewport = { width: 1366, height: 768 }; // Default size for server-side rendering
  var RESIZE_EVENT = 'resize';

  function handleWindowResize() {
    if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
      viewport = { width: window.innerWidth, height: window.innerHeight };
      eventEmitter.emit(RESIZE_EVENT, viewport);
    }
  }

  function withViewport(ComposedComponent) {
    return (function (_Component) {
      _inherits(WithViewport, _Component);

      function WithViewport() {
        _classCallCheck(this, WithViewport);

        _get(Object.getPrototypeOf(WithViewport.prototype), 'constructor', this).call(this);
        this.state = {
          viewport: _node_modulesReactLibExecutionEnvironment.canUseDOM ? { width: window.innerWidth, height: window.innerHeight } : viewport,
          isSmallViewport: _node_modulesReactLibExecutionEnvironment.canUseDOM ? this.isSmall(window.innerWidth, window.innerHeight) : this.isSmall(viewport.width, viewport.height)
        };
      }

      _createClass(WithViewport, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (!eventEmitter) {
            eventEmitter = new _events2['default']();
            eventEmitter.setMaxListeners(2);
            window.addEventListener(RESIZE_EVENT, handleWindowResize);
            window.addEventListener('orientationchange', handleWindowResize);
          }
          // console.log'withViewport componentDidMount:', this);
          eventEmitter.on(RESIZE_EVENT, this.handleResize.bind(this));
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          eventEmitter.removeListener(RESIZE_EVENT, this.handleResize.bind(this));
          if (!eventEmitter.listeners(RESIZE_EVENT, true)) {
            window.removeventEmitterventListener(RESIZE_EVENT, handleWindowResize);
            window.removeventEmitterventListener('orientationchange', handleWindowResize);
            eventEmitter = null;
          }
        }
      }, {
        key: 'render',
        value: function render() {
          // console.log'withViewport called:',ComposedComponent);
          return _react2['default'].createElement(ComposedComponent, _extends({}, this.props, { viewport: this.state.viewport, isSmallViewport: this.state.isSmallViewport }));
        }
      }, {
        key: 'handleResize',
        value: function handleResize(value) {
          // console.log'withViewport handleResize:', value, this);
          this.setState({ viewport: value, isSmallViewport: this.isSmall(value.width) });
        }
      }, {
        key: 'isSmall',
        value: function isSmall(width, height) {
          // console.log'isSmall called', width, 'X',height);
          return width < 400 || height < 300;
        }
      }]);

      return WithViewport;
    })(_react.Component);
  }

  exports['default'] = withViewport;
  module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _superagent = __webpack_require__(30);

  var _superagent2 = _interopRequireDefault(_superagent);

  var _actionsNeighbourhoodAction = __webpack_require__(131);

  var _actionsNeighbourhoodAction2 = _interopRequireDefault(_actionsNeighbourhoodAction);

  var NeighbourhoodService = (function () {
    function NeighbourhoodService() {
      _classCallCheck(this, NeighbourhoodService);
    }

    _createClass(NeighbourhoodService, [{
      key: 'saveNeighbourhood',
      value: function saveNeighbourhood(neighbourhood, userid, errorCb) {
        console.log('NeighbourhoodService.loadNeighbourhoods()| neighbourhood', neighbourhood);
        var jwt = localStorage.getItem('closyaar-jwt');

        _superagent2['default'].post('/api/neighbourhood').type('form').send({
          neighbourhood: JSON.stringify(neighbourhood),
          userid: userid
        }).set('Accept', 'application/json').set('x-closyaar-access-token', jwt).end(function (err, response) {
          console.log('NeighbourhoodService.saveNeighbourhood()|  err, response', err, response);
          if (!err && response && response.body && response.body.success) {
            console.log('NeighbourhoodService.saveNeighbourhood()| neighbourhood created!!!');
            // TODO: call dispatcher
            return true;
          } else {
            console.log('NeighbourhoodService.saveNeighbourhood()| neighbourhood creation failed!!!');
            errorCb(err);
          }
        });
      }
    }, {
      key: 'searchNeighbourhoodById',
      value: function searchNeighbourhoodById(id, errorCb) {
        console.log('NeighbourhoodService.searchNeighbourhoodById()| neighbourhood', id);
        var jwt = localStorage.getItem('closyaar-jwt');

        _superagent2['default'].get('/api/neighbourhood/' + id).type('form').set('Accept', 'application/json').set('x-closyaar-access-token', jwt).end(function (err, response) {
          console.log('NeighbourhoodService.searchNeighbourhoodById()|  err, response', err, response);
          if (!err && response && response.body && response.body.success) {
            console.log('NeighbourhoodService.searchNeighbourhoodById()| neighbourhood found!!!');
            // We get a JWT back.
            ///let jwt = response.body.token;
            // We trigger the LoginAction with that JWT.
            // TODO: may want to review this
            _actionsNeighbourhoodAction2['default'].searchNeighbourhood(response.body.neighbourhoods);
            return true;
          } else {
            console.log('NeighbourhoodService.searchNeighbourhoodById()| neighbourhood search failed!!!');
            errorCb(err);
          }
        });
      }
    }, {
      key: 'findNeighbourhoodsByViewport',
      value: function findNeighbourhoodsByViewport(mapViewport, errorCb) {

        console.log('NeighbourhoodService.findNeighbourhoodsByViewport()| neighbourhood', mapViewport);
        var jwt = localStorage.getItem('closyaar-jwt');

        _superagent2['default'].get('/api/neighbourhoods').type('form')
        //.send(neighbourhood)
        .set('Accept', 'application/json').set('x-closyaar-access-token', jwt).end(function (err, response) {
          console.log('NeighbourhoodService.findNeighbourhoodsByViewport()|  err, response', err, response);
          if (!err && response && response.body && response.body.success) {
            console.log('NeighbourhoodService.findNeighbourhoodsByViewport()| neighbourhood found!!!');
            // We get a JWT back.
            ///let jwt = response.body.token;
            // We trigger the LoginAction with that JWT.
            // TODO: may want to review this
            _actionsNeighbourhoodAction2['default'].fetchNeighbourhoods(response.body.neighbourhoods);
            return true;
          } else {
            console.log('NeighbourhoodService.findNeighbourhoodsByViewport()| neighbourhood search failed!!!');
            errorCb(err);
          }
        });
      }
    }]);

    return NeighbourhoodService;
  })();

  exports['default'] = new NeighbourhoodService();
  module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _router = null;
  exports["default"] = {
    set: function set(router) {
      return _router = router;
    },
    get: function get() {
      return _router;
    }
  };
  module.exports = exports["default"];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule invariant
   */

  "use strict";

  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */

  var invariant = function(condition, format, a, b, c, d, e, f) {
    if (false) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }

    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          'Invariant Violation: ' +
          format.replace(/%s/g, function() { return args[argIndex++]; })
        );
      }

      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };

  module.exports = invariant;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule keyMirror
   * @typechecks static-only
   */

  'use strict';

  var invariant = __webpack_require__(67);

  /**
   * Constructs an enumeration with keys equal to their value.
   *
   * For example:
   *
   *   var COLORS = keyMirror({blue: null, red: null});
   *   var myColor = COLORS.blue;
   *   var isColorValid = !!COLORS[myColor];
   *
   * The last line could not be performed if the values of the generated enum were
   * not equal to their keys.
   *
   *   Input:  {key1: val1, key2: val2}
   *   Output: {key1: key1, key2: key2}
   *
   * @param {object} obj
   * @return {object}
   */
  var keyMirror = function(obj) {
    var ret = {};
    var key;
    (false ? invariant(
      obj instanceof Object && !Array.isArray(obj),
      'keyMirror(...): Argument must be an object.'
    ) : invariant(obj instanceof Object && !Array.isArray(obj)));
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      ret[key] = key;
    }
    return ret;
  };

  module.exports = keyMirror;


/***/ },
/* 69 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 70 */
/***/ function(module, exports) {

  module.exports = require("flux");

/***/ },
/* 71 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 72 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 73 */
/***/ function(module, exports) {

  module.exports = require("lodash");

/***/ },
/* 74 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";

  __webpack_require__(127);

  __webpack_require__(128);

  if (global._babelPolyfill) {
    throw new Error("only one instance of babel/polyfill is allowed");
  }
  global._babelPolyfill = true;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , enumKeys = __webpack_require__(49);
  // 19.1.2.1 Object.assign(target, source, ...)
  /* eslint-disable no-unused-vars */
  module.exports = Object.assign || function assign(target, source){
  /* eslint-enable no-unused-vars */
    var T = Object($.assertDefined(target))
      , l = arguments.length
      , i = 1;
    while(l > i){
      var S      = $.ES5Object(arguments[i++])
        , keys   = enumKeys(S)
        , length = keys.length
        , j      = 0
        , key;
      while(length > j)T[key = keys[j++]] = S[key];
    }
    return T;
  };

/***/ },
/* 77 */
/***/ function(module, exports) {

  module.exports = function($){
    $.FW   = true;
    $.path = $.g;
    return $;
  };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  var $ = __webpack_require__(1);
  module.exports = function(object, el){
    var O      = $.toObject(object)
      , keys   = $.getKeys(O)
      , length = keys.length
      , index  = 0
      , key;
    while(length > index)if(O[key = keys[index++]] === el)return key;
  };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $      = __webpack_require__(1)
    , invoke = __webpack_require__(27)
    , assertFunction = __webpack_require__(6).fn;
  module.exports = function(/* ...pargs */){
    var fn     = assertFunction(this)
      , length = arguments.length
      , pargs  = Array(length)
      , i      = 0
      , _      = $.path._
      , holder = false;
    while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
    return function(/* ...args */){
      var that    = this
        , _length = arguments.length
        , j = 0, k = 0, args;
      if(!holder && !_length)return invoke(fn, pargs, that);
      args = pargs.slice();
      if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
      while(_length > k)args.push(arguments[k++]);
      return invoke(fn, args, that);
    };
  };

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  var $                = __webpack_require__(1)
    , cel              = __webpack_require__(48)
    , cof              = __webpack_require__(7)
    , $def             = __webpack_require__(2)
    , invoke           = __webpack_require__(27)
    , arrayMethod      = __webpack_require__(25)
    , IE_PROTO         = __webpack_require__(11).safe('__proto__')
    , assert           = __webpack_require__(6)
    , assertObject     = assert.obj
    , ObjectProto      = Object.prototype
    , html             = $.html
    , A                = []
    , _slice           = A.slice
    , _join            = A.join
    , classof          = cof.classof
    , has              = $.has
    , defineProperty   = $.setDesc
    , getOwnDescriptor = $.getDesc
    , defineProperties = $.setDescs
    , isFunction       = $.isFunction
    , isObject         = $.isObject
    , toObject         = $.toObject
    , toLength         = $.toLength
    , toIndex          = $.toIndex
    , IE8_DOM_DEFINE   = false
    , $indexOf         = __webpack_require__(44)(false)
    , $forEach         = arrayMethod(0)
    , $map             = arrayMethod(1)
    , $filter          = arrayMethod(2)
    , $some            = arrayMethod(3)
    , $every           = arrayMethod(4);

  if(!$.DESC){
    try {
      IE8_DOM_DEFINE = defineProperty(cel('div'), 'x',
        {get: function(){ return 8; }}
      ).x == 8;
    } catch(e){ /* empty */ }
    $.setDesc = function(O, P, Attributes){
      if(IE8_DOM_DEFINE)try {
        return defineProperty(O, P, Attributes);
      } catch(e){ /* empty */ }
      if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
      if('value' in Attributes)assertObject(O)[P] = Attributes.value;
      return O;
    };
    $.getDesc = function(O, P){
      if(IE8_DOM_DEFINE)try {
        return getOwnDescriptor(O, P);
      } catch(e){ /* empty */ }
      if(has(O, P))return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
    };
    $.setDescs = defineProperties = function(O, Properties){
      assertObject(O);
      var keys   = $.getKeys(Properties)
        , length = keys.length
        , i = 0
        , P;
      while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
      return O;
    };
  }
  $def($def.S + $def.F * !$.DESC, 'Object', {
    // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $.getDesc,
    // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
    defineProperty: $.setDesc,
    // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
    defineProperties: defineProperties
  });

    // IE 8- don't enum bug keys
  var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
              'toLocaleString,toString,valueOf').split(',')
    // Additional keys for getOwnPropertyNames
    , keys2 = keys1.concat('length', 'prototype')
    , keysLen1 = keys1.length;

  // Create object with `null` prototype: use iframe Object with cleared prototype
  var createDict = function(){
    // Thrash, waste and sodomy: IE GC bug
    var iframe = cel('iframe')
      , i      = keysLen1
      , gt     = '>'
      , iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write('<script>document.F=Object</script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while(i--)delete createDict.prototype[keys1[i]];
    return createDict();
  };
  function createGetKeys(names, length){
    return function(object){
      var O      = toObject(object)
        , i      = 0
        , result = []
        , key;
      for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
      // Don't enum bug & hidden keys
      while(length > i)if(has(O, key = names[i++])){
        ~$indexOf(result, key) || result.push(key);
      }
      return result;
    };
  }
  function Empty(){}
  $def($def.S, 'Object', {
    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
    getPrototypeOf: $.getProto = $.getProto || function(O){
      O = Object(assert.def(O));
      if(has(O, IE_PROTO))return O[IE_PROTO];
      if(isFunction(O.constructor) && O instanceof O.constructor){
        return O.constructor.prototype;
      } return O instanceof Object ? ObjectProto : null;
    },
    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    create: $.create = $.create || function(O, /*?*/Properties){
      var result;
      if(O !== null){
        Empty.prototype = assertObject(O);
        result = new Empty();
        Empty.prototype = null;
        // add "__proto__" for Object.getPrototypeOf shim
        result[IE_PROTO] = O;
      } else result = createDict();
      return Properties === undefined ? result : defineProperties(result, Properties);
    },
    // 19.1.2.14 / 15.2.3.14 Object.keys(O)
    keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
    // 19.1.2.17 / 15.2.3.8 Object.seal(O)
    seal: function seal(it){
      return it; // <- cap
    },
    // 19.1.2.5 / 15.2.3.9 Object.freeze(O)
    freeze: function freeze(it){
      return it; // <- cap
    },
    // 19.1.2.15 / 15.2.3.10 Object.preventExtensions(O)
    preventExtensions: function preventExtensions(it){
      return it; // <- cap
    },
    // 19.1.2.13 / 15.2.3.11 Object.isSealed(O)
    isSealed: function isSealed(it){
      return !isObject(it); // <- cap
    },
    // 19.1.2.12 / 15.2.3.12 Object.isFrozen(O)
    isFrozen: function isFrozen(it){
      return !isObject(it); // <- cap
    },
    // 19.1.2.11 / 15.2.3.13 Object.isExtensible(O)
    isExtensible: function isExtensible(it){
      return isObject(it); // <- cap
    }
  });

  // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
  $def($def.P, 'Function', {
    bind: function(that /*, args... */){
      var fn       = assert.fn(this)
        , partArgs = _slice.call(arguments, 1);
      function bound(/* args... */){
        var args   = partArgs.concat(_slice.call(arguments))
          , constr = this instanceof bound
          , ctx    = constr ? $.create(fn.prototype) : that
          , result = invoke(fn, args, ctx);
        return constr ? ctx : result;
      }
      if(fn.prototype)bound.prototype = fn.prototype;
      return bound;
    }
  });

  // Fix for not array-like ES3 string and DOM objects
  if(!(0 in Object('z') && 'z'[0] == 'z')){
    $.ES5Object = function(it){
      return cof(it) == 'String' ? it.split('') : Object(it);
    };
  }

  var buggySlice = true;
  try {
    if(html)_slice.call(html);
    buggySlice = false;
  } catch(e){ /* empty */ }

  $def($def.P + $def.F * buggySlice, 'Array', {
    slice: function slice(begin, end){
      var len   = toLength(this.length)
        , klass = cof(this);
      end = end === undefined ? len : end;
      if(klass == 'Array')return _slice.call(this, begin, end);
      var start  = toIndex(begin, len)
        , upTo   = toIndex(end, len)
        , size   = toLength(upTo - start)
        , cloned = Array(size)
        , i      = 0;
      for(; i < size; i++)cloned[i] = klass == 'String'
        ? this.charAt(start + i)
        : this[start + i];
      return cloned;
    }
  });

  $def($def.P + $def.F * ($.ES5Object != Object), 'Array', {
    join: function join(){
      return _join.apply($.ES5Object(this), arguments);
    }
  });

  // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
  $def($def.S, 'Array', {
    isArray: function(arg){
      return cof(arg) == 'Array';
    }
  });
  function createArrayReduce(isRight){
    return function(callbackfn, memo){
      assert.fn(callbackfn);
      var O      = toObject(this)
        , length = toLength(O.length)
        , index  = isRight ? length - 1 : 0
        , i      = isRight ? -1 : 1;
      if(arguments.length < 2)for(;;){
        if(index in O){
          memo = O[index];
          index += i;
          break;
        }
        index += i;
        assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
      }
      for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
        memo = callbackfn(memo, O[index], index, this);
      }
      return memo;
    };
  }
  $def($def.P, 'Array', {
    // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
    forEach: $.each = $.each || function forEach(callbackfn/*, that = undefined */){
      return $forEach(this, callbackfn, arguments[1]);
    },
    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
    map: function map(callbackfn/*, that = undefined */){
      return $map(this, callbackfn, arguments[1]);
    },
    // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
    filter: function filter(callbackfn/*, that = undefined */){
      return $filter(this, callbackfn, arguments[1]);
    },
    // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
    some: function some(callbackfn/*, that = undefined */){
      return $some(this, callbackfn, arguments[1]);
    },
    // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
    every: function every(callbackfn/*, that = undefined */){
      return $every(this, callbackfn, arguments[1]);
    },
    // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
    reduce: createArrayReduce(false),
    // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
    reduceRight: createArrayReduce(true),
    // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
    indexOf: function indexOf(el /*, fromIndex = 0 */){
      return $indexOf(this, el, arguments[1]);
    },
    // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
    lastIndexOf: function(el, fromIndex /* = @[*-1] */){
      var O      = toObject(this)
        , length = toLength(O.length)
        , index  = length - 1;
      if(arguments.length > 1)index = Math.min(index, $.toInteger(fromIndex));
      if(index < 0)index = toLength(length + index);
      for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
      return -1;
    }
  });

  // 21.1.3.25 / 15.5.4.20 String.prototype.trim()
  $def($def.P, 'String', {trim: __webpack_require__(33)(/^\s*([\s\S]*\S)?\s*$/, '$1')});

  // 20.3.3.1 / 15.9.4.4 Date.now()
  $def($def.S, 'Date', {now: function(){
    return +new Date;
  }});

  function lz(num){
    return num > 9 ? num : '0' + num;
  }

  // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
  // PhantomJS and old webkit had a broken Date implementation.
  var date       = new Date(-5e13 - 1)
    , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
        && __webpack_require__(37)(function(){ new Date(NaN).toISOString(); }));
  $def($def.P + $def.F * brokenDate, 'Date', {toISOString: function(){
    if(!isFinite(this))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }});

  if(classof(function(){ return arguments; }()) == 'Object')cof.classof = function(it){
    var tag = classof(it);
    return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
  };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(2)
    , toIndex = $.toIndex;
  $def($def.P, 'Array', {
    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
    copyWithin: function copyWithin(target/* = 0 */, start /* = 0, end = @length */){
      var O     = Object($.assertDefined(this))
        , len   = $.toLength(O.length)
        , to    = toIndex(target, len)
        , from  = toIndex(start, len)
        , end   = arguments[2]
        , fin   = end === undefined ? len : toIndex(end, len)
        , count = Math.min(fin - from, len - to)
        , inc   = 1;
      if(from < to && to < from + count){
        inc  = -1;
        from = from + count - 1;
        to   = to   + count - 1;
      }
      while(count-- > 0){
        if(from in O)O[to] = O[from];
        else delete O[to];
        to   += inc;
        from += inc;
      } return O;
    }
  });
  __webpack_require__(15)('copyWithin');

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(2)
    , toIndex = $.toIndex;
  $def($def.P, 'Array', {
    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
    fill: function fill(value /*, start = 0, end = @length */){
      var O      = Object($.assertDefined(this))
        , length = $.toLength(O.length)
        , index  = toIndex(arguments[1], length)
        , end    = arguments[2]
        , endPos = end === undefined ? length : toIndex(end, length);
      while(endPos > index)O[index++] = value;
      return O;
    }
  });
  __webpack_require__(15)('fill');

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
  var KEY    = 'findIndex'
    , $def   = __webpack_require__(2)
    , forced = true
    , $find  = __webpack_require__(25)(6);
  // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){ forced = false; });
  $def($def.P + $def.F * forced, 'Array', {
    findIndex: function findIndex(callbackfn/*, that = undefined */){
      return $find(this, callbackfn, arguments[1]);
    }
  });
  __webpack_require__(15)(KEY);

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
  var KEY    = 'find'
    , $def   = __webpack_require__(2)
    , forced = true
    , $find  = __webpack_require__(25)(5);
  // Shouldn't skip holes
  if(KEY in [])Array(1)[KEY](function(){ forced = false; });
  $def($def.P + $def.F * forced, 'Array', {
    find: function find(callbackfn/*, that = undefined */){
      return $find(this, callbackfn, arguments[1]);
    }
  });
  __webpack_require__(15)(KEY);

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  var $     = __webpack_require__(1)
    , ctx   = __webpack_require__(14)
    , $def  = __webpack_require__(2)
    , $iter = __webpack_require__(12)
    , call  = __webpack_require__(51);
  $def($def.S + $def.F * !__webpack_require__(32)(function(iter){ Array.from(iter); }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
      var O       = Object($.assertDefined(arrayLike))
        , mapfn   = arguments[1]
        , mapping = mapfn !== undefined
        , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
        , index   = 0
        , length, result, step, iterator;
      if($iter.is(O)){
        iterator = $iter.get(O);
        // strange IE quirks mode bug -> use typeof instead of isFunction
        result   = new (typeof this == 'function' ? this : Array);
        for(; !(step = iterator.next()).done; index++){
          result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
        }
      } else {
        // strange IE quirks mode bug -> use typeof instead of isFunction
        result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
        for(; length > index; index++){
          result[index] = mapping ? f(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    }
  });

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  var $def = __webpack_require__(2);
  $def($def.S, 'Array', {
    // 22.1.2.3 Array.of( ...items)
    of: function of(/* ...args */){
      var index  = 0
        , length = arguments.length
        // strange IE quirks mode bug -> use typeof instead of isFunction
        , result = new (typeof this == 'function' ? this : Array)(length);
      while(length > index)result[index] = arguments[index++];
      result.length = length;
      return result;
    }
  });

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(29)(Array);

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  var $             = __webpack_require__(1)
    , HAS_INSTANCE  = __webpack_require__(8)('hasInstance')
    , FunctionProto = Function.prototype;
  // 19.2.3.6 Function.prototype[@@hasInstance](V)
  if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
    if(!$.isFunction(this) || !$.isObject(O))return false;
    if(!$.isObject(this.prototype))return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while(O = $.getProto(O))if(this.prototype === O)return true;
    return false;
  }});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , NAME = 'name'
    , setDesc = $.setDesc
    , FunctionProto = Function.prototype;
  // 19.2.4.2 name
  NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
    configurable: true,
    get: function(){
      var match = String(this).match(/^\s*function ([^ (]*)/)
        , name  = match ? match[1] : '';
      $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
      return name;
    },
    set: function(value){
      $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
    }
  });

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var strong = __webpack_require__(45);

  // 23.1 Map Objects
  __webpack_require__(26)('Map', function(get){
    return function Map(){ return get(this, arguments[0]); };
  }, {
    // 23.1.3.6 Map.prototype.get(key)
    get: function get(key){
      var entry = strong.getEntry(this, key);
      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function set(key, value){
      return strong.def(this, key === 0 ? 0 : key, value);
    }
  }, strong, true);

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  var Infinity = 1 / 0
    , $def  = __webpack_require__(2)
    , E     = Math.E
    , pow   = Math.pow
    , abs   = Math.abs
    , exp   = Math.exp
    , log   = Math.log
    , sqrt  = Math.sqrt
    , ceil  = Math.ceil
    , floor = Math.floor
    , EPSILON   = pow(2, -52)
    , EPSILON32 = pow(2, -23)
    , MAX32     = pow(2, 127) * (2 - EPSILON32)
    , MIN32     = pow(2, -126);
  function roundTiesToEven(n){
    return n + 1 / EPSILON - 1 / EPSILON;
  }

  // 20.2.2.28 Math.sign(x)
  function sign(x){
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  }
  // 20.2.2.5 Math.asinh(x)
  function asinh(x){
    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
  }
  // 20.2.2.14 Math.expm1(x)
  function expm1(x){
    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
  }

  $def($def.S, 'Math', {
    // 20.2.2.3 Math.acosh(x)
    acosh: function acosh(x){
      return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
    },
    // 20.2.2.5 Math.asinh(x)
    asinh: asinh,
    // 20.2.2.7 Math.atanh(x)
    atanh: function atanh(x){
      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
    },
    // 20.2.2.9 Math.cbrt(x)
    cbrt: function cbrt(x){
      return sign(x = +x) * pow(abs(x), 1 / 3);
    },
    // 20.2.2.11 Math.clz32(x)
    clz32: function clz32(x){
      return (x >>>= 0) ? 31 - floor(log(x + 0.5) * Math.LOG2E) : 32;
    },
    // 20.2.2.12 Math.cosh(x)
    cosh: function cosh(x){
      return (exp(x = +x) + exp(-x)) / 2;
    },
    // 20.2.2.14 Math.expm1(x)
    expm1: expm1,
    // 20.2.2.16 Math.fround(x)
    fround: function fround(x){
      var $abs  = abs(x)
        , $sign = sign(x)
        , a, result;
      if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
      a = (1 + EPSILON32 / EPSILON) * $abs;
      result = a - (a - $abs);
      if(result > MAX32 || result != result)return $sign * Infinity;
      return $sign * result;
    },
    // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
    hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
      var sum  = 0
        , i    = 0
        , len  = arguments.length
        , larg = 0
        , arg, div;
      while(i < len){
        arg = abs(arguments[i++]);
        if(larg < arg){
          div  = larg / arg;
          sum  = sum * div * div + 1;
          larg = arg;
        } else if(arg > 0){
          div  = arg / larg;
          sum += div * div;
        } else sum += arg;
      }
      return larg === Infinity ? Infinity : larg * sqrt(sum);
    },
    // 20.2.2.18 Math.imul(x, y)
    imul: function imul(x, y){
      var UInt16 = 0xffff
        , xn = +x
        , yn = +y
        , xl = UInt16 & xn
        , yl = UInt16 & yn;
      return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
    },
    // 20.2.2.20 Math.log1p(x)
    log1p: function log1p(x){
      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
    },
    // 20.2.2.21 Math.log10(x)
    log10: function log10(x){
      return log(x) / Math.LN10;
    },
    // 20.2.2.22 Math.log2(x)
    log2: function log2(x){
      return log(x) / Math.LN2;
    },
    // 20.2.2.28 Math.sign(x)
    sign: sign,
    // 20.2.2.30 Math.sinh(x)
    sinh: function sinh(x){
      return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
    },
    // 20.2.2.33 Math.tanh(x)
    tanh: function tanh(x){
      var a = expm1(x = +x)
        , b = expm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
    },
    // 20.2.2.34 Math.trunc(x)
    trunc: function trunc(it){
      return (it > 0 ? floor : ceil)(it);
    }
  });

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $          = __webpack_require__(1)
    , isObject   = $.isObject
    , isFunction = $.isFunction
    , NUMBER     = 'Number'
    , $Number    = $.g[NUMBER]
    , Base       = $Number
    , proto      = $Number.prototype;
  function toPrimitive(it){
    var fn, val;
    if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
    if(isFunction(fn = it.toString) && !isObject(val = fn.call(it)))return val;
    throw TypeError("Can't convert object to number");
  }
  function toNumber(it){
    if(isObject(it))it = toPrimitive(it);
    if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
      var binary = false;
      switch(it.charCodeAt(1)){
        case 66 : case 98  : binary = true;
        case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
      }
    } return +it;
  }
  if($.FW && !($Number('0o1') && $Number('0b1'))){
    $Number = function Number(it){
      return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
    };
    $.each.call($.DESC ? $.getNames(Base) : (
        // ES3:
        'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
        // ES6 (in case, if modules with ES6 Number statics required before):
        'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
        'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
      ).split(','), function(key){
        if($.has(Base, key) && !$.has($Number, key)){
          $.setDesc($Number, key, $.getDesc(Base, key));
        }
      }
    );
    $Number.prototype = proto;
    proto.constructor = $Number;
    __webpack_require__(13)($.g, NUMBER, $Number);
  }

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  var $     = __webpack_require__(1)
    , $def  = __webpack_require__(2)
    , abs   = Math.abs
    , floor = Math.floor
    , _isFinite = $.g.isFinite
    , MAX_SAFE_INTEGER = 0x1fffffffffffff; // pow(2, 53) - 1 == 9007199254740991;
  function isInteger(it){
    return !$.isObject(it) && _isFinite(it) && floor(it) === it;
  }
  $def($def.S, 'Number', {
    // 20.1.2.1 Number.EPSILON
    EPSILON: Math.pow(2, -52),
    // 20.1.2.2 Number.isFinite(number)
    isFinite: function isFinite(it){
      return typeof it == 'number' && _isFinite(it);
    },
    // 20.1.2.3 Number.isInteger(number)
    isInteger: isInteger,
    // 20.1.2.4 Number.isNaN(number)
    isNaN: function isNaN(number){
      return number != number;
    },
    // 20.1.2.5 Number.isSafeInteger(number)
    isSafeInteger: function isSafeInteger(number){
      return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
    },
    // 20.1.2.6 Number.MAX_SAFE_INTEGER
    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
    // 20.1.2.10 Number.MIN_SAFE_INTEGER
    MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
    // 20.1.2.12 Number.parseFloat(string)
    parseFloat: parseFloat,
    // 20.1.2.13 Number.parseInt(string, radix)
    parseInt: parseInt
  });

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.1 Object.assign(target, source)
  var $def = __webpack_require__(2);
  $def($def.S, 'Object', {assign: __webpack_require__(76)});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.10 Object.is(value1, value2)
  var $def = __webpack_require__(2);
  $def($def.S, 'Object', {
    is: __webpack_require__(53)
  });

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  // 19.1.3.19 Object.setPrototypeOf(O, proto)
  var $def = __webpack_require__(2);
  $def($def.S, 'Object', {setPrototypeOf: __webpack_require__(34).set});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  var $        = __webpack_require__(1)
    , $def     = __webpack_require__(2)
    , isObject = $.isObject
    , toObject = $.toObject;
  $.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
    'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
  , function(KEY, ID){
    var fn     = ($.core.Object || {})[KEY] || Object[KEY]
      , forced = 0
      , method = {};
    method[KEY] = ID == 0 ? function freeze(it){
      return isObject(it) ? fn(it) : it;
    } : ID == 1 ? function seal(it){
      return isObject(it) ? fn(it) : it;
    } : ID == 2 ? function preventExtensions(it){
      return isObject(it) ? fn(it) : it;
    } : ID == 3 ? function isFrozen(it){
      return isObject(it) ? fn(it) : true;
    } : ID == 4 ? function isSealed(it){
      return isObject(it) ? fn(it) : true;
    } : ID == 5 ? function isExtensible(it){
      return isObject(it) ? fn(it) : false;
    } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
      return fn(toObject(it), key);
    } : ID == 7 ? function getPrototypeOf(it){
      return fn(Object($.assertDefined(it)));
    } : ID == 8 ? function keys(it){
      return fn(toObject(it));
    } : __webpack_require__(50).get;
    try {
      fn('z');
    } catch(e){
      forced = 1;
    }
    $def($def.S + $def.F * forced, 'Object', method);
  });

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // 19.1.3.6 Object.prototype.toString()
  var cof = __webpack_require__(7)
    , tmp = {};
  tmp[__webpack_require__(8)('toStringTag')] = 'z';
  if(__webpack_require__(1).FW && cof(tmp) != 'z'){
    __webpack_require__(13)(Object.prototype, 'toString', function toString(){
      return '[object ' + cof.classof(this) + ']';
    }, true);
  }

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $        = __webpack_require__(1)
    , ctx      = __webpack_require__(14)
    , cof      = __webpack_require__(7)
    , $def     = __webpack_require__(2)
    , assert   = __webpack_require__(6)
    , forOf    = __webpack_require__(18)
    , setProto = __webpack_require__(34).set
    , same     = __webpack_require__(53)
    , species  = __webpack_require__(29)
    , SPECIES  = __webpack_require__(8)('species')
    , RECORD   = __webpack_require__(11).safe('record')
    , PROMISE  = 'Promise'
    , global   = $.g
    , process  = global.process
    , isNode   = cof(process) == 'process'
    , asap     = process && process.nextTick || __webpack_require__(56).set
    , P        = global[PROMISE]
    , isFunction     = $.isFunction
    , isObject       = $.isObject
    , assertFunction = assert.fn
    , assertObject   = assert.obj
    , Wrapper;

  function testResolve(sub){
    var test = new P(function(){});
    if(sub)test.constructor = Object;
    return P.resolve(test) === test;
  }

  var useNative = function(){
    var works = false;
    function P2(x){
      var self = new P(x);
      setProto(self, P2.prototype);
      return self;
    }
    try {
      works = isFunction(P) && isFunction(P.resolve) && testResolve();
      setProto(P2, P);
      P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
      // actual Firefox has broken subclass support, test that
      if(!(P2.resolve(5).then(function(){}) instanceof P2)){
        works = false;
      }
      // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
      if(works && $.DESC){
        var thenableThenGotten = false;
        P.resolve($.setDesc({}, 'then', {
          get: function(){ thenableThenGotten = true; }
        }));
        works = thenableThenGotten;
      }
    } catch(e){ works = false; }
    return works;
  }();

  // helpers
  function isPromise(it){
    return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
  }
  function sameConstructor(a, b){
    // library wrapper special case
    if(!$.FW && a === P && b === Wrapper)return true;
    return same(a, b);
  }
  function getConstructor(C){
    var S = assertObject(C)[SPECIES];
    return S != undefined ? S : C;
  }
  function isThenable(it){
    var then;
    if(isObject(it))then = it.then;
    return isFunction(then) ? then : false;
  }
  function notify(record){
    var chain = record.c;
    // strange IE + webpack dev server bug - use .call(global)
    if(chain.length)asap.call(global, function(){
      var value = record.v
        , ok    = record.s == 1
        , i     = 0;
      function run(react){
        var cb = ok ? react.ok : react.fail
          , ret, then;
        try {
          if(cb){
            if(!ok)record.h = true;
            ret = cb === true ? value : cb(value);
            if(ret === react.P){
              react.rej(TypeError('Promise-chain cycle'));
            } else if(then = isThenable(ret)){
              then.call(ret, react.res, react.rej);
            } else react.res(ret);
          } else react.rej(value);
        } catch(err){
          react.rej(err);
        }
      }
      while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
      chain.length = 0;
    });
  }
  function isUnhandled(promise){
    var record = promise[RECORD]
      , chain  = record.a || record.c
      , i      = 0
      , react;
    if(record.h)return false;
    while(chain.length > i){
      react = chain[i++];
      if(react.fail || !isUnhandled(react.P))return false;
    } return true;
  }
  function $reject(value){
    var record = this
      , promise;
    if(record.d)return;
    record.d = true;
    record = record.r || record; // unwrap
    record.v = value;
    record.s = 2;
    record.a = record.c.slice();
    setTimeout(function(){
      // strange IE + webpack dev server bug - use .call(global)
      asap.call(global, function(){
        if(isUnhandled(promise = record.p)){
          if(isNode){
            process.emit('unhandledRejection', value, promise);
          } else if(global.console && console.error){
            console.error('Unhandled promise rejection', value);
          }
        }
        record.a = undefined;
      });
    }, 1);
    notify(record);
  }
  function $resolve(value){
    var record = this
      , then;
    if(record.d)return;
    record.d = true;
    record = record.r || record; // unwrap
    try {
      if(then = isThenable(value)){
        // strange IE + webpack dev server bug - use .call(global)
        asap.call(global, function(){
          var wrapper = {r: record, d: false}; // wrap
          try {
            then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
          } catch(e){
            $reject.call(wrapper, e);
          }
        });
      } else {
        record.v = value;
        record.s = 1;
        notify(record);
      }
    } catch(e){
      $reject.call({r: record, d: false}, e); // wrap
    }
  }

  // constructor polyfill
  if(!useNative){
    // 25.4.3.1 Promise(executor)
    P = function Promise(executor){
      assertFunction(executor);
      var record = {
        p: assert.inst(this, P, PROMISE),       // <- promise
        c: [],                                  // <- awaiting reactions
        a: undefined,                           // <- checked in isUnhandled reactions
        s: 0,                                   // <- state
        d: false,                               // <- done
        v: undefined,                           // <- value
        h: false                                // <- handled rejection
      };
      $.hide(this, RECORD, record);
      try {
        executor(ctx($resolve, record, 1), ctx($reject, record, 1));
      } catch(err){
        $reject.call(record, err);
      }
    };
    __webpack_require__(28)(P.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected){
        var S = assertObject(assertObject(this).constructor)[SPECIES];
        var react = {
          ok:   isFunction(onFulfilled) ? onFulfilled : true,
          fail: isFunction(onRejected)  ? onRejected  : false
        };
        var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
          react.res = assertFunction(res);
          react.rej = assertFunction(rej);
        });
        var record = this[RECORD];
        record.c.push(react);
        if(record.a)record.a.push(react);
        if(record.s)notify(record);
        return promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function(onRejected){
        return this.then(undefined, onRejected);
      }
    });
  }

  // export
  $def($def.G + $def.W + $def.F * !useNative, {Promise: P});
  cof.set(P, PROMISE);
  species(P);
  species(Wrapper = $.core[PROMISE]);

  // statics
  $def($def.S + $def.F * !useNative, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r){
      return new (getConstructor(this))(function(res, rej){ rej(r); });
    }
  });
  $def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x){
      return isPromise(x) && sameConstructor(x.constructor, this)
        ? x : new this(function(res){ res(x); });
    }
  });
  $def($def.S + $def.F * !(useNative && __webpack_require__(32)(function(iter){
    P.all(iter)['catch'](function(){});
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable){
      var C      = getConstructor(this)
        , values = [];
      return new C(function(res, rej){
        forOf(iterable, false, values.push, values);
        var remaining = values.length
          , results   = Array(remaining);
        if(remaining)$.each.call(values, function(promise, index){
          C.resolve(promise).then(function(value){
            results[index] = value;
            --remaining || res(results);
          }, rej);
        });
        else res(results);
      });
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable){
      var C = getConstructor(this);
      return new C(function(res, rej){
        forOf(iterable, false, function(promise){
          C.resolve(promise).then(res, rej);
        });
      });
    }
  });

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  var $         = __webpack_require__(1)
    , $def      = __webpack_require__(2)
    , setProto  = __webpack_require__(34)
    , $iter     = __webpack_require__(12)
    , ITERATOR  = __webpack_require__(8)('iterator')
    , ITER      = __webpack_require__(11).safe('iter')
    , step      = $iter.step
    , assert    = __webpack_require__(6)
    , isObject  = $.isObject
    , getProto  = $.getProto
    , $Reflect  = $.g.Reflect
    , _apply    = Function.apply
    , assertObject = assert.obj
    , _isExtensible = Object.isExtensible || isObject
    , _preventExtensions = Object.preventExtensions
    // IE TP has broken Reflect.enumerate
    , buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));

  function Enumerate(iterated){
    $.set(this, ITER, {o: iterated, k: undefined, i: 0});
  }
  $iter.create(Enumerate, 'Object', function(){
    var iter = this[ITER]
      , keys = iter.k
      , key;
    if(keys == undefined){
      iter.k = keys = [];
      for(key in iter.o)keys.push(key);
    }
    do {
      if(iter.i >= keys.length)return step(1);
    } while(!((key = keys[iter.i++]) in iter.o));
    return step(0, key);
  });

  var reflect = {
    // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
    apply: function apply(target, thisArgument, argumentsList){
      return _apply.call(target, thisArgument, argumentsList);
    },
    // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
    construct: function construct(target, argumentsList /*, newTarget*/){
      var proto    = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype
        , instance = $.create(isObject(proto) ? proto : Object.prototype)
        , result   = _apply.call(target, instance, argumentsList);
      return isObject(result) ? result : instance;
    },
    // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
    defineProperty: function defineProperty(target, propertyKey, attributes){
      assertObject(target);
      try {
        $.setDesc(target, propertyKey, attributes);
        return true;
      } catch(e){
        return false;
      }
    },
    // 26.1.4 Reflect.deleteProperty(target, propertyKey)
    deleteProperty: function deleteProperty(target, propertyKey){
      var desc = $.getDesc(assertObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    },
    // 26.1.6 Reflect.get(target, propertyKey [, receiver])
    get: function get(target, propertyKey/*, receiver*/){
      var receiver = arguments.length < 3 ? target : arguments[2]
        , desc = $.getDesc(assertObject(target), propertyKey), proto;
      if(desc)return $.has(desc, 'value')
        ? desc.value
        : desc.get === undefined
          ? undefined
          : desc.get.call(receiver);
      return isObject(proto = getProto(target))
        ? get(proto, propertyKey, receiver)
        : undefined;
    },
    // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
      return $.getDesc(assertObject(target), propertyKey);
    },
    // 26.1.8 Reflect.getPrototypeOf(target)
    getPrototypeOf: function getPrototypeOf(target){
      return getProto(assertObject(target));
    },
    // 26.1.9 Reflect.has(target, propertyKey)
    has: function has(target, propertyKey){
      return propertyKey in target;
    },
    // 26.1.10 Reflect.isExtensible(target)
    isExtensible: function isExtensible(target){
      return _isExtensible(assertObject(target));
    },
    // 26.1.11 Reflect.ownKeys(target)
    ownKeys: __webpack_require__(52),
    // 26.1.12 Reflect.preventExtensions(target)
    preventExtensions: function preventExtensions(target){
      assertObject(target);
      try {
        if(_preventExtensions)_preventExtensions(target);
        return true;
      } catch(e){
        return false;
      }
    },
    // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
    set: function set(target, propertyKey, V/*, receiver*/){
      var receiver = arguments.length < 4 ? target : arguments[3]
        , ownDesc  = $.getDesc(assertObject(target), propertyKey)
        , existingDescriptor, proto;
      if(!ownDesc){
        if(isObject(proto = getProto(target))){
          return set(proto, propertyKey, V, receiver);
        }
        ownDesc = $.desc(0);
      }
      if($.has(ownDesc, 'value')){
        if(ownDesc.writable === false || !isObject(receiver))return false;
        existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
        existingDescriptor.value = V;
        $.setDesc(receiver, propertyKey, existingDescriptor);
        return true;
      }
      return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
    }
  };
  // 26.1.14 Reflect.setPrototypeOf(target, proto)
  if(setProto)reflect.setPrototypeOf = function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  };

  $def($def.G, {Reflect: {}});

  $def($def.S + $def.F * buggyEnumerate, 'Reflect', {
    // 26.1.5 Reflect.enumerate(target)
    enumerate: function enumerate(target){
      return new Enumerate(assertObject(target));
    }
  });

  $def($def.S, 'Reflect', reflect);

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  var $       = __webpack_require__(1)
    , cof     = __webpack_require__(7)
    , $RegExp = $.g.RegExp
    , Base    = $RegExp
    , proto   = $RegExp.prototype
    , re      = /a/g
    // "new" creates a new object
    , CORRECT_NEW = new $RegExp(re) !== re
    // RegExp allows a regex with flags as the pattern
    , ALLOWS_RE_WITH_FLAGS = function(){
      try {
        return $RegExp(re, 'i') == '/a/i';
      } catch(e){ /* empty */ }
    }();
  if($.FW && $.DESC){
    if(!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS){
      $RegExp = function RegExp(pattern, flags){
        var patternIsRegExp  = cof(pattern) == 'RegExp'
          , flagsIsUndefined = flags === undefined;
        if(!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)return pattern;
        return CORRECT_NEW
          ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags)
          : new Base(patternIsRegExp ? pattern.source : pattern
            , patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
      };
      $.each.call($.getNames(Base), function(key){
        key in $RegExp || $.setDesc($RegExp, key, {
          configurable: true,
          get: function(){ return Base[key]; },
          set: function(it){ Base[key] = it; }
        });
      });
      proto.constructor = $RegExp;
      $RegExp.prototype = proto;
      __webpack_require__(13)($.g, 'RegExp', $RegExp);
    }
    // 21.2.5.3 get RegExp.prototype.flags()
    if(/./g.flags != 'g')$.setDesc(proto, 'flags', {
      configurable: true,
      get: __webpack_require__(33)(/^.*\/(\w*)$/, '$1')
    });
  }
  __webpack_require__(29)($RegExp);

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var strong = __webpack_require__(45);

  // 23.2 Set Objects
  __webpack_require__(26)('Set', function(get){
    return function Set(){ return get(this, arguments[0]); };
  }, {
    // 23.2.3.1 Set.prototype.add(value)
    add: function add(value){
      return strong.def(this, value = value === 0 ? 0 : value, value);
    }
  }, strong);

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(2)
    , $at  = __webpack_require__(36)(false);
  $def($def.P, 'String', {
    // 21.1.3.3 String.prototype.codePointAt(pos)
    codePointAt: function codePointAt(pos){
      return $at(this, pos);
    }
  });

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , cof  = __webpack_require__(7)
    , $def = __webpack_require__(2)
    , toLength = $.toLength;

  // should throw error on regex
  $def($def.P + $def.F * !__webpack_require__(37)(function(){ 'q'.endsWith(/./); }), 'String', {
    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
    endsWith: function endsWith(searchString /*, endPosition = @length */){
      if(cof(searchString) == 'RegExp')throw TypeError();
      var that = String($.assertDefined(this))
        , endPosition = arguments[1]
        , len = toLength(that.length)
        , end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
      searchString += '';
      return that.slice(end - searchString.length, end) === searchString;
    }
  });

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  var $def    = __webpack_require__(2)
    , toIndex = __webpack_require__(1).toIndex
    , fromCharCode = String.fromCharCode
    , $fromCodePoint = String.fromCodePoint;

  // length should be 1, old FF problem
  $def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
    // 21.1.2.2 String.fromCodePoint(...codePoints)
    fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
      var res = []
        , len = arguments.length
        , i   = 0
        , code;
      while(len > i){
        code = +arguments[i++];
        if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
        res.push(code < 0x10000
          ? fromCharCode(code)
          : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
        );
      } return res.join('');
    }
  });

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , cof  = __webpack_require__(7)
    , $def = __webpack_require__(2);

  $def($def.P, 'String', {
    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
    includes: function includes(searchString /*, position = 0 */){
      if(cof(searchString) == 'RegExp')throw TypeError();
      return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
    }
  });

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  var set   = __webpack_require__(1).set
    , $at   = __webpack_require__(36)(true)
    , ITER  = __webpack_require__(11).safe('iter')
    , $iter = __webpack_require__(12)
    , step  = $iter.step;

  // 21.1.3.27 String.prototype[@@iterator]()
  __webpack_require__(31)(String, 'String', function(iterated){
    set(this, ITER, {o: String(iterated), i: 0});
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function(){
    var iter  = this[ITER]
      , O     = iter.o
      , index = iter.i
      , point;
    if(index >= O.length)return step(1);
    point = $at(O, index);
    iter.i += point.length;
    return step(0, point);
  });

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  var $    = __webpack_require__(1)
    , $def = __webpack_require__(2);

  $def($def.S, 'String', {
    // 21.1.2.4 String.raw(callSite, ...substitutions)
    raw: function raw(callSite){
      var tpl = $.toObject(callSite.raw)
        , len = $.toLength(tpl.length)
        , sln = arguments.length
        , res = []
        , i   = 0;
      while(len > i){
        res.push(String(tpl[i++]));
        if(i < sln)res.push(String(arguments[i]));
      } return res.join('');
    }
  });

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  var $def = __webpack_require__(2);

  $def($def.P, 'String', {
    // 21.1.3.13 String.prototype.repeat(count)
    repeat: __webpack_require__(55)
  });

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $    = __webpack_require__(1)
    , cof  = __webpack_require__(7)
    , $def = __webpack_require__(2);

  // should throw error on regex
  $def($def.P + $def.F * !__webpack_require__(37)(function(){ 'q'.startsWith(/./); }), 'String', {
    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
    startsWith: function startsWith(searchString /*, position = 0 */){
      if(cof(searchString) == 'RegExp')throw TypeError();
      var that  = String($.assertDefined(this))
        , index = $.toLength(Math.min(arguments[1], that.length));
      searchString += '';
      return that.slice(index, index + searchString.length) === searchString;
    }
  });

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  // ECMAScript 6 symbols shim
  var $        = __webpack_require__(1)
    , setTag   = __webpack_require__(7).set
    , uid      = __webpack_require__(11)
    , shared   = __webpack_require__(35)
    , $def     = __webpack_require__(2)
    , $redef   = __webpack_require__(13)
    , keyOf    = __webpack_require__(78)
    , enumKeys = __webpack_require__(49)
    , assertObject = __webpack_require__(6).obj
    , ObjectProto = Object.prototype
    , DESC     = $.DESC
    , has      = $.has
    , $create  = $.create
    , getDesc  = $.getDesc
    , setDesc  = $.setDesc
    , desc     = $.desc
    , $names   = __webpack_require__(50)
    , getNames = $names.get
    , toObject = $.toObject
    , $Symbol  = $.g.Symbol
    , setter   = false
    , TAG      = uid('tag')
    , HIDDEN   = uid('hidden')
    , _propertyIsEnumerable = {}.propertyIsEnumerable
    , SymbolRegistry = shared('symbol-registry')
    , AllSymbols = shared('symbols')
    , useNative = $.isFunction($Symbol);

  var setSymbolDesc = DESC ? function(){ // fallback for old Android
    try {
      return $create(setDesc({}, HIDDEN, {
        get: function(){
          return setDesc(this, HIDDEN, {value: false})[HIDDEN];
        }
      }))[HIDDEN] || setDesc;
    } catch(e){
      return function(it, key, D){
        var protoDesc = getDesc(ObjectProto, key);
        if(protoDesc)delete ObjectProto[key];
        setDesc(it, key, D);
        if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
      };
    }
  }() : setDesc;

  function wrap(tag){
    var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
    DESC && setter && setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: function(value){
        if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, desc(1, value));
      }
    });
    return sym;
  }

  function defineProperty(it, key, D){
    if(D && has(AllSymbols, key)){
      if(!D.enumerable){
        if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
        D = $create(D, {enumerable: desc(0, false)});
      } return setSymbolDesc(it, key, D);
    } return setDesc(it, key, D);
  }
  function defineProperties(it, P){
    assertObject(it);
    var keys = enumKeys(P = toObject(P))
      , i    = 0
      , l = keys.length
      , key;
    while(l > i)defineProperty(it, key = keys[i++], P[key]);
    return it;
  }
  function create(it, P){
    return P === undefined ? $create(it) : defineProperties($create(it), P);
  }
  function propertyIsEnumerable(key){
    var E = _propertyIsEnumerable.call(this, key);
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
      ? E : true;
  }
  function getOwnPropertyDescriptor(it, key){
    var D = getDesc(it = toObject(it), key);
    if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
    return D;
  }
  function getOwnPropertyNames(it){
    var names  = getNames(toObject(it))
      , result = []
      , i      = 0
      , key;
    while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
    return result;
  }
  function getOwnPropertySymbols(it){
    var names  = getNames(toObject(it))
      , result = []
      , i      = 0
      , key;
    while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
    return result;
  }

  // 19.4.1.1 Symbol([description])
  if(!useNative){
    $Symbol = function Symbol(){
      if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
      return wrap(uid(arguments[0]));
    };
    $redef($Symbol.prototype, 'toString', function(){
      return this[TAG];
    });

    $.create     = create;
    $.setDesc    = defineProperty;
    $.getDesc    = getOwnPropertyDescriptor;
    $.setDescs   = defineProperties;
    $.getNames   = $names.get = getOwnPropertyNames;
    $.getSymbols = getOwnPropertySymbols;

    if($.DESC && $.FW)$redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
  }

  var symbolStatics = {
    // 19.4.2.1 Symbol.for(key)
    'for': function(key){
      return has(SymbolRegistry, key += '')
        ? SymbolRegistry[key]
        : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(key){
      return keyOf(SymbolRegistry, key);
    },
    useSetter: function(){ setter = true; },
    useSimple: function(){ setter = false; }
  };
  // 19.4.2.2 Symbol.hasInstance
  // 19.4.2.3 Symbol.isConcatSpreadable
  // 19.4.2.4 Symbol.iterator
  // 19.4.2.6 Symbol.match
  // 19.4.2.8 Symbol.replace
  // 19.4.2.9 Symbol.search
  // 19.4.2.10 Symbol.species
  // 19.4.2.11 Symbol.split
  // 19.4.2.12 Symbol.toPrimitive
  // 19.4.2.13 Symbol.toStringTag
  // 19.4.2.14 Symbol.unscopables
  $.each.call((
      'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
      'species,split,toPrimitive,toStringTag,unscopables'
    ).split(','), function(it){
      var sym = __webpack_require__(8)(it);
      symbolStatics[it] = useNative ? sym : wrap(sym);
    }
  );

  setter = true;

  $def($def.G + $def.W, {Symbol: $Symbol});

  $def($def.S, 'Symbol', symbolStatics);

  $def($def.S + $def.F * !useNative, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: getOwnPropertySymbols
  });

  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  setTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  setTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  setTag($.g.JSON, 'JSON', true);

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $         = __webpack_require__(1)
    , weak      = __webpack_require__(47)
    , leakStore = weak.leakStore
    , ID        = weak.ID
    , WEAK      = weak.WEAK
    , has       = $.has
    , isObject  = $.isObject
    , isExtensible = Object.isExtensible || isObject
    , tmp       = {};

  // 23.3 WeakMap Objects
  var $WeakMap = __webpack_require__(26)('WeakMap', function(get){
    return function WeakMap(){ return get(this, arguments[0]); };
  }, {
    // 23.3.3.3 WeakMap.prototype.get(key)
    get: function get(key){
      if(isObject(key)){
        if(!isExtensible(key))return leakStore(this).get(key);
        if(has(key, WEAK))return key[WEAK][this[ID]];
      }
    },
    // 23.3.3.5 WeakMap.prototype.set(key, value)
    set: function set(key, value){
      return weak.def(this, key, value);
    }
  }, weak, true, true);

  // IE11 WeakMap frozen keys fix
  if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
    $.each.call(['delete', 'has', 'get', 'set'], function(key){
      var proto  = $WeakMap.prototype
        , method = proto[key];
      __webpack_require__(13)(proto, key, function(a, b){
        // store frozen objects on leaky map
        if(isObject(a) && !isExtensible(a)){
          var result = leakStore(this)[key](a, b);
          return key == 'set' ? this : result;
        // store all the rest on native weakmap
        } return method.call(this, a, b);
      });
    });
  }

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var weak = __webpack_require__(47);

  // 23.4 WeakSet Objects
  __webpack_require__(26)('WeakSet', function(get){
    return function WeakSet(){ return get(this, arguments[0]); };
  }, {
    // 23.4.3.1 WeakSet.prototype.add(value)
    add: function add(value){
      return weak.def(this, value, true);
    }
  }, weak, false, true);

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def      = __webpack_require__(2)
    , $includes = __webpack_require__(44)(true);
  $def($def.P, 'Array', {
    // https://github.com/domenic/Array.prototype.includes
    includes: function includes(el /*, fromIndex = 0 */){
      return $includes(this, el, arguments[1]);
    }
  });
  __webpack_require__(15)('includes');

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  __webpack_require__(46)('Map');

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  // https://gist.github.com/WebReflection/9353781
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(2)
    , ownKeys = __webpack_require__(52);

  $def($def.S, 'Object', {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
      var O      = $.toObject(object)
        , result = {};
      $.each.call(ownKeys(O), function(key){
        $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
      });
      return result;
    }
  });

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

  // http://goo.gl/XkBrjD
  var $    = __webpack_require__(1)
    , $def = __webpack_require__(2);
  function createObjectToArray(isEntries){
    return function(object){
      var O      = $.toObject(object)
        , keys   = $.getKeys(O)
        , length = keys.length
        , i      = 0
        , result = Array(length)
        , key;
      if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
      else while(length > i)result[i] = O[keys[i++]];
      return result;
    };
  }
  $def($def.S, 'Object', {
    values:  createObjectToArray(false),
    entries: createObjectToArray(true)
  });

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/benjamingr/RexExp.escape
  var $def = __webpack_require__(2);
  $def($def.S, 'RegExp', {
    escape: __webpack_require__(33)(/[\\^$*+?.()|[\]{}]/g, '\\$&', true)
  });


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/DavidBruant/Map-Set.prototype.toJSON
  __webpack_require__(46)('Set');

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  // https://github.com/mathiasbynens/String.prototype.at
  'use strict';
  var $def = __webpack_require__(2)
    , $at  = __webpack_require__(36)(true);
  $def($def.P, 'String', {
    at: function at(pos){
      return $at(this, pos);
    }
  });

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(2)
    , $pad = __webpack_require__(54);
  $def($def.P, 'String', {
    lpad: function lpad(n){
      return $pad(this, n, arguments[1], true);
    }
  });

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  var $def = __webpack_require__(2)
    , $pad = __webpack_require__(54);
  $def($def.P, 'String', {
    rpad: function rpad(n){
      return $pad(this, n, arguments[1], false);
    }
  });

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

  // JavaScript 1.6 / Strawman array statics shim
  var $       = __webpack_require__(1)
    , $def    = __webpack_require__(2)
    , $Array  = $.core.Array || Array
    , statics = {};
  function setStatics(keys, length){
    $.each.call(keys.split(','), function(key){
      if(length == undefined && key in $Array)statics[key] = $Array[key];
      else if(key in [])statics[key] = __webpack_require__(14)(Function.call, [][key], length);
    });
  }
  setStatics('pop,reverse,shift,keys,values,entries', 1);
  setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
  setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
             'reduce,reduceRight,copyWithin,fill,turn');
  $def($def.S, 'Array', statics);

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(57);
  var $           = __webpack_require__(1)
    , Iterators   = __webpack_require__(12).Iterators
    , ITERATOR    = __webpack_require__(8)('iterator')
    , ArrayValues = Iterators.Array
    , NL          = $.g.NodeList
    , HTC         = $.g.HTMLCollection
    , NLProto     = NL && NL.prototype
    , HTCProto    = HTC && HTC.prototype;
  if($.FW){
    if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
    if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
  }
  Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  var $def  = __webpack_require__(2)
    , $task = __webpack_require__(56);
  $def($def.G + $def.B, {
    setImmediate:   $task.set,
    clearImmediate: $task.clear
  });

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

  // ie9- setTimeout & setInterval additional parameters fix
  var $         = __webpack_require__(1)
    , $def      = __webpack_require__(2)
    , invoke    = __webpack_require__(27)
    , partial   = __webpack_require__(79)
    , navigator = $.g.navigator
    , MSIE      = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
  function wrap(set){
    return MSIE ? function(fn, time /*, ...args */){
      return set(invoke(
        partial,
        [].slice.call(arguments, 2),
        $.isFunction(fn) ? fn : Function(fn)
      ), time);
    } : set;
  }
  $def($def.G + $def.B + $def.F * MSIE, {
    setTimeout:  wrap($.g.setTimeout),
    setInterval: wrap($.g.setInterval)
  });

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(80);
  __webpack_require__(111);
  __webpack_require__(94);
  __webpack_require__(95);
  __webpack_require__(96);
  __webpack_require__(98);
  __webpack_require__(97);
  __webpack_require__(89);
  __webpack_require__(88);
  __webpack_require__(92);
  __webpack_require__(93);
  __webpack_require__(91);
  __webpack_require__(105);
  __webpack_require__(108);
  __webpack_require__(107);
  __webpack_require__(103);
  __webpack_require__(104);
  __webpack_require__(106);
  __webpack_require__(109);
  __webpack_require__(110);
  __webpack_require__(85);
  __webpack_require__(86);
  __webpack_require__(57);
  __webpack_require__(87);
  __webpack_require__(81);
  __webpack_require__(82);
  __webpack_require__(84);
  __webpack_require__(83);
  __webpack_require__(101);
  __webpack_require__(99);
  __webpack_require__(90);
  __webpack_require__(102);
  __webpack_require__(112);
  __webpack_require__(113);
  __webpack_require__(100);
  __webpack_require__(114);
  __webpack_require__(120);
  __webpack_require__(121);
  __webpack_require__(122);
  __webpack_require__(118);
  __webpack_require__(116);
  __webpack_require__(117);
  __webpack_require__(115);
  __webpack_require__(119);
  __webpack_require__(123);
  __webpack_require__(126);
  __webpack_require__(125);
  __webpack_require__(124);
  module.exports = __webpack_require__(1).core;


/***/ },
/* 128 */
/***/ function(module, exports) {

  /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */

  !(function(global) {
    "use strict";

    var hasOwn = Object.prototype.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var iteratorSymbol =
      typeof Symbol === "function" && Symbol.iterator || "@@iterator";

    var inModule = typeof module === "object";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      if (inModule) {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }

    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = inModule ? module.exports : {};

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided, then outerFn.prototype instanceof Generator.
      var generator = Object.create((outerFn || Generator).prototype);

      generator._invoke = makeInvokeMethod(
        innerFn, self || null,
        new Context(tryLocsList || [])
      );

      return generator;
    }
    runtime.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    runtime.mark = function(genFun) {
      genFun.__proto__ = GeneratorFunctionPrototype;
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `value instanceof AwaitArgument` to determine if the yielded value is
    // meant to be awaited. Some may consider the name of this method too
    // cutesy, but they are curmudgeons.
    runtime.awrap = function(arg) {
      return new AwaitArgument(arg);
    };

    function AwaitArgument(arg) {
      this.arg = arg;
    }

    function AsyncIterator(generator) {
      // This invoke function is written in a style that assumes some
      // calling function (or Promise) will handle exceptions.
      function invoke(method, arg) {
        var result = generator[method](arg);
        var value = result.value;
        return value instanceof AwaitArgument
          ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
          : Promise.resolve(value).then(function(unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration. If the Promise is rejected, however, the
              // result for this iteration will be rejected with the same
              // reason. Note that rejections of yielded Promises are not
              // thrown back into the generator function, as is the case
              // when an awaited Promise is rejected. This difference in
              // behavior between yield and await is important, because it
              // allows the consumer to decide what to do with the yielded
              // rejection (swallow it and continue, manually .throw it back
              // into the generator, abandon iteration, whatever). With
              // await, by contrast, there is no opportunity to examine the
              // rejection reason outside the generator function, so the
              // only option is to throw it from the await expression, and
              // let the generator function handle the exception.
              result.value = unwrapped;
              return result;
            });
      }

      if (typeof process === "object" && process.domain) {
        invoke = process.domain.bind(invoke);
      }

      var invokeNext = invoke.bind(generator, "next");
      var invokeThrow = invoke.bind(generator, "throw");
      var invokeReturn = invoke.bind(generator, "return");
      var previousPromise;

      function enqueue(method, arg) {
        var enqueueResult =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(function() {
            return invoke(method, arg);
          }) : new Promise(function(resolve) {
            resolve(invoke(method, arg));
          });

        // Avoid propagating enqueueResult failures to Promises returned by
        // later invocations of the iterator.
        previousPromise = enqueueResult["catch"](function(ignored){});

        return enqueueResult;
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
      );

      return runtime.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            if (method === "return" ||
                (method === "throw" && delegate.iterator[method] === undefined)) {
              // A return or throw (when the delegate iterator has no throw
              // method) always terminates the yield* loop.
              context.delegate = null;

              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              var returnMethod = delegate.iterator["return"];
              if (returnMethod) {
                var record = tryCatch(returnMethod, delegate.iterator, arg);
                if (record.type === "throw") {
                  // If the return method threw an exception, let that
                  // exception prevail over the original return or throw.
                  method = "throw";
                  arg = record.arg;
                  continue;
                }
              }

              if (method === "return") {
                // Continue with the outer return, now that the delegate
                // iterator has been terminated.
                continue;
              }
            }

            var record = tryCatch(
              delegate.iterator[method],
              delegate.iterator,
              arg
            );

            if (record.type === "throw") {
              context.delegate = null;

              // Like returning generator.throw(uncaught), but without the
              // overhead of an extra function call.
              method = "throw";
              arg = record.arg;
              continue;
            }

            // Delegate generator ran and handled its own exceptions so
            // regardless of what the method was, we continue as if it is
            // "next" with an undefined arg.
            method = "next";
            arg = undefined;

            var info = record.arg;
            if (info.done) {
              context[delegate.resultName] = info.value;
              context.next = delegate.nextLoc;
            } else {
              state = GenStateSuspendedYield;
              return info;
            }

            context.delegate = null;
          }

          if (method === "next") {
            if (state === GenStateSuspendedYield) {
              context.sent = arg;
            } else {
              context.sent = undefined;
            }

          } else if (method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw arg;
            }

            if (context.dispatchException(arg)) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              method = "next";
              arg = undefined;
            }

          } else if (method === "return") {
            context.abrupt("return", arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            var info = {
              value: record.arg,
              done: context.done
            };

            if (record.arg === ContinueSentinel) {
              if (context.delegate && method === "next") {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                arg = undefined;
              }
            } else {
              return info;
            }

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(arg) call above.
            method = "throw";
            arg = record.arg;
          }
        }
      };
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;

    function doneResult() {
      return { value: undefined, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = undefined;
        this.done = false;
        this.delegate = null;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.next = finallyEntry.finallyLoc;
        } else {
          this.complete(record);
        }

        return ContinueSentinel;
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = record.arg;
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        return ContinueSentinel;
      }
    };
  })(
    // Among the various tricks for obtaining a reference to the global
    // object, this seems to be the most reliable technique that does not
    // use indirect eval (which violates Content Security Policy).
    typeof global === "object" ? global :
    typeof window === "object" ? window :
    typeof self === "object" ? self : this
  );


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(75);


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _superagent = __webpack_require__(30);

  var _superagent2 = _interopRequireDefault(_superagent);

  var _reactLibExecutionEnvironment = __webpack_require__(16);

  var _dispatchersDispatcher = __webpack_require__(22);

  var _dispatchersDispatcher2 = _interopRequireDefault(_dispatchersDispatcher);

  var _constantsActionTypes = __webpack_require__(20);

  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

  exports['default'] = {

    navigateTo: function navigateTo(path, options) {
      console.log('AppActions.navigateTo()| path:', path);
      console.log('AppActions.navigateTo()| options:', options);
      this.loadPage(path, function () {
        if (_reactLibExecutionEnvironment.canUseDOM) {
          if (options && options.replace) {
            window.history.replaceState({}, document.title, path);
          } else {
            window.history.pushState({}, document.title, path);
          }
        }

        _dispatchersDispatcher2['default'].dispatch({
          type: _constantsActionTypes2['default'].CHANGE_LOCATION,
          path: path
        });
      });
    },

    loadPage: function loadPage(path, cb) {
      console.log('AppActions.loadPage()| path:', path);
      _dispatchersDispatcher2['default'].dispatch({
        type: _constantsActionTypes2['default'].GET_PAGE,
        path: path
      });

      _superagent2['default'].get('/routeapi/query?path=' + encodeURI(path)).accept('application/json').end(function (err, res) {
        _dispatchersDispatcher2['default'].dispatch({
          type: _constantsActionTypes2['default'].RECEIVE_PAGE,
          path: path,
          err: err,
          page: res ? res.body : null
        });

        if (cb) {
          cb();
        }
      });
    }

  };
  module.exports = exports['default'];

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _dispatchersDispatcher = __webpack_require__(22);

  var _dispatchersDispatcher2 = _interopRequireDefault(_dispatchersDispatcher);

  var _constantsNeighbourhoodActionTypes = __webpack_require__(62);

  var _constantsNeighbourhoodActionTypes2 = _interopRequireDefault(_constantsNeighbourhoodActionTypes);

  exports['default'] = {
    fetchNeighbourhoods: function fetchNeighbourhoods(neighbourhoods) {
      console.log('NeighbourhoodAction.fetchNeighbourhood()| fetched neighbourhoods:', neighbourhoods);

      if (neighbourhoods) {
        _dispatchersDispatcher2['default'].dispatch({
          type: _constantsNeighbourhoodActionTypes2['default'].LOAD_NEIGHBOURHOOD,
          neighbourhoods: neighbourhoods
        });
      } else {
        console.log('NeighbourhoodAction.fetchNeighbourhood()| Fetch Fail!!!');
      }
    },

    searchNeighbourhood: function searchNeighbourhood(neighbourhood) {
      console.log('NeighbourhoodAction.searchNeighbourhood()| searched neighbourhood:', neighbourhood);

      if (neighbourhood) {
        _dispatchersDispatcher2['default'].dispatch({
          type: _constantsNeighbourhoodActionTypes2['default'].SEARCH_NEIGHBOURHOOD,
          neighbourhood: neighbourhood
        });
      } else {
        console.log('NeighbourhoodAction.searchNeighbourhood()| Search Fail!!!');
      }
    }
  };
  module.exports = exports['default'];

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _FeedbackLess = __webpack_require__(156);

  var _FeedbackLess2 = _interopRequireDefault(_FeedbackLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _decoratorsWithViewport = __webpack_require__(64);

  var _decoratorsWithViewport2 = _interopRequireDefault(_decoratorsWithViewport);

  var Feedback = (function () {
    function Feedback() {
      _classCallCheck(this, _Feedback);
    }

    _createClass(Feedback, [{
      key: 'render',
      value: function render() {
        var _props$viewport = this.props.viewport;
        var width = _props$viewport.width;
        var height = _props$viewport.height;

        var feedbackClassName = 'feedback';
        if (width < 340) {
          feedbackClassName += ' bottom';
        }
        return _react2['default'].createElement(
          'div',
          { className: feedbackClassName },
          _react2['default'].createElement(
            'div',
            { className: 'feedback-container' },
            _react2['default'].createElement(
              'a',
              { className: 'feedback-link', href: 'https://github.com/amit242/antyka/issues/new' },
              'Ask a question'
            ),
            _react2['default'].createElement(
              'span',
              { className: 'feedback-spacer' },
              '|'
            ),
            _react2['default'].createElement(
              'a',
              { className: 'feedback-link', href: 'https://github.com/amit242/antyka/issues/new' },
              'Report an issue'
            )
          )
        );
      }
    }]);

    var _Feedback = Feedback;
    Feedback = (0, _decoratorsWithStyles2['default'])(_FeedbackLess2['default'])(Feedback) || Feedback;
    Feedback = (0, _decoratorsWithViewport2['default'])(Feedback) || Feedback;
    return Feedback;
  })();

  exports['default'] = Feedback;
  module.exports = exports['default'];

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _FooterLess = __webpack_require__(157);

  var _FooterLess2 = _interopRequireDefault(_FooterLess);

  var _decoratorsWithViewport = __webpack_require__(64);

  var _decoratorsWithViewport2 = _interopRequireDefault(_decoratorsWithViewport);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _reactRouter = __webpack_require__(10);

  var Footer = (function () {
    function Footer() {
      _classCallCheck(this, _Footer);
    }

    _createClass(Footer, [{
      key: 'render',

      /*componentWillMount() {
        let { width, height } = this.props.viewport;
        console.log('Footer componentWillMount()|', arguments, width, height);
      }
      componentDidMount(rootNode) {
        let { width, height } = this.props.viewport;
        console.log('Footer componentDidMount()|', arguments, width, height);
      }*/
      value: function render() {
        // This is just an example how one can render CSS
        var _props$viewport = this.props.viewport;
        var width = _props$viewport.width;
        var height = _props$viewport.height;

        //console.log('Footer render()|', width, height);
        // let width=400;
        // let height=700;
        this.renderCss('.Footer-viewport:after {content:\' ' + width + 'x' + height + '\';}');
        var viewportString;

        // console.log'FOOTER render', this.isSmallViewport);
        var footerClassName = 'Footer';
        if (width < 340) {
          footerClassName += ' hide';
        }
        /*if(width < 630) {
          viewportString = '';
        } else {
          viewportString = 'Viewport:';
        }*/
        return _react2['default'].createElement(
          'div',
          { className: footerClassName },
          _react2['default'].createElement(
            'div',
            { className: 'Footer-container' },
            _react2['default'].createElement(
              'span',
              { className: 'Footer-text' },
              '© closYaar'
            ),
            _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              ' | '
            ),
            _react2['default'].createElement(
              'span',
              { ref: 'viewport', className: 'Footer-viewport Footer-text Footer-text--muted' },
              viewportString
            ),
            _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              '|'
            ),
            _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Footer-link', to: '/' },
              'Home'
            ),
            !this.props.LoginState.userLoggedIn && _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              '·'
            ),
            !this.props.LoginState.userLoggedIn && _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Footer-link', to: 'login' },
              'Log in'
            ),
            width > 350 && _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              ' | '
            ),
            width > 350 && _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Footer-link', to: 'about' },
              'About'
            ),
            width > 420 && _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              '·'
            ),
            width > 420 && _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Footer-link', to: 'contact' },
              'Contact'
            ),
            width > 480 && _react2['default'].createElement(
              'span',
              { className: 'Footer-spacer' },
              '·'
            ),
            width > 480 && _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Footer-link', to: 'privacy' },
              'Privacy'
            )
          )
        );
        /*return (
          <div className={footerClassName}>
            <div className="Footer-container">
              <span className="Footer-text">© closYaar</span>
              <span className="Footer-spacer"> | </span>
              <span ref="viewport" className="Footer-viewport Footer-text Footer-text--muted">{viewportString}</span>
              <span className="Footer-spacer">|</span>
              <a className="Footer-link" href="/" onClick={Link.handleClick}>Home</a>
              
              {!this.props.LoginState.userLoggedIn && (<span className="Footer-spacer">·</span>)}
              {!this.props.LoginState.userLoggedIn && (<Link className="Footer-link" to="login">Log in</Link>)}
              <span className="Footer-spacer">·</span>
              <a className="Footer-link" href="/not-found" onClick={Link.handleClick}>Not Found</a>
              <span className="Footer-spacer"> | </span>
              <a className="Footer-link" href="/about" onClick={Link.handleClick}>About</a>
              <span className="Footer-spacer">·</span>
              <a className="Footer-link" href="/contact" onClick={Link.handleClick}>Contact</a>
              <span className="Footer-spacer">·</span>
              <a className="Footer-link" href="/privacy" onClick={Link.handleClick}>Privacy</a>
            </div>
          </div>
        );*/
      }
    }], [{
      key: 'propTypes',
      value: {
        viewport: _react.PropTypes.shape({
          width: _react.PropTypes.number.isRequired,
          height: _react.PropTypes.number.isRequired
        }).isRequired
      },
      enumerable: true
    }]);

    var _Footer = Footer;
    Footer = (0, _decoratorsWithStyles2['default'])(_FooterLess2['default'])(Footer) || Footer;
    Footer = (0, _decoratorsWithViewport2['default'])(Footer) || Footer;
    return Footer;
  })();

  exports['default'] = Footer;
  module.exports = exports['default'];

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _HeaderLess = __webpack_require__(158);

  var _HeaderLess2 = _interopRequireDefault(_HeaderLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _reactRouter = __webpack_require__(10);

  var _Navigation = __webpack_require__(140);

  var _Navigation2 = _interopRequireDefault(_Navigation);

  var Header = (function () {
    function Header() {
      _classCallCheck(this, _Header);
    }

    _createClass(Header, [{
      key: 'render',
      value: function render() {
        console.log('Header.render()| props:', this.props);
        return _react2['default'].createElement(
          'div',
          { className: 'Header' },
          _react2['default'].createElement(
            'div',
            { className: 'Header-container' },
            _react2['default'].createElement(
              _reactRouter.Link,
              { className: 'Header-brand', to: '/' },
              _react2['default'].createElement('img', { className: 'Header-brandImg', src: __webpack_require__(174), width: '114', height: '62', alt: 'closyaar' })
            ),
            _react2['default'].createElement(_Navigation2['default'], _extends({ className: 'Header-nav' }, this.props)),
            _react2['default'].createElement('div', { className: 'Header-banner' })
          )
        );
      }
    }]);

    var _Header = Header;
    Header = (0, _decoratorsWithStyles2['default'])(_HeaderLess2['default'])(Header) || Header;
    return Header;
  })();

  exports['default'] = Header;
  module.exports = exports['default'];

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _LoadingPageLess = __webpack_require__(159);

  var _LoadingPageLess2 = _interopRequireDefault(_LoadingPageLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  //import withAuthentication from '../../decorators/withAuthentication';
  //import { Link } from 'react-router';

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var LoadingPage = (function (_React$Component) {
    _inherits(LoadingPage, _React$Component);

    function LoadingPage() {
      _classCallCheck(this, _LoadingPage);

      _get(Object.getPrototypeOf(_LoadingPage.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(LoadingPage, [{
      key: 'render',
      value: function render() {
        //let title = this.props.user.name;
        this.context.onSetTitle('loading page');
        return _react2['default'].createElement(
          'div',
          { className: 'loading' },
          _react2['default'].createElement('img', { className: 'loading-image', src: __webpack_require__(173), alt: 'page loading...' })
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
        //onPageNotFound: PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    var _LoadingPage = LoadingPage;
    LoadingPage = (0, _decoratorsWithStyles2['default'])(_LoadingPageLess2['default'])(LoadingPage) || LoadingPage;
    return LoadingPage;
  })(_react2['default'].Component);

  exports['default'] = LoadingPage;
  module.exports = exports['default'];

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _LoginLess = __webpack_require__(161);

  var _LoginLess2 = _interopRequireDefault(_LoginLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _TextBox = __webpack_require__(19);

  var _TextBox2 = _interopRequireDefault(_TextBox);

  var _reactRouter = __webpack_require__(10);

  var _classnames = __webpack_require__(17);

  var _classnames2 = _interopRequireDefault(_classnames);

  //import AppActions from '../../actions/AppActions';

  var _servicesAuthService = __webpack_require__(23);

  var _servicesAuthService2 = _interopRequireDefault(_servicesAuthService);

  var Login = (function (_React$Component) {
    _inherits(Login, _React$Component);

    _createClass(Login, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    function Login() {
      _classCallCheck(this, _Login);

      _get(Object.getPrototypeOf(_Login.prototype), 'constructor', this).call(this);

      this.state = {
        userId: '',
        password: '',
        loginError: false
      };
    }

    _createClass(Login, [{
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'userNameChanged',
      value: function userNameChanged(event) {
        this.setState({ userId: event.target.value });
      }
    }, {
      key: 'passwordChanged',
      value: function passwordChanged(event) {
        this.setState({ password: event.target.value });
      }
    }, {
      key: 'authenticate',
      value: function authenticate(e) {
        var _this = this;

        e.preventDefault();
        //alert(this.state);
        console.log('Login.authenticate()| state:', this.state, e);
        _servicesAuthService2['default'].login(this.state.userId, this.state.password, function () {
          _this.setState({ loginError: true });
        });
        //alert(this.state);
        //   .catch(function(err) {
        //     console.log('Error logging in', err);
        //   });
      }
    }, {
      key: 'render',
      value: function render() {
        //console.log('amit', this);
        var title = 'Login';
        this.context.onSetTitle(title);
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(this.props.className, 'Login-container') },
          _react2['default'].createElement(
            'form',
            null,
            _react2['default'].createElement(_TextBox2['default'], { className: 'Login-TextBox', ref: 'userId', value: this.userId, type: 'text', placeholder: 'Email', onChange: this.userNameChanged.bind(this) }),
            _react2['default'].createElement(_TextBox2['default'], { className: 'Login-TextBox', ref: 'password', value: this.password, type: 'password', placeholder: 'Password', onChange: this.passwordChanged.bind(this) }),
            this.state.loginError && _react2['default'].createElement(
              'span',
              { className: 'Login-error' },
              'Invalid userId/password'
            ),
            _react2['default'].createElement(
              'div',
              { className: 'Login-helper' },
              _react2['default'].createElement(
                'label',
                null,
                _react2['default'].createElement('input', { type: 'checkbox', ref: 'rememberme' }),
                _react2['default'].createElement(
                  'span',
                  null,
                  'Remember me'
                )
              ),
              _react2['default'].createElement(
                'a',
                { className: 'Login-helper-forgot', href: '/account/reset_password' },
                'Forgot password?'
              )
            ),
            _react2['default'].createElement('input', { type: 'submit', onClick: this.authenticate.bind(this), value: 'Log in' })
          ),
          _react2['default'].createElement(
            'div',
            { className: 'Login-spacer' },
            'or'
          ),
          _react2['default'].createElement(
            _reactRouter.Link,
            { className: 'Login-link Login-link-highlight', to: 'register' },
            'Login with Facebook'
          )
        );
      }
    }]);

    var _Login = Login;
    Login = (0, _decoratorsWithStyles2['default'])(_LoginLess2['default'])(Login) || Login;
    return Login;
  })(_react2['default'].Component);

  exports['default'] = Login;
  module.exports = exports['default'];

  //console.log('componentDidMount', this);

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _MapPageLess = __webpack_require__(162);

  var _MapPageLess2 = _interopRequireDefault(_MapPageLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _decoratorsWithAuthentication = __webpack_require__(21);

  var _decoratorsWithAuthentication2 = _interopRequireDefault(_decoratorsWithAuthentication);

  var _TextBox = __webpack_require__(19);

  var _TextBox2 = _interopRequireDefault(_TextBox);

  var _Map = __webpack_require__(139);

  var _Map2 = _interopRequireDefault(_Map);

  var _servicesNeighbourhoodService = __webpack_require__(65);

  // import Link from '../../utils/Link';
  // import AppActions from '../../actions/AppActions';
  // import AuthService from '../../auth/AuthService';

  var _servicesNeighbourhoodService2 = _interopRequireDefault(_servicesNeighbourhoodService);

  var MapPage = (function (_React$Component) {
    _inherits(MapPage, _React$Component);

    _createClass(MapPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    function MapPage() {
      _classCallCheck(this, _MapPage);

      _get(Object.getPrototypeOf(_MapPage.prototype), 'constructor', this).call(this);
      this.state = {
        lat: '',
        lng: '',
        position: null,
        neighbourhood: null,
        googleMapLoaded: false,
        drawMode: false
      };
    }

    _createClass(MapPage, [{
      key: 'componentDidMount',
      value: function componentDidMount(rootNode) {
        console.log('MapPage.componentDidMount()| googleMapLoaded:', googleMapLoaded);
        this.checkIfGoogleMapLoaded();
      }
    }, {
      key: 'checkIfGoogleMapLoaded',
      value: function checkIfGoogleMapLoaded() {
        console.log('MapPage.componentDidMount()| checkIfGoogleMapLoaded:', googleMapLoaded);
        if (!googleMapLoaded) {
          // check if google map was loaded
          setTimeout(this.checkIfGoogleMapLoaded.bind(this), 50); //wait 50 millisecnds then recheck
          return;
        }
        this.setState({ googleMapLoaded: true });
      }
    }, {
      key: 'findLocation',
      value: function findLocation(event) {
        //console.log('AMIT click:', this.state.position);
        //let pos = this.state.position;
        var lat = this.state.lat;
        var lng = this.state.lng;
        //alert(this.state.position.lat + ', ' + this.state.position.lng);
        this.setState({ position: { lat: lat, lng: lng } });
      }
    }, {
      key: 'findCurrentLocation',
      value: function findCurrentLocation(event) {
        this.setState({ position: null });
      }
    }, {
      key: 'findLocationByAddress',
      value: function findLocationByAddress(event) {
        var geocoder = new google.maps.Geocoder();
        console.debug('findLocationByAddress:', this.state.address);
        var _this = this;
        geocoder.geocode({ address: this.state.address }, function (results, status) {

          if (status == google.maps.GeocoderStatus.OK) {
            console.debug('GEOCODER LOCATION: ', results[0].geometry.location, status);
            //map.setCenter(results[0].geometry.location);
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            _this.setState({ position: { lat: lat, lng: lng } });
            // var marker = new google.maps.Marker({
            //     map: map,
            //     position: results[0].geometry.location
            // });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    }, {
      key: 'drawNeighbourhood',
      value: function drawNeighbourhood(event) {
        this.setState({ drawMode: !this.state.drawMode });
        if (this.state.drawMode) {
          this.setState({ neighbourhood: null });
        }
      }
    }, {
      key: 'saveNeighbourhood',
      value: function saveNeighbourhood(event) {
        console.log('saveNeighbourhood()|', this.state.neighbourhood);
        _servicesNeighbourhoodService2['default'].saveNeighbourhood({ encodedpolygon: this.state.neighbourhood.encodedpolygon }, this.props.user._id, function (error) {
          alert(error);
        });
      }
    }, {
      key: 'onNeighbourhoodChange',
      value: function onNeighbourhoodChange(event) {
        console.log('MapPage.onNeighbourhoodChange()|', arguments[0]);
        this.setState({ neighbourhood: arguments[0] });
      }
    }, {
      key: '_onchange',
      value: function _onchange(event) {
        //console.log('RegisterPage._onchange()| event:', event.target);
        var controlState = {};

        controlState[event.target.id] = event.target.value;
        //console.log('MapPage._onchange()| controlState:', controlState);
        this.setState(controlState);
      }
    }, {
      key: 'render',
      value: function render() {
        console.debug('MapPage.render()| state:', this.state);
        console.debug('MapPage.render()| props:', this.props);
        //let title = this.props.user.name;
        this.context.onSetTitle('Map');
        return _react2['default'].createElement(
          'div',
          { className: 'mappage' },
          this.state.neighbourhood && !this.state.neighbourhood.isValid && _react2['default'].createElement(
            'span',
            { className: 'mappage-floating bottom error' },
            this.state.neighbourhood.errorMsg
          ),
          _react2['default'].createElement(
            'div',
            { className: 'mappage-floating' },
            !this.state.drawMode && _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement('input', { type: 'button', value: 'Draw Neighbourhood', onClick: this.drawNeighbourhood.bind(this) }),
              _react2['default'].createElement('input', { type: 'button', value: 'Find my current location', onClick: this.findCurrentLocation.bind(this) }),
              _react2['default'].createElement(_TextBox2['default'], { id: 'address', className: 'RegisterPage-textbox', ref: 'address', value: this.state.address, type: 'text', placeholder: 'address', maxLines: 3, onChange: this._onchange.bind(this) }),
              _react2['default'].createElement('input', { type: 'button', value: 'Find my address', onClick: this.findLocationByAddress.bind(this) })
            ),
            this.state.drawMode && _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement('input', { type: 'button', value: 'Remove drawing and start over', disabled: !this.state.neighbourhood, onClick: this.drawNeighbourhood.bind(this) }),
              _react2['default'].createElement('input', { type: 'button', value: 'Save Neighbourhood', disabled: !(this.state.neighbourhood && this.state.neighbourhood.isValid), onClick: this.saveNeighbourhood.bind(this) })
            )
          ),
          this.state.googleMapLoaded && _react2['default'].createElement(_Map2['default'], _extends({}, this.props, { position: this.state.position, drawMode: this.state.drawMode, onNeighbourhoodChange: this.onNeighbourhoodChange.bind(this) }))
        );
      }
    }]);

    var _MapPage = MapPage;
    MapPage = (0, _decoratorsWithStyles2['default'])(_MapPageLess2['default'])(MapPage) || MapPage;
    MapPage = (0, _decoratorsWithAuthentication2['default'])(MapPage) || MapPage;
    return MapPage;
  })(_react2['default'].Component);

  exports['default'] = MapPage;
  module.exports = exports['default'];
  /*<TextBox id="lat" className="mappage-TextBox" ref="lat" value={this.state.lat} type="text" placeholder="Latitude" onChange={this._onchange.bind(this)} />
  <TextBox id="lng"className="mappage-TextBox" ref="lng" value={this.state.lng} type="text" placeholder="Longitude" onChange={this._onchange.bind(this)} />
  <input type="button" value="Find Location" onClick={this.findLocation.bind(this)} />*/

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _jsts = __webpack_require__(179);

  var _jsts2 = _interopRequireDefault(_jsts);

  var AntykaGeometry = (function () {
    function AntykaGeometry() {
      _classCallCheck(this, AntykaGeometry);
    }

    _createClass(AntykaGeometry, [{
      key: 'findSelfIntersects',

      /**
      * findSelfIntersects
      *
      * Detect self-intersections in a polygon.
      *
      * @param {object} google.maps.Polygon path co-ordinates.
      * @return {array} array of points of intersections.
      */
      value: function findSelfIntersects(googlePolygonPath) {
        var coordinates = this.googleMaps2JTS(googlePolygonPath);
        var geometryFactory = new _jsts2['default'].geom.GeometryFactory();
        var shell = geometryFactory.createLinearRing(coordinates);
        var jstsPolygon = geometryFactory.createPolygon(shell);
        console.log('AntykaGeometry.findSelfIntersects()| shell:', shell, jstsPolygon);
        // if the geometry is aleady a simple linear ring, do not
        // try to find self intersection points.
        var validator = new _jsts2['default'].operation.IsSimpleOp(jstsPolygon);
        //console.log('findSelfIntersects() simple:', validator.isSimple(), validator.isSimpleLinearGeometry(jstsPolygon), jstsPolygon);

        if (validator.isSimpleLinearGeometry(jstsPolygon)) {
          return null;
        }

        var res = [];
        var graph = new _jsts2['default'].geomgraph.GeometryGraph(0, jstsPolygon);
        var cat = new _jsts2['default'].operation.valid.ConsistentAreaTester(graph);
        var r = cat.isNodeConsistentArea();
        if (!r) {
          //console.log('findSelfIntersects():', cat);
          var pt = cat.getInvalidPoint();
          res.push([pt.x, pt.y]);
        }
        return res;
      }
    }, {
      key: 'googleMaps2JTS',
      value: function googleMaps2JTS(boundaries) {
        var coordinates = [];

        for (var i = 0; i < boundaries.getLength(); i++) {
          coordinates.push(new _jsts2['default'].geom.Coordinate(boundaries.getAt(i).lat(), boundaries.getAt(i).lng()));
          //console.log('latlang: ', boundaries.getAt(i).lat(), boundaries.getAt(i).lng());
        }
        // adding the first vertex againg to fix intersection bug
        coordinates.push(new _jsts2['default'].geom.Coordinate(boundaries.getAt(0).lat(), boundaries.getAt(0).lng()));
        return coordinates;
      }
    }, {
      key: 'isIntersectingPolygon',
      value: function isIntersectingPolygon(googlePolygonPath1, googlePolygonPath2) {
        var geometryFactory = new _jsts2['default'].geom.GeometryFactory();

        var coordinates1 = this.googleMaps2JTS(googlePolygonPath1);
        var shell1 = geometryFactory.createLinearRing(coordinates1);
        var jstsPolygon1 = geometryFactory.createPolygon(shell1);

        var coordinates2 = this.googleMaps2JTS(googlePolygonPath2);
        var shell2 = geometryFactory.createLinearRing(coordinates2);
        var jstsPolygon2 = geometryFactory.createPolygon(shell2);

        console.log('AntykaGeometry.isIntersectingPolygon()|', jstsPolygon1, jstsPolygon2);
        var intersection = jstsPolygon1.intersection(jstsPolygon2);
        console.debug('AntykaGeometry.isIntersectingPolygon()| intersection:', intersection);
        if (intersection && intersection.geometries && intersection.geometries.length > 0 && intersection.geometries[0].shell) {
          return intersection.geometries[0].shell.points;
        } else if (intersection.shell) {
          return intersection.shell.points;
        }
        return null;
      }
    }]);

    return AntykaGeometry;
  })();

  exports['default'] = AntykaGeometry;
  module.exports = exports['default'];

  //console.debug('AntykaGeometry constructor');

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _classnames = __webpack_require__(17);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _MapLess = __webpack_require__(163);

  var _MapLess2 = _interopRequireDefault(_MapLess);

  //import TextBox from '../TextBox';

  var _AntykaGeometry = __webpack_require__(138);

  var _AntykaGeometry2 = _interopRequireDefault(_AntykaGeometry);

  //import { canUseDOM } from 'react/lib/ExecutionEnvironment';

  var _servicesNeighbourhoodService = __webpack_require__(65);

  var _servicesNeighbourhoodService2 = _interopRequireDefault(_servicesNeighbourhoodService);

  var _storesNeighbourhoodStore = __webpack_require__(152);

  var _storesNeighbourhoodStore2 = _interopRequireDefault(_storesNeighbourhoodStore);

  var _lodash = __webpack_require__(73);

  var _lodash2 = _interopRequireDefault(_lodash);

  var Map = (function (_Component) {
    _inherits(Map, _Component);

    _createClass(Map, null, [{
      key: 'propTypes',
      value: {
        position: _react.PropTypes.instanceOf(Object),
        drawMode: _react.PropTypes.bool.isRequired,
        onNeighbourhoodChange: _react2['default'].PropTypes.func.isRequired,
        className: _react.PropTypes.string
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        position: null
      },
      enumerable: true
    }]);

    function Map() {
      _classCallCheck(this, _Map);

      _get(Object.getPrototypeOf(_Map.prototype), 'constructor', this).call(this);
      this.neighbourhood = null;
      this.state = {
        //address: '',
        existingPolygons: null,
        error: false,
        //neighbourhood: null,
        map: null
      };
    }

    _createClass(Map, [{
      key: 'shouldComponentUpdate',

      // Life cycle methods
      value: function shouldComponentUpdate(nextProps, nextStates) {
        console.log('shouldComponentUpdate() position:', this.props.position, nextProps.position, _lodash2['default'].isEqual(this.props.position, nextProps.position));
        console.log('shouldComponentUpdate() drawMode:', this.props.drawMode, nextProps.drawMode, this.props.drawMode !== nextProps.drawMode);
        console.log('shouldComponentUpdate() existingPolygons:', this.state.existingPolygons, nextStates.existingPolygons, this.state.existingPolygons !== nextStates.existingPolygons);
        //return this.props.position !== nextProps.position || this.props.drawMode !== nextProps.drawMode;
        // TODO: need a more gracefull way to do this
        return !_lodash2['default'].isEqual(this.props.position, nextProps.position) || this.props.drawMode !== nextProps.drawMode || this.state.existingPolygons !== nextStates.existingPolygons;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _storesNeighbourhoodStore2['default'].removeChangeListener(this.neighbourhoodStoreListener);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        console.log('Map.componentDidMount()| props:', this.props);

        this.neighbourhoodStoreListener = this.onNeighbourhoodStoreChange.bind(this);
        _storesNeighbourhoodStore2['default'].addChangeListener(this.neighbourhoodStoreListener);

        _servicesNeighbourhoodService2['default'].findNeighbourhoodsByViewport();

        /*
            if(this.props.user.neighbourhood) {
              NeighbourhoodService.searchNeighbourhoodById(this.props.user.neighbourhood);
            }
        */
        var mapOptions = {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 15,
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_TOP
          }
        };
        var map = new google.maps.Map(_react2['default'].findDOMNode(this), mapOptions);
        var infoWindow = new google.maps.InfoWindow({ map: map });

        google.maps.event.addListener(map, 'dragend', function () {
          // TODO: load existing polygons according to bound
          console.log('Map map event: dragend:', map.getBounds(), map.getZoom());
        });

        google.maps.event.addListener(map, 'zoom_changed', function () {
          // TODO: load existing polygons according to bound, Do not load if zoom level is less then 10
          console.log('Map map event: zoom_changed:', map.getBounds(), map.getZoom());
        });

        this.drawingManager = new google.maps.drawing.DrawingManager({
          drawingControl: false,
          polygonOptions: {
            fillColor: '#FFFF00',
            fillOpacity: 0.1,
            strokeWeight: 1,
            strokeColor: '#DD2200',
            clickable: true,
            editable: true,
            zIndex: 2
          },
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: []
          }
        });
        this.drawingManager.setMap(map);

        var _this = this;
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (function (e) {
          //console.log('Overlay complete:', e);
          console.debug('Overlay complete:', e.overlay.getPath().getArray());
          var newShape = e.overlay;
          this.drawingManager.setDrawingMode(null);

          this.validateShapeAndUpdate(newShape);

          console.debug('Overlay complete polygon:', newShape);
          this.neighbourhood = newShape;

          this.attachEventListenersToOverlayPolygon(newShape, true);
        }).bind(this));

        this.setState({ map: map, infoWindow: infoWindow });
        console.log('Map.componentDidMount end!!!');
      }
    }, {
      key: 'attachEventListenersToOverlayPolygon',

      // ...................

      // supporting methods
      value: function attachEventListenersToOverlayPolygon(newShape, editable) {
        var _this2 = this;

        google.maps.event.addListener(newShape, 'click', function (event) {
          console.log('overlay click:', event);
        });
        if (editable) {
          (function () {
            var _this = _this2;
            google.maps.event.addListener(newShape.getPath(), 'set_at', function (event) {
              console.debug('overlay edit set_at:', event, newShape.getPath().getArray());
              _this.validateShapeAndUpdate(newShape);
            });

            google.maps.event.addListener(newShape.getPath(), 'insert_at', function (event) {
              console.log('overlay edit insert_at:', event);
              _this.validateShapeAndUpdate(newShape);
            });

            google.maps.event.addListener(newShape.getPath(), 'remove_at', function (event) {
              console.log('overlay edit remove_at:', event);
              _this.validateShapeAndUpdate(newShape);
            });
          })();
        }
      }
    }, {
      key: 'renderExistingNeighbourhoods',
      value: function renderExistingNeighbourhoods() {
        var map = this.state.map;
        if (map) {
          console.debug('Rendering Existing Neighbourhoods...');
          _lodash2['default'].forEach(this.state.existingPolygons, function (polygon) {
            polygon.setMap(map);
          });
        }
      }
    }, {
      key: 'onNeighbourhoodStoreChange',
      value: function onNeighbourhoodStoreChange() {
        this.loadExistingPolygons();
      }
    }, {
      key: 'loadExistingPolygons',
      value: function loadExistingPolygons() {
        var _this3 = this;

        console.log('Map.loadExistingPolygons():');

        var existingPolygons = [];
        var encodedNeighbourhoods = _storesNeighbourhoodStore2['default'].getNeighbourhoods();
        var ownNeighbourhood = this.props.user.neighbourhood;

        _lodash2['default'].forEach(encodedNeighbourhoods, (function (encodedNeighbourhood) {
          console.log('Map.loadExistingPolygons() encodedNeighbourhood:', encodedNeighbourhood, google.maps.geometry);
          var decodedPath = google.maps.geometry.encoding.decodePath(encodedNeighbourhood.encodedpolygon);
          console.log('Map.loadExistingPolygons() decodedNeighbourhood:', decodedPath);
          var userNeighbourhood = ownNeighbourhood && ownNeighbourhood === encodedNeighbourhood._id;
          var poly = new google.maps.Polygon({
            paths: decodedPath,
            strokeColor: '#008888',
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: userNeighbourhood ? '#00FF00' : '#FF6600',
            fillOpacity: 0.1,
            zIndex: 2,
            editable: userNeighbourhood
          });
          _this3.attachEventListenersToOverlayPolygon(poly, userNeighbourhood);
          existingPolygons.push(poly);
        }).bind(this));

        this.setState({ existingPolygons: existingPolygons });
      }
    }, {
      key: 'findPolygonCenter',
      value: function findPolygonCenter(path) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < path.length; i++) {
          bounds.extend(path.getAt(i));
        }
        return bounds.getCenter();
      }
    }, {
      key: 'validateShapeAndUpdate',
      value: function validateShapeAndUpdate(newShape) {
        var isValid = false;

        if (!this.findSelfIntersectsAndShowError(newShape) && !this.findIntersectsAndShowError(newShape) && this.validNeighbourhoodArea(newShape)) {
          isValid = true;
        }
        var encodedPath = google.maps.geometry.encoding.encodePath(newShape.getPath());
        console.log('validateShapeAndUpdate()|', isValid, this.state.infoWindow.getContent());
        //this.setState({neighbourhood: newShape, error: !isValid});
        var changed = { isValid: isValid, encodedpolygon: encodedPath };
        if (!isValid) {
          changed.errorMsg = this.state.infoWindow.getContent();
        }
        this.props.onNeighbourhoodChange(changed);
      }
    }, {
      key: 'validNeighbourhoodArea',
      value: function validNeighbourhoodArea(newShape) {
        var area = google.maps.geometry.spherical.computeArea(newShape.getPath());
        console.log('Map.validNeighbourhoodArea()| area of polygon:', area);
        if (area > 250000 || area < 1000) {
          var centerPos = this.findPolygonCenter(newShape.getPath());
          var pos = new google.maps.LatLng(parseFloat(centerPos[0]), parseFloat(centerPos[1]));
          console.log('Map.validNeighbourhoodArea()| center of polygon:', centerPos, pos);
          this.handleMapError('Neighbourhood area must be between 1000 and 250000 sq meters, your drawing area: ' + area + ' sq meters', centerPos);
          return false;
        }
        return true;
      }
    }, {
      key: 'findIntersectsAndShowError',
      value: function findIntersectsAndShowError(inputShape) {
        var _this4 = this;

        var geometry = new _AntykaGeometry2['default']();
        console.log('findIntersectsAndShowError():', inputShape);
        var hasIntersection = false;
        _lodash2['default'].forEach(this.state.existingPolygons, function (existingPolygon) {
          console.log('findIntersectsAndShowError():', _lodash2['default'].isEqual(inputShape, existingPolygon));
          if (!_lodash2['default'].isEqual(inputShape, existingPolygon)) {
            var intersection = geometry.isIntersectingPolygon(inputShape.getPath(), existingPolygon.getPath());
            if (intersection) {
              var pos = new google.maps.LatLng(parseFloat(intersection[0].x), parseFloat(intersection[0].y));
              console.debug('AMIT:', intersection, pos);
              _this4.handleMapError('Your neighbourhood can not overlap with existing neighbourhoods, please retry or modify this...', pos);
              hasIntersection = true;
              return;
            }
          }
        });
        return hasIntersection;
      }
    }, {
      key: 'findSelfIntersectsAndShowError',
      value: function findSelfIntersectsAndShowError(inputShape) {
        var geometry = new _AntykaGeometry2['default']();

        var intersections = geometry.findSelfIntersects(inputShape.getPath());

        //console.log("findSelfIntersectsAndShowError() Patharray:", inputShape.getPath().getArray());
        console.log('findSelfIntersectsAndShowError() intersections:', intersections);

        if (intersections) {
          var pos = new google.maps.LatLng(parseFloat(intersections[0][0]), parseFloat(intersections[0][1]));
          this.handleMapError('A self interescting polygon can not be a neighbourhood, please retry or modify this...', pos);
          return true;
        } else {
          var infoWindow = this.state.infoWindow;
          infoWindow.close();
          return false;
        }
      }
    }, {
      key: 'handleMapError',
      value: function handleMapError(errorMsg, position) {
        var map = this.state.map;
        var infoWindow = this.state.infoWindow; //new google.maps.InfoWindow({map: map});
        if (position) {
          infoWindow.setPosition(position);
        } else {
          infoWindow.setPosition(map.getCenter());
        }
        infoWindow.setContent(errorMsg);

        if (!this.isInfoWindowOpen(infoWindow)) {
          infoWindow.open(map);
        }
      }
    }, {
      key: 'handleLocationError',
      value: function handleLocationError(browserHasGeolocation) {
        var msg = browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.';
        this.handleMapError(msg);
      }
    }, {
      key: 'findAndSetLocation',
      value: function findAndSetLocation(lat, lng, showInfo, msg) {
        var map = this.state.map;
        if (map) {
          var pos = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
          map.setCenter(pos);
          if (showInfo) {
            var infoWindow = this.state.infoWindow; //new google.maps.InfoWindow({map: map});
            infoWindow.setPosition(pos);
            if (!msg) {
              infoWindow.setContent('Location: (lat,long)=(' + lat + ', ' + lng + ')');
            } else {
              infoWindow.setContent(msg);
            }

            if (!this.isInfoWindowOpen(infoWindow)) {
              infoWindow.open(map);
            }
          }
        }
      }
    }, {
      key: 'closeInfoWindow',
      value: function closeInfoWindow() {
        if (this.state.infoWindow && this.isInfoWindowOpen(this.state.infoWindow)) {
          this.state.infoWindow.close();
        }
      }
    }, {
      key: 'isInfoWindowOpen',
      value: function isInfoWindowOpen(infoWindow) {
        var map = infoWindow.getMap();
        return map !== null && typeof map !== 'undefined';
      }
    }, {
      key: 'findCurrentGeoLocation',
      value: function findCurrentGeoLocation() {
        var _this5 = this;

        var _this = this;
        if (navigator.geolocation) {
          // Try HTML5 geolocation.
          navigator.geolocation.getCurrentPosition(function (position) {
            console.debug('Map.findCurrentGeoLocation()| Current position:', position);
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            _this5.findAndSetLocation(lat, lng, true, 'We\'ve found your location.(lat,long)=(' + lat + ', ' + lng + ')');
          }, function () {
            _this.handleLocationError(true);
          });
        } else {
          this.handleLocationError(false);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        console.log('Map.render()| props:', this.props);
        console.log('Map.render()| states:', this.state);

        //let map = this.state.map;
        //let infoWindow = new google.maps.InfoWindow({map: map});

        this.renderExistingNeighbourhoods();

        if (this.props.drawMode) {
          this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
          this.closeInfoWindow();
        } else {
          if (this.neighbourhood) {
            this.neighbourhood.setMap(null);
            this.closeInfoWindow();
          }

          if (this.props.position && this.props.position.lat && this.props.position.lng) {
            console.log('Map.render()| Has position:', this.props.position.lat, this.props.position.lng);
            this.findAndSetLocation(this.props.position.lat, this.props.position.lng, true);
          } else {
            this.findCurrentGeoLocation();
          }
        }

        return _react2['default'].createElement('div', { className: (0, _classnames2['default'])(this.props.className, 'Map') });
      }
    }]);

    var _Map = Map;
    Map = (0, _decoratorsWithStyles2['default'])(_MapLess2['default'])(Map) || Map;
    return Map;
  })(_react.Component);

  exports['default'] = Map;
  module.exports = exports['default'];

  //google.maps.drawing.OverlayType.POLYGON

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _classnames = __webpack_require__(17);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _NavigationLess = __webpack_require__(164);

  var _NavigationLess2 = _interopRequireDefault(_NavigationLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _servicesAuthService = __webpack_require__(23);

  var _servicesAuthService2 = _interopRequireDefault(_servicesAuthService);

  var _reactRouter = __webpack_require__(10);

  //import Link from '../../utils/Link';

  var Navigation = (function () {
    function Navigation() {
      _classCallCheck(this, _Navigation);
    }

    _createClass(Navigation, [{
      key: 'logout',
      value: function logout(e) {
        e.preventDefault();
        _servicesAuthService2['default'].logout();
      }
    }, {
      key: 'render',
      value: function render() {
        console.log('Navigation.render()| props:', this.props);
        var navContent = undefined;
        if (this.props.LoginState.userLoggedIn) {
          navContent = _react2['default'].createElement(
            'a',
            { href: '', className: 'navigation-link', onClick: this.logout },
            'Logout'
          );
        }
        return _react2['default'].createElement(
          'div',
          { className: (0, _classnames2['default'])(this.props.className, 'navigation'), role: 'navigation' },
          _react2['default'].createElement(
            'div',
            { className: 'navigation-container' },
            this.props.LoginState && this.props.LoginState.userLoggedIn && _react2['default'].createElement(
              'div',
              null,
              'Welcome ',
              _react2['default'].createElement(
                _reactRouter.Link,
                { className: 'navigation-link', to: '/' },
                this.props.LoginState.user.name
              )
            ),
            navContent
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        className: _react.PropTypes.string
      },
      enumerable: true
    }]);

    var _Navigation = Navigation;
    Navigation = (0, _decoratorsWithStyles2['default'])(_NavigationLess2['default'])(Navigation) || Navigation;
    return Navigation;
  })();

  exports['default'] = Navigation;
  module.exports = exports['default'];

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _NeighbourhoodPageLess = __webpack_require__(165);

  var _NeighbourhoodPageLess2 = _interopRequireDefault(_NeighbourhoodPageLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _decoratorsWithAuthentication = __webpack_require__(21);

  var _decoratorsWithAuthentication2 = _interopRequireDefault(_decoratorsWithAuthentication);

  var _UserMenu = __webpack_require__(61);

  var _UserMenu2 = _interopRequireDefault(_UserMenu);

  var _TextBox = __webpack_require__(19);

  var _TextBox2 = _interopRequireDefault(_TextBox);

  var _reactRouter = __webpack_require__(10);

  // import Link from '../../utils/Link';
  // import AppActions from '../../actions/AppActions';
  // import AuthService from '../../auth/AuthService';

  var NeighbourhoodPage = (function (_React$Component) {
    _inherits(NeighbourhoodPage, _React$Component);

    function NeighbourhoodPage() {
      _classCallCheck(this, _NeighbourhoodPage);

      _get(Object.getPrototypeOf(_NeighbourhoodPage.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(NeighbourhoodPage, [{
      key: 'render',
      value: function render() {
        console.log('NeighbourhoodPage.render()|', this.props);
        var title = this.props.user.name;
        var hasNeighbourhood = undefined;
        if (this.props.user.neighbourhood) {
          hasNeighbourhood = true;
        }
        this.context.onSetTitle(title);
        return _react2['default'].createElement(
          'div',
          { className: 'neighbourhood' },
          _react2['default'].createElement(_UserMenu2['default'], null),
          hasNeighbourhood ? _react2['default'].createElement(
            'div',
            { className: 'neighbourhood-container' },
            'Details of your neighbourhood will come up here '
          ) : _react2['default'].createElement(
            'div',
            { className: 'neighbourhood-container' },
            _react2['default'].createElement(
              'span',
              null,
              'Hi ',
              this.props.user.name,
              ','
            ),
            _react2['default'].createElement(
              'p',
              null,
              'You have not entered your neighbourhood details yet. Please go to the ',
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: 'map' },
                'map'
              ),
              ' and select/create your neighbourhood'
            ),
            _react2['default'].createElement('br', null),
            _react2['default'].createElement(
              'p',
              null,
              'Your current address:'
            ),
            _react2['default'].createElement(_TextBox2['default'], { id: 'address', className: 'neighbourhood-textarea', ref: 'address', value: this.props.user.address, type: 'text', placeholder: 'address', maxLines: 3 })
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    var _NeighbourhoodPage = NeighbourhoodPage;
    NeighbourhoodPage = (0, _decoratorsWithStyles2['default'])(_NeighbourhoodPageLess2['default'])(NeighbourhoodPage) || NeighbourhoodPage;
    NeighbourhoodPage = (0, _decoratorsWithAuthentication2['default'])(NeighbourhoodPage) || NeighbourhoodPage;
    return NeighbourhoodPage;
  })(_react2['default'].Component);

  exports['default'] = NeighbourhoodPage;
  module.exports = exports['default'];

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _NotFoundPageLess = __webpack_require__(166);

  var _NotFoundPageLess2 = _interopRequireDefault(_NotFoundPageLess);

  var NotFoundPage = (function () {
    function NotFoundPage() {
      _classCallCheck(this, _NotFoundPage);
    }

    _createClass(NotFoundPage, [{
      key: 'render',
      value: function render() {
        var title = 'Page Not Found';
        this.context.onSetTitle(title);
        console.log('NotFoundPage.render()');
        this.context.onPageNotFound();
        return _react2['default'].createElement(
          'div',
          { className: 'notfound' },
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    var _NotFoundPage = NotFoundPage;
    NotFoundPage = (0, _decoratorsWithStyles2['default'])(_NotFoundPageLess2['default'])(NotFoundPage) || NotFoundPage;
    return NotFoundPage;
  })();

  exports['default'] = NotFoundPage;
  module.exports = exports['default'];

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _SetPasswordLess = __webpack_require__(168);

  var _SetPasswordLess2 = _interopRequireDefault(_SetPasswordLess);

  var _decoratorsWithStyles = __webpack_require__(4);

  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);

  var _TextBox = __webpack_require__(19);

  var _TextBox2 = _interopRequireDefault(_TextBox);

  var _actionsLoginAction = __webpack_require__(58);

  var _actionsLoginAction2 = _interopRequireDefault(_actionsLoginAction);

  var _storesLoginStore = __webpack_require__(24);

  var _storesLoginStore2 = _interopRequireDefault(_storesLoginStore);

  var _servicesAuthService = __webpack_require__(23);

  var _servicesAuthService2 = _interopRequireDefault(_servicesAuthService);

  var _classnames = __webpack_require__(17);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _reactRouter = __webpack_require__(10);

  var LoginPage = (function (_React$Component) {
    _inherits(LoginPage, _React$Component);

    _createClass(LoginPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    function LoginPage() {
      _classCallCheck(this, _LoginPage);

      _get(Object.getPrototypeOf(_LoginPage.prototype), 'constructor', this).call(this);

      this.state = {
        newPwd: '',
        confirmPwd: '',
        updateResponse: null
      };
    }

    _createClass(LoginPage, [{
      key: '_getUser',
      value: function _getUser() {
        return _storesLoginStore2['default'].user;
      }
    }, {
      key: '_onchange',
      value: function _onchange(event) {
        //console.log('RegisterPage._onchange()| event:', event.target);
        var controlState = {};
        controlState[event.target.id] = event.target.value;
        //console.log('RegisterPage._onchange()| controlState:', controlState);
        this.setState(controlState);
      }
    }, {
      key: 'componentWillMount',

      /*_onChange() {
        console.log('SetPassword._onChange()| LoginStore changed!!!');
        this.setState(this._getLoginState());
      }*/

      value: function componentWillMount() {
        //LoginStore.removeChangeListener(this.changeListener);
        console.log('SetPassword.componentWillMount()| query: ', this.props.query, this.props.user);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        //this.changeListener = this._onChange.bind(this);
        //LoginStore.addChangeListener(this.changeListener);
        console.log('SetPassword.componentDidMount()| query: ', this.props.query);
        if (this.props.query && this.props.query.key) {
          _actionsLoginAction2['default'].verifyUserToken(this.props.query.key);
        } else {}
      }
    }, {
      key: 'updatePassword',
      value: function updatePassword(e) {
        var _this = this;

        e.preventDefault();
        //alert(this.state);
        console.log('SetPassword.updatePassword()| state:', this.state, e);
        var pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);

        if (this.state.newPwd === this.state.confirmPwd) {
          if (pattern.test(this.state.newPwd)) {
            var user = this._getUser();
            user.password = this.state.newPwd;

            _servicesAuthService2['default'].changePassword(user, function (response) {
              _this.setState({ updateResponse: response });
            }, function (response) {
              _this.setState({ updateResponse: response });
            });
          } else {
            alert('Passwords must have: \nMinimum 8 characters\nAt least 1 Alphabet, 1 Number and 1 Special Character\nNo spaces');
          }
        } else {
          alert('Passwords dont match');
        }
      }
    }, {
      key: 'render',
      value: function render() {
        //console.log('amit', this);
        var title = 'Set/Reset Password';
        this.context.onSetTitle(title);
        console.log('SetPassword.render()| user: ', this._getUser());
        var pwdMatch = undefined;
        if (this.state.newPwd !== this.state.confirmPwd) {
          pwdMatch = 'SetPassword-textbox-error';
        }
        var component = undefined;
        console.log('PWD server response:', this.state.updateResponse);

        if (this.state.updateResponse) {
          var classname = undefined,
              message = this.state.updateResponse.message;
          if (this.state.updateResponse.success) {
            classname = 'SetPassword-success';
            message = _react2['default'].createElement(
              'div',
              null,
              message,
              'Please ',
              _react2['default'].createElement(
                _reactRouter.Link,
                { to: 'login' },
                'login'
              ),
              ' with the new password...'
            );
          } else {
            classname = 'SetPassword-error';
          }
          component = _react2['default'].createElement(
            'div',
            { className: classname },
            message
          );
        } else {
          var user = this._getUser();
          if (user && user.name) {
            component = _react2['default'].createElement(
              'div',
              { className: 'SetPassword-container' },
              _react2['default'].createElement(
                'div',
                null,
                'Hello ',
                _react2['default'].createElement(
                  'b',
                  null,
                  user.name
                ),
                ', ',
                _react2['default'].createElement('br', null),
                ' Please update your Password'
              ),
              _react2['default'].createElement(_TextBox2['default'], { id: 'newPwd', className: 'SetPassword-textbox', controlClassName: pwdMatch, ref: 'newPwd', value: this.newPwd, type: 'Password', placeholder: 'Enter New Password', onChange: this._onchange.bind(this) }),
              _react2['default'].createElement(_TextBox2['default'], { id: 'confirmPwd', className: 'SetPassword-textbox', controlClassName: pwdMatch, ref: 'confirmPwd', value: this.confirmPwd, type: 'Password', placeholder: 'Confirm Password', onChange: this._onchange.bind(this) }),
              _react2['default'].createElement('input', { type: 'submit', value: 'Update Password', onClick: this.updatePassword.bind(this) })
            );
          } else if (user && user.invalidToken) {
            component = _react2['default'].createElement(
              'div',
              { className: 'SetPassword-error' },
              'Bad/Expired Token!!!'
            );
          } else {
            component = '';
          }
        }
        return _react2['default'].createElement(
          'div',
          { className: 'SetPassword' },
          component
        );
      }
    }]);

    var _LoginPage = LoginPage;
    LoginPage = (0, _decoratorsWithStyles2['default'])(_SetPasswordLess2['default'])(LoginPage) || LoginPage;
    return LoginPage;
  })(_react2['default'].Component);

  exports['default'] = LoginPage;
  module.exports = exports['default'];

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _flux = __webpack_require__(70);

  exports['default'] = new _flux.Dispatcher();
  module.exports = exports['default'];

/***/ },
/* 145 */
/***/ function(module, exports) {

  'use strict';

  module.exports = {
      'secret': 'antykadbtokenseed',
      'database': 'mongodb://amit:amitadmin@ds063892.mongolab.com:63892/antykadb'
  };

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  // eslint-disable-line no-unused-vars

  var _node_modulesReactLibEmptyFunction = __webpack_require__(172);

  var _node_modulesReactLibEmptyFunction2 = _interopRequireDefault(_node_modulesReactLibEmptyFunction);

  function withContext(ComposedComponent) {
    return (function () {
      function WithContext() {
        _classCallCheck(this, WithContext);
      }

      _createClass(WithContext, [{
        key: 'getChildContext',
        value: function getChildContext() {

          var context = this.props.context;
          return {
            onInsertCss: context.onInsertCss || _node_modulesReactLibEmptyFunction2['default'],
            onSetTitle: context.onSetTitle || _node_modulesReactLibEmptyFunction2['default'],
            onSetMeta: context.onSetMeta || _node_modulesReactLibEmptyFunction2['default'],
            onPageNotFound: context.onPageNotFound || _node_modulesReactLibEmptyFunction2['default']
          };
        }
      }, {
        key: 'render',
        value: function render() {
          var _props = this.props;
          var context = _props.context;

          var other = _objectWithoutProperties(_props, ['context']);

          // eslint-disable-line no-unused-vars
          return _react2['default'].createElement(ComposedComponent, other);
        }
      }], [{
        key: 'propTypes',
        value: {
          context: _react.PropTypes.shape({
            onInsertCss: _react.PropTypes.func,
            onSetTitle: _react.PropTypes.func,
            onSetMeta: _react.PropTypes.func,
            onPageNotFound: _react.PropTypes.func
          })
        },
        enumerable: true
      }, {
        key: 'childContextTypes',
        value: {
          onInsertCss: _react.PropTypes.func.isRequired,
          onSetTitle: _react.PropTypes.func.isRequired,
          onSetMeta: _react.PropTypes.func.isRequired,
          onPageNotFound: _react.PropTypes.func.isRequired
        },
        enumerable: true
      }]);

      return WithContext;
    })();
  }

  exports['default'] = withContext;
  module.exports = exports['default'];

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

  // get an instance of mongoose and mongoose.Schema
  //var mongoose = require('mongoose');
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _mongoose = __webpack_require__(43);

  var _mongoose2 = _interopRequireDefault(_mongoose);

  var Schema = _mongoose2['default'].Schema;

  // set up a mongoose model and pass it using module.exports
  module.exports = _mongoose2['default'].model('neighbourhood', new Schema({
      encodedpolygon: String,
      verified: Boolean,
      neighbourCount: Number,
      createdby: { type: Schema.Types.ObjectId, ref: 'user' },
      adjoiningNeighbourhoods: [{
          _id: { type: Schema.Types.ObjectId, ref: 'neighbourhood' }
      }]
  }), 'neighbourhood');

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

  // get an instance of mongoose and mongoose.Schema
  //var mongoose = require('mongoose');
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _mongoose = __webpack_require__(43);

  var _mongoose2 = _interopRequireDefault(_mongoose);

  var Schema = _mongoose2['default'].Schema;

  // set up a mongoose model and pass it using module.exports
  module.exports = _mongoose2['default'].model('user', new Schema({
      userid: String,
      email: String,
      name: String,
      password: String,
      jwt: String,
      address: String,
      neighbourhood: { type: Schema.Types.ObjectId, ref: 'neighbourhood' }
  }), 'user');

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _this = this;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _express = __webpack_require__(69);

  var _coreDatabase = __webpack_require__(63);

  var _coreDatabase2 = _interopRequireDefault(_coreDatabase);

  var router = new _express.Router();

  router.get('/', function callee$0$0(req, res, next) {
    var path, page;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          path = req.query.path;

          console.log('Query.route.get(): path:', path);
          if (!path) {
            res.status(400).send({ error: 'The \'path\' query parameter cannot be empty.' });
          }

          context$1$0.next = 6;
          return regeneratorRuntime.awrap(_coreDatabase2['default'].getPage(path));

        case 6:
          page = context$1$0.sent;

          console.log('Query.route.get(): page:', page);
          if (page) {
            res.status(200).send(page);
          } else {
            res.status(404).send({ error: 'The page \'' + path + '\' is not found.' });
          }
          context$1$0.next = 14;
          break;

        case 11:
          context$1$0.prev = 11;
          context$1$0.t0 = context$1$0['catch'](0);

          next(context$1$0.t0);

        case 14:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 11]]);
  });

  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _react = __webpack_require__(3);

  var _react2 = _interopRequireDefault(_react);

  var _reactRouter = __webpack_require__(10);

  var _componentsApp = __webpack_require__(59);

  var _componentsApp2 = _interopRequireDefault(_componentsApp);

  var _componentsLoginPage = __webpack_require__(38);

  var _componentsLoginPage2 = _interopRequireDefault(_componentsLoginPage);

  var _componentsUserHomePage = __webpack_require__(60);

  var _componentsUserHomePage2 = _interopRequireDefault(_componentsUserHomePage);

  var _componentsRegisterPage = __webpack_require__(39);

  var _componentsRegisterPage2 = _interopRequireDefault(_componentsRegisterPage);

  var _componentsSetPassword = __webpack_require__(143);

  var _componentsSetPassword2 = _interopRequireDefault(_componentsSetPassword);

  var _componentsNeighbourhoodPage = __webpack_require__(141);

  var _componentsNeighbourhoodPage2 = _interopRequireDefault(_componentsNeighbourhoodPage);

  var _componentsMapPage = __webpack_require__(137);

  var _componentsMapPage2 = _interopRequireDefault(_componentsMapPage);

  var _componentsNotFoundPage = __webpack_require__(142);

  var _componentsNotFoundPage2 = _interopRequireDefault(_componentsNotFoundPage);

  module.exports = [_react2['default'].createElement(
    _reactRouter.Route,
    { path: '/', handler: _componentsApp2['default'] },
    _react2['default'].createElement(_reactRouter.DefaultRoute, { handler: _componentsUserHomePage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'login', path: '/login', handler: _componentsLoginPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'home', handler: _componentsUserHomePage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'register', path: '/register', handler: _componentsRegisterPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'neighbourhood', path: '/neighbourhood', handler: _componentsNeighbourhoodPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'map', path: '/map', handler: _componentsMapPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'about', path: '/notfound', handler: _componentsNotFoundPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'contact', path: '/notfound', handler: _componentsNotFoundPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'privacy', path: '/notfound', handler: _componentsNotFoundPage2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'notfound', path: '/notfound', handler: _componentsNotFoundPage2['default'] }),
    _react2['default'].createElement(_reactRouter.NotFoundRoute, { handler: _componentsNotFoundPage2['default'] })
  )];

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

  /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _events = __webpack_require__(42);

  var _events2 = _interopRequireDefault(_events);

  var _dispatchersDispatcher = __webpack_require__(22);

  var _dispatchersDispatcher2 = _interopRequireDefault(_dispatchersDispatcher);

  var _constantsActionTypes = __webpack_require__(20);

  var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

  var _BaseStore2 = __webpack_require__(40);

  var _BaseStore3 = _interopRequireDefault(_BaseStore2);

  var CHANGE_EVENT = 'change';
  var pages = {};
  var loading = false;

  var AppStore = (function (_BaseStore) {
    _inherits(AppStore, _BaseStore);

    function AppStore() {
      var _this = this;

      _classCallCheck(this, AppStore);

      _get(Object.getPrototypeOf(AppStore.prototype), 'constructor', this).call(this);
      console.log('AppStore.constructor()');
      this.subscribe(function () {
        return _this._registerToActions.bind(_this);
      });
      this._user = null;
      this._jwt = null;
    }

    _createClass(AppStore, [{
      key: 'getPage',
      value: function getPage(path) {
        return path in pages ? pages[path] : null;
      }
    }, {
      key: 'isLoading',
      value: function isLoading() {
        return loading;
      }
    }, {
      key: '_registerToActions',
      value: function _registerToActions(action) {
        console.log('AppStore._registerToActions()| dispatchToken:', action);
        switch (action.type) {
          case _constantsActionTypes2['default'].GET_PAGE:
            loading = true;
            this.emitChange();
            break;

          case _constantsActionTypes2['default'].RECEIVE_PAGE:
            loading = false;
            if (!action.err) {
              console.log('AppStore._registerToActions()| action.page.path:', action.page.path);
              pages[action.page.path] = action.page;
            }
            this.emitChange();
            break;

          default:
          // Do nothing
        }
      }
    }]);

    return AppStore;
  })(_BaseStore3['default']);

  exports['default'] = new AppStore();
  module.exports = exports['default'];

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _constantsNeighbourhoodActionTypes = __webpack_require__(62);

  var _constantsNeighbourhoodActionTypes2 = _interopRequireDefault(_constantsNeighbourhoodActionTypes);

  var _BaseStore2 = __webpack_require__(40);

  var _BaseStore3 = _interopRequireDefault(_BaseStore2);

  var NeighbourhoodStore = (function (_BaseStore) {
    _inherits(NeighbourhoodStore, _BaseStore);

    function NeighbourhoodStore() {
      var _this = this;

      _classCallCheck(this, NeighbourhoodStore);

      _get(Object.getPrototypeOf(NeighbourhoodStore.prototype), 'constructor', this).call(this);
      console.log('NeighbourhoodStore.constructor()');
      this.subscribe(function () {
        return _this._registerToActions.bind(_this);
      });
      this._neighbourhoods = null;
      this._searchedNeighbourhood = null;
    }

    _createClass(NeighbourhoodStore, [{
      key: '_registerToActions',
      value: function _registerToActions(action) {
        console.log('NeighbourhoodStore._registerToActions()| dispatchToken:', action);
        switch (action.type) {
          case _constantsNeighbourhoodActionTypes2['default'].LOAD_NEIGHBOURHOOD:
            this._neighbourhoods = action.neighbourhoods;
            this.emitChange();
            break;
          case _constantsNeighbourhoodActionTypes2['default'].SEARCH_NEIGHBOURHOOD:
            this._searchedNeighbourhood = action.neighbourhood;
            this.emitChange();
            break;
          default:
            break;
        }
      }
    }, {
      key: 'getNeighbourhoods',
      value: function getNeighbourhoods() {
        return this._neighbourhoods;
      }
    }, {
      key: 'getSearchedNeighbourhood',
      value: function getSearchedNeighbourhood() {
        return this._searchedNeighbourhood;
      }
    }]);

    return NeighbourhoodStore;
  })(_BaseStore3['default']);

  exports['default'] = new NeighbourhoodStore();
  module.exports = exports['default'];

/***/ },
/* 153 */
/***/ function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var ClientDetection = (function () {
    function ClientDetection() {
      _classCallCheck(this, ClientDetection);
    }

    _createClass(ClientDetection, null, [{
      key: "isMobile",
      value: function isMobile(userAgent) {
        var isMobile = undefined;
        if (/mobile/i.test(userAgent)) {
          isMobile = true;
        } else {
          isMobile = false;
        }
        return isMobile;
      }
    }]);

    return ClientDetection;
  })();

  exports["default"] = ClientDetection;
  module.exports = exports["default"];

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(129);


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */img,legend{border:0}pre,textarea{overflow:auto}legend,td,th{padding:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}.hide,[hidden],template{display:none}audio:not([controls]){display:none;height:0}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,optgroup,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}textarea{resize:vertical}table{border-collapse:collapse;border-spacing:0}/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */.content-width{width:100%}.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}fieldset,hr{padding:0;border:0}.page-margin{position:static;padding-top:75px;margin-left:auto;margin-right:auto}.bottom{bottom:0}#app,.app-container,body,html{height:100%;margin:0;padding:0;width:100%}body{overflow-y:auto;overflow-x:hidden}html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;color:#222;font-weight:100;font-size:1em;font-family:'Segoe UI',HelveticaNeue-Light,sans-serif;line-height:1.375}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border-top:1px solid #ccc;margin:1em 0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{margin:0}.browserupgrade{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{blockquote,img,pre,tr{page-break-inside:avoid}*,:after,:before{background:0 0!important;color:#000!important;-webkit-box-shadow:none!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"#\"]:after,a[href^=\"javascript:\"]:after{content:\"\"}blockquote,pre{border:1px solid #999}thead{display:table-header-group}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}", ""]);

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".content-width{width:100%}.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.page-margin{position:static;padding-top:75px;margin-left:auto;margin-right:auto}.hide{display:none}.bottom{bottom:0}.feedback{width:100%;background:#ddd;color:#555;position:fixed;bottom:20px;height:18px;z-index:1000;-webkit-box-shadow:0 3px 15px #333;box-shadow:0 3px 15px #333}.feedback-container{width:100%;text-align:center;font-size:.9em}.feedback-link,.feedback-link:active,.feedback-link:hover,.feedback-link:visited{color:#555;text-decoration:none}.feedback-link:hover{text-decoration:underline}.feedback-spacer{padding-right:15px;padding-left:15px}", ""]);

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".Footer,.bottom{bottom:0}.content-width{width:100%}.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.page-margin{position:static;padding-top:75px;margin-left:auto;margin-right:auto}.hide{display:none}.Footer{width:100%;background:#333;color:#fff;position:fixed;height:20px;z-index:1000}.Footer-container{width:100%;text-align:center}.Footer-text{color:rgba(255,255,255,.5)}.Footer-spacer,.Footer-text--muted{color:rgba(255,255,255,.3)}.Footer-link,.Footer-text{padding:2px 5px;font-size:1em}.Footer-link,.Footer-link:active,.Footer-link:visited{color:rgba(255,255,255,.6);text-decoration:none}.Footer-link:hover{color:#fff}", ""]);

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".Header-container,.page-margin{margin-left:auto;margin-right:auto}.content-width{width:100%}.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.page-margin{position:static;padding-top:75px}.hide{display:none}.bottom{bottom:0}.Header{width:100%;background:#22426d;color:#fff;position:fixed;z-index:1000;top:0;height:63px;-webkit-box-shadow:0 3px 15px #333;box-shadow:0 3px 15px #333}.Header-container{width:auto;min-width:300px;max-width:1000px}.Header-brand{float:left;color:#93e6fc;text-decoration:none;font-size:1.75em}.Header-brandImg{height:50px;width:91px}.Header-brandTxt{margin-left:10px;font-family:cursive}.Header-nav{float:right}.Header-banner{text-align:center}.Header-bannerTitle{margin:0;padding:10px;font-weight:400;font-size:4em;line-height:1em}.Header-bannerDesc{padding:0;color:rgba(255,255,255,.5);font-size:1.25em;margin:0}", ""]);

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".loading,.page-margin{position:static;padding-top:75px;margin-left:auto;margin-right:auto}.content-width{width:100%}.loading,.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.hide{display:none}.bottom{bottom:0}.loading-image{height:128px;width:128px;margin-left:50%}", ""]);

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".LoginPage,.page-margin{position:static;padding-top:75px;margin-left:auto;margin-right:auto}.content-width{width:100%}.LoginPage,.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.hide{display:none}.bottom{bottom:0}.LoginPage .Login,.LoginPage .Register{float:right;margin-top:50px}", ""]);

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".antyka-button,.antyka-link-button{font-size:1.125em}.content-width{width:100%}.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.page-margin{position:static;padding-top:75px;margin-left:auto;margin-right:auto}.Login-linkdiv,.antyka-link-buttondiv{margin-left:80%}.hide{display:none}.Login-link,.antyka-link-button{width:100%;display:inline-block;text-decoration:none;text-align:center}.bottom{bottom:0}.antyka-button{color:#fff;border:none;width:100%;float:left;background:rgba(0,0,255,.6)}.antyka-button:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F}.antyka-button:disabled{color:#555}.antyka-link-button,.antyka-link-button-highlight,.antyka-link-button:active{color:#fff;background:rgba(0,0,255,.6)}.antyka-link-button-highlight:hover,.antyka-link-button:active:hover,.antyka-link-button:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F;box-shadow:0 0 5px #00F}.Login-container{padding:20px;min-width:300px;border:2px solid #789}.Login input{color:#000}.Login-error{color:#d04;font-size:15px;padding-left:10px}.Login-spacer{line-height:40px;text-align:center;vertical-align:middle;color:#55f}.Login-helper{color:#00f;padding:10px;font-size:12px}.Login-helper input{vertical-align:bottom}.Login-helper-forgot{float:right;color:#00f}.Login input[type=submit]{color:#fff;border:none;font-size:1.125em;width:100%;float:left;background:rgba(0,0,255,.6)}.Login input[type=submit]:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F}.Login input[type=submit]:disabled{color:#555}.Login-link{font-size:1.125em}.Login-link,.Login-link-highlight,.Login-link:active{color:#fff;background:rgba(0,0,255,.6)}.Login-link-highlight:hover,.Login-link:active:hover,.Login-link:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F;box-shadow:0 0 5px #00F}", ""]);

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".content-width{width:100%}.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.page-margin{position:static;padding-top:75px;margin-left:auto;margin-right:auto}.hide{display:none}.bottom{bottom:0}.antyka-button{color:#fff;border:none;font-size:1.125em;width:100%;float:left;background:rgba(0,0,255,.6)}.antyka-button:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F}.antyka-button:disabled{color:#555}.antyka-link-button{width:100%;display:inline-block;text-decoration:none;text-align:center;font-size:1.125em}.antyka-link-buttondiv{margin-left:80%}.antyka-link-button,.antyka-link-button-highlight,.antyka-link-button:active{color:#fff;background:rgba(0,0,255,.6)}.antyka-link-button-highlight:hover,.antyka-link-button:active:hover,.antyka-link-button:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F;box-shadow:0 0 5px #00F}.mappage{width:100%;height:100%;padding-top:60px;padding-bottom:20px}.mappage-floating{position:fixed;padding:20px;top:10%;left:10%;z-index:300;height:auto;width:auto;max-width:310px;min-width:210px;background:rgba(255,255,255,.5);-webkit-box-shadow:0 3px 15px #333;box-shadow:0 3px 15px #333}.mappage-floating.bottom{top:auto;bottom:5%;padding:2px;max-width:80%;opacity:.7}.mappage-floating.error{color:red;font-weight:600;background-color:#DD6}.mappage-floating input[type=button]{color:#fff;border:none;font-size:1.125em;width:100%;float:left;background:rgba(0,0,255,.6);margin:3px 0}.mappage-floating input[type=button]:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F}.mappage-floating input[type=button]:disabled{color:#555;background:#ddd}", ""]);

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".Map{float:left;width:100%;height:100%;z-index:200}", ""]);

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".navigation{width:50%}.navigation-container{float:right}.navigation-link{display:inline-block;padding:3px 8px;text-decoration:none;font-size:1.125em}.navigation-link,.navigation-link:active,.navigation-link:visited{color:rgba(255,255,255,.6)}.navigation-link:hover{color:#fff}.navigation-link--highlight{margin-right:8px;margin-left:8px;border-radius:3px;background:rgba(0,0,0,.15);color:#fff}.navigation-link--highlight:hover{background:rgba(0,0,0,.3)}.navigation-spacer{color:rgba(255,255,255,.3)}.navigation-input{color:#000}", ""]);

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".neighbourhood,.page-margin{position:static;padding-top:75px;margin-left:auto;margin-right:auto}.content-width{width:100%}.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.hide{display:none}.bottom{bottom:0}.neighbourhood{width:1000px}.neighbourhood-container{background-color:#CCC;float:left;width:740px;height:100%}", ""]);

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".notfound{display:table;width:100%;height:100%;color:#888;text-align:center;font-family:sans-serif}", ""]);

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".content-width{width:100%}.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.page-margin{position:static;padding-top:75px;margin-left:auto;margin-right:auto}.hide{display:none}.bottom{bottom:0}.antyka-button{color:#fff;border:none;font-size:1.125em;width:100%;float:left;background:rgba(0,0,255,.6)}.antyka-button:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F}.antyka-button:disabled{color:#555}.antyka-link-button{width:100%;display:inline-block;text-decoration:none;text-align:center;font-size:1.125em}.antyka-link-buttondiv{margin-left:80%}.antyka-link-button,.antyka-link-button-highlight,.antyka-link-button:active{color:#fff;background:rgba(0,0,255,.6)}.antyka-link-button-highlight:hover,.antyka-link-button:active:hover,.antyka-link-button:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F;box-shadow:0 0 5px #00F}.RegisterPage-container{padding:20px;min-width:300px;border:2px solid #789;color:#000}.RegisterPage-container input[type=submit]{color:#fff;border:none;font-size:1.125em;width:100%;float:left;background:rgba(0,0,255,.6)}.RegisterPage-container input[type=submit]:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F}.RegisterPage-container input[type=submit]:disabled{color:#555}.RegisterPage-container a{color:#00f}.RegisterPage-error{color:#C12}", ""]);

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".SetPassword,.page-margin{position:static;padding-top:75px;margin-right:auto}.content-width{width:100%}.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.page-margin{margin-left:auto}.hide{display:none}.bottom{bottom:0}.antyka-button{color:#fff;border:none;font-size:1.125em;width:100%;float:left;background:rgba(0,0,255,.6)}.antyka-button:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F}.antyka-button:disabled{color:#555}.antyka-link-button{width:100%;display:inline-block;text-decoration:none;text-align:center;font-size:1.125em}.antyka-link-buttondiv{margin-left:80%}.antyka-link-button,.antyka-link-button-highlight,.antyka-link-button:active{color:#fff;background:rgba(0,0,255,.6)}.antyka-link-button-highlight:hover,.antyka-link-button:active:hover,.antyka-link-button:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F;box-shadow:0 0 5px #00F}.SetPassword{width:1000px;margin-left:auto;float:left}.SetPassword-container{border:2px solid #789;width:400px;color:#000;margin:50px;padding:20px 20px 50px}.SetPassword-error{margin:100px;color:red;font-size:25px}.SetPassword-success{margin:100px;color:green;font-size:25px}.SetPassword-textbox-error{border:2px solid #911}.SetPassword input[type=submit]{color:#fff;border:none;font-size:1.125em;width:100%;float:left;background:rgba(0,0,255,.6)}.SetPassword input[type=submit]:hover{background:rgba(0,0,255,.9);-webkit-box-shadow:0 0 5px #00F}.SetPassword input[type=submit]:disabled{color:#555}", ""]);

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".TextBox{padding:8px 0}.TextBox-input{color:#000;width:98.5%;height:30px}.TextBox textarea{width:98%}.TextBox-span{width:30px}", ""]);

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".page-margin,.userhome{position:static;padding-top:75px;margin-left:auto;margin-right:auto}.content-width{width:100%}.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.hide{display:none}.bottom{bottom:0}.userhome{width:100%;width:1000px}.userhome-container{width:740px;float:left;background-color:#FFB}", ""]);

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(5)();
  exports.push([module.id, ".content-width{width:100%}.page-margin,.page-width{width:1000px}.box-border{border:2px solid #789}.page-margin{position:static;padding-top:75px;margin-left:auto;margin-right:auto}.hide{display:none}.bottom{bottom:0}.usermenu{float:left;width:250px}.usermenu ul{list-style-type:none;width:100%;padding:0;margin:0 10px 0 0}.usermenu ul li{margin:.8em 0;padding-right:30px}.usermenu-link{width:100%;display:inline-block;text-decoration:none;text-align:left;font-size:1.125em}.usermenu-link,.usermenu-link-highlight,.usermenu-link:active{color:#000;background:rgba(255,255,255,.6)}.usermenu-link-highlight:hover,.usermenu-link:active:hover,.usermenu-link:hover{background:rgba(240,240,255,.9);-webkit-box-shadow:0 0 5px #555;box-shadow:0 0 5px #555}", ""]);

/***/ },
/* 172 */
/***/ function(module, exports) {

  /**
   * Copyright 2013-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule emptyFunction
   */

  function makeEmptyFunction(arg) {
    return function() {
      return arg;
    };
  }

  /**
   * This function accepts and discards inputs; it has no side effects. This is
   * primarily useful idiomatically for overridable function endpoints which
   * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
   */
  function emptyFunction() {}

  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function() { return this; };
  emptyFunction.thatReturnsArgument = function(arg) { return arg; };

  module.exports = emptyFunction;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "87bc9ed8bee40add698e24c588fa0a6e.gif"

/***/ },
/* 174 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAA+CAYAAAD3R09qAAAABmJLR0QAAAC+AAA2g2hlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wcZCQs2kxK3ggAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAWkElEQVR42u2deXxV1bXHv+tOSchwE+YZlBkEqwL9qK9q4UK1dXp1KFqV2lexVEVlHjJCIBAQrNZ5QK1Sn4p1oLXKxSpqa51lEsfIICCE4SYh471nvT/OjpwcbgiEi4qP/fncj5yTs89ee/32Wuu3195nC8fKD6LI/5eO/pPUjCjSUfB0AukEdGhBrOsl109k8+1540Wk5hiQ33F5hfTMOugI0hHoKEgn0M4gHUC7gvQEaoFY/U9AH+vea90DJW+fDWwA+ohI7TEgv4MSJu1E8K4EahwgRQFtqm4yNaWna1UEON08v82AWXcMyG/XVXaM4XvTgHeoxYdwWkgjm1R1DdDDgLkF6Csi0aNNH56jEcSXCAZj+JY3E8SAwoSQRjYBiMgJQIkZ1B2Bdaqaccwij7g7DfqAl4EuzeuvLg9Rdo37D6q6HuhmLiuB40Sk7JhFHrnyHNC5mXV3xwPRWGZfYJO5bAF8oarpx4A8AmU5wceAfs30JH7gwgOaq0hv4CtzmWrATDsGZEJdakaxwE+aWT0AelOIyIYmfa9IT2CruUwDSlS1xTEgE2OJ14Fc3kxyI6DLQpQ9ddAVRI4305F6ML9U1ZRjZOfwyM1I4BGgqpmvKA8RGVR/MeKVt7sDN5r55r7BctaQSXEI0AagrbmMAP1FZNf3UU++77clZgwElgDlze2fhfUz173WwK9MEsE5oCfFscxuqrrJ1AkCW1W1s4jsOOZaD9oSU7sIsuIwQPSD3jiS8q2HKcpxDuu1gM2q2voHB6SqblTVtY7fHw73na8RSAffa8De5oYMhedDlD192LHHzvJ0jQNmyx+aa+0CVDuuD6uDywkm1cAbAh7PQeRM45UYVIwgMvYAvMDnIk7SBJi7VbUbsBHwYtJ5qtpeRPYci5HxbTxd4YKrM7oM2+T1n9kMQubDsvKIrGrs72uB4RziIBGRXQ4wPab+VlXt8H0A89sEUt6S9JZlKupDK9Shop9S9g3xGEFZKVDKSaekozrsYHy7604Synxejw/k8rOGVAKrm+lmdxow1wB7jOufAzQIJx8RSO137eQq7im0jprph9qKdLrW2SJSGOe5d+d62+4ZYtX2izOAvC5ZtgixzWBZhvdXfY6vvP6BPYguJ0BNIK3FB0NP+zEiXheQZ/P6o+8dCYU907K994Jd27w7IPUDyczwqnZROA30BIWegvR70xN4a0ZseysRGfyDAlJV3wBOAra9Ksm1UZKTEkXWnsrq8Pndg4b2xbJiiQAyTHqK4kkCTRbEL+hQhcHAQJBBQIohPvXrn1ZDF1ddc6ZWB7BXUpaKyK9/EK5VVf8MnGwu21997cR1i++5PS1KQhZwrVG7t/ZZWfLpB+u69RhEM8hRmPQuILeA9AU6YO8eiIHEgJg2HOsxoKJxZar/iuumbN0EPzKyXKSqlohceVTPI1X1YeASx63A00VTxtQhf09UG1GoXbxxdS9qaiKHWncN+MDzMsgQIN2AVMW+bSGH5N2iyJJNfyoYZ89hbRUAlxg9HJ1Aqmo2cJnDSrzAVSe1zHhvBJEx6nJJh1PK8fpWvLVsB3Jo3dlG8PVEeSWFyhCRySLyDjDa9LcezFGqmnO0AWmp6gwg1zGqvcB1IrLEEZwvd4zcBCgy0H3qymVr8Hi8B+dSg/cB7RLUfJKi/+1gt0uA6xxgWkCO0ctRA+RYIM8BogeYIyL3OR8KEfkP6L0kLnGvIWIDLtzwyZeINBUXrwdGJkqHis4bSdnHrqnKfWZq4nHE1zxVnXq0sFb3+w/I3MJkfAASTODITHkR37B57FzXSOboHIH7TRxMRNkQInLWAfTzGHCRI8T4gN+LyANHDdkBXmqafst5QHLC/DpUhYjGzbGuINhN4OEEgphiYZ3XRBLh18BLDfkZ96nqhUcLkOtE5PymHgoR2QRWdiJlEUgKk/FUHJDfpPmJeHfxCtaEkZQ3uTpj9OD0EDXA06p6/vcdyDIROeVgHw5R/gDwVoKjxuAwGRMd5OYVaTwENCeovDqc8scOIb13ClDmAvOvqvqL7xxIVf05+08jKkSk3aFbUc1Vuo/lJWhGIKcaEB9m31bHRLzY15uy0YfcR1svzoRCLbBMVft8Z0Cq6onA31zxxgd0b877hlNdBYxJYLapMkTkouVkTAXOTOAA8Qtc2bX58+Durj5WA+tVtfe3zlpVtSfwqYutJgO9ReTTwxEoTPBW4ILDJSHAaYrVS/Dcj2t/zmGWZ0NEbjpMT9YL+CSO/nqJyGffCpCq2gP4LI4QfUXk43h1dpf0ryL+CN6Wddy6HnHAXGfAaE7xKXqTIO9gk5sExkWqQ0T67Xf3ZTYRf0G9BcPi69i40/Uu+bxApohUHlHXarYErnM1HgDObwxERzuN/eLEoNilzZySiKIPj6BsqcLKBIOYrMQuOYBBHFTfHPHyY+B8oz8cSYPdzdl66TkEEJOB3S7L8gKTROT5RPLNEVSsAV3YDI+xegRl2WEyXpUE5nJtOXShLVcCX2rr7XoakjzLgJmccCBVNcmAqC4Qp4vIwiMxfwlRNt/E4YMttSEi54UJ3g3SNcHifGrkSXxqTeQuYLoLTDX6TrhFlsRxJYtFZMGRTQzVXYy9vNRUSbPQnywnYzJwToKFSIfai49kL40eF7s9kKpuThiQqroRyHLdXi4i1zYA9rXXPKxY4WHlSg8JSoSHqIwoOo4Dzy/9wGgP1hmCXE9iXapX0XEhqiIc4WL0udx1u5XRf9MMrwkQd8ZhY6+IyL784tkjA/rCi1kGbC9QU1FTsystENgjIpaDEDU2TWgiXpYtCRP8BTAiPjHS+0AigvfPNFwM1kNk6fGeD4+gbMlB6DGVBOSLReQ8Vf0ncJbjdhdV3SkirRI+j3SBHQRmAqc5rPx24HERqTbTj0YtP+u4dYnfafb4I34+LUkP5ywMmD7GQvfMreXS4RGyeu8P2JLFfjZuSQtPLU4yz1uhwpwq2vorGHPjt7YT7ltPCDjLi5980n5kr17zsPep1AP5CHCniOz91nu0aJGEb87vADxqPE59H18dULbp9g4LF24nP18dc1Y/9kapRdjfeIixztXAhBCR6qMByMNOmp/RvXu89yQsTh5yufnm+rTX20AmkGF+F6zN6PIjAoEWroGcAVwJ9ML+UCfDAPpyKHecl6OkHJWHQTTl7UN5N+0FnqDhF1cWcE14+rzW9OthAzS2OAn7RI+LXCTpQ+Dd8Mzbqo5eIIvmCbm5AVXNUNXWqtpeVduoaiZz5yYzePBhgJ8lqurn9tuDZZWVrcy726lqJkW3pfLgHU1ZgF0/PzfdIVvbnXv3ZjLzthQ6trVlKyioDd2SuwFY6mK8fYEQV14TBDzhu2a3An7resYHPBgaP3tHiMg+cBcUeSn6YwtVbamqbetlj8ZiWRTcnswppxxAL+2FOXl+5ixMV9Us0+f2pg8ZTCwKMHmK7Bf2imYlUbCoZTQWyyyvqWnJ7Fsy6mIxn6r6uWVBZjQWy2J8QQq4N7dcWxBYU3BtqwHt2nUCzgZ+DCRhJ50/wD6IYbMUztxNeWUlxfO0qra2fbLfPx8Y5BgcjwJ3iEiFgxT5P96xI6tPmzadgZ9if0Zez1o3AM8C6yV/7g4+/E85zzyjLlLlNa6vC/a3G2dgH9pgmZzlUmCjzJ2zMzytuNLI0QO4A2jjeNUeYGxoQeHW8MTs04B5DrYrwD+BohCRr+1mNfDFrl3px7ds2QboA5yLfRiF17T9OfY3nBukoKCU/PzqBmDMnpW05n/GZA1o17Yt9kbn4UAr01Ytdj74HzKlYCOZ3l1Mz4nW68sMvDEGAwv40rSVCfzc6HCyFBU50qNFs1NVta+q3qOq76vqalX90PFbZX7PqupPmF3YChHP7srK9qr6Z8dzq1V1ivMQhc2RSNJD777XW1WLVfW9Rt69RlVfVdVzyM5vxxln7Bvh/S/3rtq6tZOqjlPVdxqpv1pV/6Gq/8XMBamAMLMgGCZ4ZZjg2jDBD81vdZhgYZjgSWGCTzvufxgm+E6Y4BAKCpJsufckq+rxqlqoqv82Mq5qRC9LVLUfOdkp34A4pzBdVU8y+nk3jtz1+npfVYuueGJp95hl2VPCe+5KVtULVfUjRxsrVXW6qr5l6q1V1WExy0qyLbLo1hY69caehrm1oekd2zEgBwhX19VlHdAiRy/yMyDaWydNzAX6H8SEXUt27brj+NvveQbZUUreIjUHGF0G3MCBNw4L8KpJHZaHCXqwv20sNtbklH+FyQI5d/v9JTQ/514mTdwJ6EPvvZs6+qST/2QsqSm5BftLr0ly6qlb+Pe/VaET8KSZZzalUy/wOHCXiOxkTmGKTptxAfa20jpHnPe4wsB44BUPHTp4deqN7YCCOCD6jPtLjvOCcikqanp60yHSWidN/F0cEAPml+R6txzXsuUNmjftBLytUlTVY9J0l7qU/jnwPPCGkdlj/v5ETTQatTNDESs0be4O4EFX8sOLvR3SOSh2AE+HJ83aU6+D3zyzTA1p8jr6Xd/2J653KnAiMJgRI5IQUZk5rxp4xtG/gAFlnXGTftfgOh9oR1GRt5EtnR7Xv/3Y20fUw+mnpphO9XaA6DFxJxt7y/9VwG2mkg94WApmfcz06XXV0QOs2RbPTdKivP5AyAXiF9gHMlyEvVH57jhKGa0zZmRK3p0eMx1o6/h7GXAXcLfkF8wFfg3cAiyWwuL1yX7/vjhVNLbSxPdXDjAl8gGPhApu2hoisq9Di9pUS27BB8ZSPgPyjWcYD0wGJmKfklVfosAQnTnTB1A5bfyeipqaJ82cdKXp8+XAFOwzC4pd/U6zPYf6D2C/HuBj4z2vkXnzSkQk6tEnlwZNAHYi8tHqbV/PtlRfqovF1kp+7nsbd0eeAq4FbpPihU+yoaQUsJJ9jWf5dNKUZBOUnWJFgNmSm/2Gpbo+almrJSf3Gextik72eArQiS4tfGYQWA0T2YwFfqT5eSlAKfC85Oc8iC+2y9WehvJv3g08ROPbID8CXgnn3dpwR1z5Hyx8/p2Sn7/YgPip8U5tsHep+7APInQOwMyaaNQP0CIQiKb/8a6vgWnAfcB2Q9jaG8JTScMNWRbQgbo6L55Gp+HrgcLK2rqn5M7b3uTFF3cAls8wvy4ut/P0oHseLyH/pm8yM93uWLTnjXfXVAzp1PmLmvHj6pL8/qY+cpGvImWpnYIZPR2KFeCNqGWVMGv2Xu+s2bbwxcXbgReBi42rrR95A9i1fZ1RwDrjnusV1sMwzl1GwY9q/qz1Mu/Ouv3iaH5+TShv9oZwQfGzxkVbrqT74lDO3FJmjbXcTHlPVVXrzJSUk41X6mgGkTgyQDHXwPEk+Xw2Cvk5gSU/G97ODOazDYDOMKXsvw3Fi7dRFP3G1ZekJgXK3Waa5kr4KrChLueGhqmp0go9vVv3uoDPV30QIALQNi3Vb0ags71t/jmFDT6pi06YEK2NxiqMZTlHZ5ZOnqxAmWQX3GH+Li5XlmHIyG1AoU75Q3cWLNjv+8twQfFu4O/sv6/1HWAVs8Y2vN+3r6z4/IvWmSkpo4HZQE8z6OvPhK3jQGfDDh/mJTWr62UnDiww3qOLASJm6tZx6HuJ9hqLrIznby2XcrxA8t7a2v0nuIWFHlX1MrPwoNJvX5WVqWv0K+DX7NyGQ9DjkYDP614lEUDXbd/uEZEqUgLvbykru8Ew4licmBoDhgATdMKETIYMccsYNW7dfb5OKfYWxYaAjB4XGN7j+N4mpsVcJC3JQdbib1cJr0jRiTePwP421AmYs+6hfsRUZX5WPCDLTAedljAECJKRIQ4Qk/D7Ov9t/ccnac6MTE49takMj7ZPS6th37lu9e8+oS4Wy2LwwG/eLblFKcDxNPw6ygOU9G/bNkr/AaIzpsU63f/wJsNAfwXMAl53KcMChgKtGZXdQL7QiKH1gLstyIpnVTp1rM+A4BwQNYbdX4x9QOHvsM8T2K+U19SkGE/hBPErM4X6pSF6E1wxsqli1UZjKiNHxmVAFUYYcdDgS4PJyWdqJNLVpJTafvjb3/bTyVPyftG3z/3AcM75ZRYgB2Ktfq93L/C+i8Sc7Pd6z9S3V3VS1TRVDVbnTjreKMVNitbKRbfWMfqKTOBcHX/DMCBNFi7YIbOKXsD+2qnApSw/kEraFnEt9jUnfdnONfpLgY9kQfGG3VVV2wx5ircZWzIK53pdYUWAzy99/C8lkrdg4/aKiu1G1kM/5DdOX3wye1aFzsh5GnsTb8yhjBwzwd0IZA7q0KG/EUyBKZozcatUWO9W1tVJZkr89WGvx1MFvGBGb7rDDU7APkv8AyAzyef7iYkhlsO9vyAF+Xs4Eb9Ozu9pqH4GsEbHT3zWYQkxl9XUAdV07NysM3r2eYlsS2cWbnbMTzEyXqETJ7+MveB+mWGw1n6L1FHqDEnr5ej30CdGXXYhsMoQt0sSlTT3cdsd1RKTtZqb/b9GsDpHw/2BExwuqV45LYBhn03+3fu7q6romJHR2Ip3dFdl5easlJRb41jOqQbMejCcyigBHte8/IhJSIw1bdaZDM0MI0uFyZrEXFOJUs4777AWhHVmYS3wL+AaRxy0DPs81/w72ljGR4vyKs3c8aeOaU8y8BszUGM077TLRtzH9q8Vv3eHzJz5iFkQTmoihiQBj8uCRY/1HHx1bedgMF6M+ea65aATyyS3cKWZ/BKHoMRcROsLIFuyb9ksInUxy7Kw97LUOhRaz/iSXfWrn1i15l6TGNc47kg5yAMjRKRO8udvMomHgEsftaZ9j2GQ4u67+f+IrDSyuzM49WcU+OMwUMWywOsjnl4DPq/Gc622YqZPj1Fa+pUUzHnIuLAPTSNJ5r8Bo7TVwETJLXiAjz/ayJfPRT8tLa0xnWphrCcV2CuX/NK2vs8+VV4qKc0Or1iGfbDQvwxg9e/2m3qlhshMkOI/fsLsiZUAvoEDKyUv+x/A1cBjwGbzfMAhm98sJN/wq78ufU/69Nl/HTEnp56+i6mfYmSudXihhlrLn7T7pmUvPGe8yRajg/o2vcAys2qT5nhfneRk1wKWzMwvBeZjf1hb4+hzkrm+13gQp+4iBJKipKZahiekOuQVYK/pywHKpRcIixam7q2t7aiq/VV1pKpepqrnquoJtdFoJ25dlMrpQ/cxwry8ZLO21l9VB6pqr6/LylurasOUT4tUIT8/xTzbR1WHm3dfpKpDVLXbzr17MwmNiJ8qyp7rJyc7U1W7quogVf25qX+2abs9OTOSGTq0cVYzb1FqmGCnMMEBYYKDwgT7hAm2ZW5R49OA3GkeVU037f5YVS81qxL9qmpr25v+9DR97/dVJNJeVfdZ8LBZPnJyW6pqD1UdpqqjVHXEtrLyXqra+rl16zupaj9TvydTZ7bm99d46dbRw/SClmb1ZaCqDlDVTsxblNpYxj7+/YWPeti9y0vLOi9791qkpse4+eZo3GcXzRdS04WMdPD44aP/WOTdEt+Fde0qjBnjCY8a5Q09/5yXsnLF44kRq46RP7vpuPbSMmHdJ15qar34vB6iUYuU46KMG2UdlNucX+ShXWfB74GyCti2zSIvr+l6ObmeWEG+1zvvPi+xLbCzU1QXXhOLWRa+pU94sCwor4KtW5Tc3P36YZL/Prn/Xg8bq63avOtiAZ8vRt40D517COkp9jGKf33e4i9LbHm6txGumuNhQCrUxODrzcqkaUfFZrBjpZnl/wCkhvij9ID4OQAAAABJRU5ErkJggg=="

/***/ },
/* 175 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 176 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 177 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 178 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 179 */
/***/ function(module, exports) {

  module.exports = require("jsts");

/***/ },
/* 180 */
/***/ function(module, exports) {

  module.exports = require("nodemailer");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map