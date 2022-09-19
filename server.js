// Requirements
const express = require('express'),
    mongoose = require('mongoose'),
    articleRouter = require('./routes/articles'),
    methodOverride = require('method-override'),
    Article = require('./models/article'),
    md5 = require('md5'),
    sessions = require('express-session'),
    utils = require('./utils/timeSince'),
    path = require('path');

// load env variables
const dotenv = require('dotenv');
const Users = require('./models/uCredentials');
const article = require('./models/article');
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
    const devlog = articles.filter((article) => article.tag === 'devlog')[0];
    const blogpost = articles.filter((article) => article.tag === 'blogpost')[0];
    const project = articles.filter((article) => article.tag === 'project')[0];
    blogpost.timeSince = utils.timeSince(blogpost.createdAt);
    devlog.timeSince = utils.timeSince(devlog.createdAt);
    project.timeSince = utils.timeSince(project.createdAt);
    res.render('pages/index', { blogpost: blogpost, admin: req?.session?.user?.admin, pageId: 'home', devlog: devlog, project: project });
});
app.get('/blog', async (req, res) => {
    renderPosts(req, res, 'blogposts');
});
app.get('/devlogs', async (req, res) => {
    renderPosts(req, res, 'devlogs');
});
app.get('/projects', async (req, res) => {
    renderPosts(req, res, 'projects');
});
async function renderPosts (req, res, article) {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    const devlogs = articles.filter((article) => article.tag === 'devlog');
    const blogposts = articles.filter((article) => article.tag === 'blogpost');
    const projects = articles.filter((article) => article.tag === 'project');
    blogposts.forEach((blogpost) => {
        blogpost.timeSince = utils.timeSince(blogpost.createdAt);
    });
    devlogs.forEach((devlog) => {
        devlog.timeSince = utils.timeSince(devlog.createdAt);
    });
    projects.forEach((project) => {
        project.timeSince = utils.timeSince(project.createdAt);
    });
    res.render('pages/posts', { blogposts: blogposts, admin: req?.session?.user?.admin, pageId: "posts", devlogs: devlogs, projects: projects, active: article });
}

app.get('/login', (req, res) => {
    res.render('pages/login', { admin: req?.session?.user?.admin, pageId: 'login' });
});
app.get('/register', (req, res) => {
    res.render('pages/register', { admin: req?.session?.user?.admin, pageId: 'register' });
});
app.get('/about', (req, res) => {
    res.render('pages/about', { admin: req?.session?.user?.admin, pageId: 'about' });
});
app.get('/skills', (req, res) => {
    res.render('pages/skills', { admin: req?.session?.user?.admin, pageId: 'skills' });
});
app.post('/register', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.render('pages/register', { err: 'Please enter a username and password', pageId: 'register', admin: req?.session?.user?.admin });
        return;
    }
    const userExists = await Users.findOne({ username: req.body.username });
    if (userExists) {
        res.render('pages/register', { err: 'Username already exists', pageId: 'register', admin: req?.session?.user?.admin });
        return;
    }
    const encryptedPassword = md5(req.body.password);
    const user = new Users({ username: req.body.username, password: encryptedPassword, admin: false });
    user.save((err) => {
        if (err) {
            console.log(err);
            res.render('pages/register', { err: 'Error! Cannot register user.', pageId: 'register', admin: req?.session?.user?.admin });
            return;
        } else {
            res.render('pages/login', { admin: req?.session?.user?.admin, pageId: 'login' });
        }
    });
});

app.post('/login', (req, res) => {
    // Validate username and password
    if (!req.body.username || !req.body.password) {
        res.render('pages/login', { err: 'Please enter a username and password', pageId: 'login', admin: req?.session?.user?.admin });
        return;
    }
    const user = Users.findOne({ username: req.body.username, password: md5(req.body.password) }, (err, user) => {
        if (err) {
            console.log(err);
            res.render('pages/login', { err: 'Error! Cannot login user.', pageId: 'login', admin: req?.session?.user?.admin });
        } else {
            if (user) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.render('pages/login', { err: 'Invalid username or password.', pageId: 'login', admin: req?.session?.user?.admin });
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