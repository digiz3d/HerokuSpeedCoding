var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');
var Transaction = require('./app/models/transaction');


var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));


app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

/*
app.get('/setup', function (req, res) {
    //Here values to mongodb collections

    var nick = new User({
        name: 'bob',
        password: 'azerty'
    });

    nick.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
    var transact = new Transaction({
        value: 2000,
        message: "Paye octobre", 
        date: Date.now()
    });

    var transact2 = new Transaction({
        value: -150,
        message: "Restaurant", 
        date: Date.now()
    });

    var transact3 = new Transaction({
        value: -350,
        message: "Loyer octobre", 
        date: Date.now()
    });

    transact.save(function (err) {
        if (err) throw err;

        console.log('Transaction saved successfully');
        res.json({ success: true });
    });

    transact2.save(function (err) {
        if (err) throw err;

        console.log('Transaction saved successfully');
        res.json({ success: true });
    });

    transact3.save(function (err) {
        if (err) throw err;

        console.log('Transaction saved successfully');
        res.json({ success: true });
    });

});
//*/




var apiRoutes = express.Router();

apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to HerokuSpeedCoding\'s API. Please authenticate using POST name and password at /api/authenticate' });
});

apiRoutes.post('/authenticate', function (req, res) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        else if (user) {

            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else {
                const payload = {
                    name: user.name
                };
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 1440 * 60
                });

                /*let options = {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    httpOnly: true, // The cookie only accessible by the web server
                    signed: true // Indicates if the cookie should be signed
                }*/
                
                // Set cookie
                res.cookie('token', token/*, options*/) // options is optional

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});

apiRoutes.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies["token"];

    if (token) {
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

apiRoutes.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

apiRoutes.get('/transaction-list', function (req, res) {
    Transaction.find({}, function (err, transactions) {
        res.json(transactions);
    });
});

apiRoutes.post('/transaction', function(req,res) {
    let transaction = new Transaction({
        value: req.body.value,
        message: req.body.message,
        date: Date.now()
    });
    transaction.save(function(err) {
        if (err) throw err;
        console.log("successfully added a new transaction");
        res.json({success: true});
    })
});
// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);


app.listen(port);
console.log('Magic happens at http://localhost:' + port);