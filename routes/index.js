var express = require('express');
var router = express.Router();
var db = require('../models/db.js');
/*mysql*/
var moment = require('moment');
//缓存查询会影响更新操作
var DataAPI;
function routerControl(cfg){
    db('SELECT * from html', function(result){
        DataAPI = result;
        cfg.res.render(cfg.temp, {
            title: cfg.title,
            result : cfg.callback(DataAPI, cfg.index)
        });
    });
    //if(!DataAPI){
    //    db('SELECT * from html', function(result){
    //        DataAPI = result;
    //        cfg.res.render(cfg.temp, {
    //            title: cfg.title,
    //            result : cfg.callback(DataAPI, cfg.index)
    //        });
    //    });
    //}else{
    //    cfg.res.render(cfg.temp, {
    //        title: cfg.title,
    //        result : cfg.callback(DataAPI, cfg.index)
    //    });
    //}
}
router.get('/', function(req, res, next) {
    routerControl({
        title : 'Welcome to psd2html',
        temp : 'index',
        callback : dataControl,
        res : res
    });
});
router.get('/page/delete/:id', function(req, res){

    db('DELETE from html where id = "' + req.params.id + '"', function(result){
        res.send({deleteSuccess : true})
    });
});
router.get('/page/:id', function(req, res){
    routerControl({
        title : 'My Site',
        temp : 'page',
        callback : pageContent,
        res: res,
        index : req.params.id
    });
});

//新增
router.get('/add', function(req, res){
    res.render('add.ejs', {
        title : '上传psd'
    });
});

function pageContent(data, index){
    var item = dataControl(data);
    var myItem = item.filter(function(v){
        if(v.url == index){
            return v;
        }
    })[0];
    return myItem;
}
//json parse
function dataControl(data){
    var arr = [];
    var firstImage, item, keys;
    for(var i = 0, len = data.length; i < len; i++){
        item = JSON.parse(data[i].image);

        keys = Object.keys(item);
        firstImage = item[keys[0]][0].id;

        //utc与GMT区别
        var yestoday = moment(Date.parse(data[i].date)).format('YYYY-MM-DD HH:mm:ss');
        arr.push({
            id : data[i].id,
            url : data[i].url,
            firstImage : data[i].url + "/" + firstImage + '.png',
            image : item,
            date : yestoday
        });
    }
    return arr;
}


module.exports = router;
