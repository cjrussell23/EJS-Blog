const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const { sanitize } = require('dompurify');
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    markdown: {
        required: false,
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
    previewImageURL: {
        type: String,
        required: false
    }
});

articleSchema.pre('validate', function(next){
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    if (this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
    }
    next();
})

module.exports = mongoose.model('Article', articleSchema);