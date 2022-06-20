const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

const homeApi = require('./routes/home')
const goods = require('./routes/goods')
const list = require('./routes/list')
const user = require('./routes/user')


//将images文件夹设为静态资源
app.use(express.static('public'))

// 导入gzip压缩包
const compression = require('compression')
// 一定要将compression使用在托管静态资源之前，才会生效
app.use(compression())

//跨域
app.use(cors())

//配置body-parser(获取post请求参数req.body)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//定义一个全局变量存放token密钥
global.secretJwt = '123456'

app.get('/', (req, resp) => {
  resp.send('hello')
})

app.use('/api/home', homeApi)
app.use('/api/goods', goods)
app.use('/api/list', list)
app.use('/api/user', user)


app.listen(process.env.PORT || 3000, () => {
  console.log('server on http://localhost:3000');
})