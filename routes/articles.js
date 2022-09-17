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
module.exports = router;
