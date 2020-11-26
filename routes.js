'use strict';

module.exports = function(app) {
    var index = require('./controllers/hello');
    var articles = require('./controllers/articleController');

    // index
    app.route('/')
        .get(index.index);

    // article preview
    app.route('/getArticle')
        .get(articles.getArticle);

    // article details
    app.route('/articleDetails/:article_id/')
        .get(articles.getArticleDetails);

    app.route('/postArticle')
        .post(articles.postArticle);
    // post article

    // app.route('/addItems')
    //     .post(items.addItems);

    // app.route('/itemDetails/:item_id/')
    //     .get(items.itemDetails);

    // app.route('/updateItem/:item_id/')
    //     .put(items.updateItem);
    
    // app.route('/deleteItem/:item_id/')
    //     .delete(items.deleteItem);

};