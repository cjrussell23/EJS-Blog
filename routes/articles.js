const express = require('express');
const Article = require('./../models/article');
const router = express.Router();
const Users = require('.././models/uCredentials');

router.get('/new', (req, res) => {
    if (!req.session.user?.admin) {
        res.redirect('/login');
    }
    res.render('articles/new', { article: new Article(), admin: req?.session?.user?.admin, pageId: 'new' });
});
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!req.session?.user?.admin){
        res.redirect('/login');
    }
    res.render('articles/edit', { article: article, admin: req.session?.user?.admin, pageId: 'edit' });
});
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    if (article == null) {
        res.redirect('/');
    };
    res.render('articles/show', { article: article, admin: req.session?.user?.admin, pageId: 'show' });
});

router.post('/', async (req, res, next) => {
    if (!req.session.user?.admin) {
        res.redirect('/login');
    }
    req.article = new Article();
    next();
}, saveArticleAndRedirect('new'));
router.put('/:id', async (req, res, next) => {
    if (!req.session.user?.admin) {
        res.redirect('/login');
    }
    console.log("Update article");
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect('edit'));

router.delete('/:id', async (req, res) => {
    if (!req.session.user.admin) {
        res.redirect('/login');
    }
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});
function saveArticleAndRedirect(path){
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        article.previewImageURL = req.body.previewImageURL;
        article.tag = req.body.tag;
        article.timeSince = timeSince(Date.now());
        try {
            console.log("Save article");
            article = await article.save();
            res.redirect(`/articles/${article.slug}`);
        } catch (error) {
            console.log(error);
            res.render(`articles/${path}`, { article: article });
        }
    };
}
// Date Function
function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
        const years = Math.floor(interval);
        if (years === 1) {
            return years + " year ago";
        }
        else {
            return years + " years ago";
        }
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        const months = Math.floor(interval);
        if (months === 1) {
            return months + " month ago";
        }
        else {
            return months + " months ago";
        }
    }
    interval = seconds / 86400;
    if (interval > 1) {
        const days = Math.floor(interval);
        if (days === 1) {
            return days + " day ago";
        }
        else {
            return days + " days ago";
        }
    }
    interval = seconds / 3600;
    if (interval > 1) {
        const hours = Math.floor(interval);
        if (hours === 1) {
            return hours + " hour ago";
        }
        else {
            return hours + " hours ago";
        }
    }
    interval = seconds / 60;
    if (interval > 1) {
        const minutes = Math.floor(interval);
        if (minutes === 1) {
            return minutes + " minute ago";
        }
        else {
            return minutes + " minutes ago";
        }
    }
    const secondsAgo = Math.floor(seconds);
    if (secondsAgo === 1) {
        return secondsAgo + " second ago";
    }
    else {
        return secondsAgo + " seconds ago";
    }
}
module.exports = router;
