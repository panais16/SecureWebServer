var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var connection  = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"mysql"
});

router.get('/queryByName/:name/:password', function(req, res, next) {
    var sql = "select * from tb_user_info";
    var name = req.params.name;
    var password = req.params.password;
    sql += " where name = '"+ name +"'"+" and password='"+password+"'";
    console.log(sql);
    connection.query(sql,function(err,result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }else{
            res.json(result);
        }
    })
});
router.post('/add', function(req, res, next) {
    var sql = "insert into TB_USER_INFO(name,password) values(?,?)";
    var params = [req.body.name,req.body.password];
    connection.query(sql,params,function(err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }else{
            res.json({message:"success"});
        }
    })
});
router.get('/', function(req, res, next) {
    res.render('index');
});
module.exports = router;
