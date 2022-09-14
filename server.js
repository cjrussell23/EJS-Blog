// Requirements
const express = require('express'),
    mongoose = require('mongoose'),
    articleRouter = require('./routes/articles'),
    methodOverride = require('method-override'),
    Article = require('./models/article'),
    md5 = require('md5'),
    sessions = require('express-session');
    path = require('path');

// load env variables
const dotenv = require('dotenv');
const Users = require('./models/uCredentials');
dotenv.config();

// Create the Express app
const app = express();

// connect to mongodb
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected"),
    );
} catch (e) {
    console.log("could not connect");
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}))
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// routes
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    // if no user is logged in, set the user
    res.render('articles/index', { articles: articles, user: req?.session?.user });
});
app.get('/login', (req, res) => {
    res.render('pages/login');
});
app.get('/register', (req, res) => {
    res.render('pages/register');
});
app.get('/about', (req, res) => {
    res.render('pages/about');
});
app.get('/contact', (req, res) => {
    res.render('pages/contact');
});
app.post('/register', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.render('pages/register', { err: 'Please enter a username and password' });
        return;
    }
    const encryptedPassword = md5(req.body.password);
    const user = new Users({ username: req.body.username, password: encryptedPassword, admin: false });
    user.save((err) => {
        if (err) {
            console.log(err);
            res.render('pages/register', { err: 'Error! Cannot register user.' });
        } else {
            res.render('pages/login');
        }
    });
});
app.post('/login', (req, res) => {
    // Validate username and password
    if (!req.body.username || !req.body.password) {
        res.render('pages/login', { err: 'Please enter a username and password' });
        return;
    }
    const encryptedPassword = md5(req.body.password);
    const user = Users.findOne({ username: req.body.username, password: encryptedPassword }, (err, user) => {
        if (err) {
            console.log(err);
            res.render('pages/login', { err: 'Error! Cannot login user.' });
        } else {
            if (user) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.render('pages/login', { err: 'Invalid username or password.' });
            }
        }
    });
});
app.use('/articles', articleRouter);
app.use(express.static('public'));

// start server
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});