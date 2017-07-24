var crypto = require('crypto');
module.exports = function(app) {
    function checkLogin(req, res, next) {
        if (req.session && !req.session.user) {
            req.flash('error', '未登录!');
            res.redirect('/login');
        }
        next();
    }

    function checkNotLogin(req, res, next) {
        if (req.session && req.session.user) {
            req.flash('error', '已登录!');
            res.redirect('back');//返回之前的页面
        }
        next();
    }

    // 对所有(/)URL或路由返回index.html
    app.get('/', function (req, res) {
        res.render('index', {
            title: '主页'
        });
    });

    //页面初使化加载
    app.get('/ajax/init', function (req, res) {
        res.send({
            user: typeof req.session != 'undefined' ? req.session.user : null,
            status : true
        });
    });

    // 对所有(/)URL或路由返回index.html
    app.get('/message', function (req, res) {
        res.render('message');
    });

    // 新增接口路由
    app.get('/data/:module', function (req, res, next) {
        var c_path = req.params.module;
        var Action = require('../data/' + c_path);
        Action.execute(req, res);
    });

    app.get('/login', checkNotLogin);
    //登录
    app.get('/login', function (req, res) {
        res.render('login', {
            title: '登录',
            user: req.session ? req.session.user : null,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
};
