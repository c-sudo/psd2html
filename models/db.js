var mysql = require('mysql');
var db_config = {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'xy1988',
    port:'3306',
    database : 'psd2html'
};
var pool = mysql.createPool(db_config);


function query(query, callback){
    pool.getConnection(function(err,connection){
        if(err) {
            console.log("mysql's error: ", err)
        }
        connection.query(query,function(err,result){
            callback.call(null, result);
            connection.release();
        });
    });
    //pool.end();
}
//function handleDisconnect() {
//    connection = mysql.createConnection(db_config);
//    connection.connect(function(err) {
//        if(err) {
//            console.log("进行断线重连：" + new Date());
//            setTimeout(handleDisconnect, 2000);   //2秒重连一次
//            return;
//        }
//        console.log("连接成功");
//    });
//    connection.on('error', function(err) {
//        console.log('db error', err);
//        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
//            handleDisconnect();
//        } else {
//            throw err;
//        }
//    });
//}
//handleDisconnect();

module.exports = query;
