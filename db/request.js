const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '101.33.249.237',
    //远程数据库用户名使用xmall，本地数据库用户名是root
    user: 'root', //xmall
    password: "hewujun1027",
    port: "3306",
    database: "xmall"
})

connection.connect()

module.exports = connection