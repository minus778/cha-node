const express = require('express')
const router = express.Router()
//引入数据库
const connect = require('../db/request')
const jwt = require('jsonwebtoken')

//获取商品分类页数据
router.get('/goodslist', (req, resp) => {
    let mes = req.query
    let [searchName, typeName] = Object.keys(mes)
    let [name, orderRes] = Object.values(mes)
    //mysql模糊查询'% %'
    //当点击的为销量或价格时进行order排序
    let sql = typeName === 'all' ? `select * from goods_list where name like '%${name}%'` : `select * from goods_list where name like '%${name}%' order by ${typeName} ${orderRes}`
    connect.query(sql, (err, res) => {
        resp.send(res)
    })
})
//根据id获取商品详情页数据
router.get('/goodsdetail', (req, resp) => {
    let sql = `select * from goods_list where id = ${req.query.id}`
    connect.query(sql, (err, res) => {
        resp.send(res)
    })
})

//添加商品到购物车
router.post('/addCart', (req, resp) => {
    let token = req.headers.token
    let goodsId = req.body.id
    jwt.verify(token, global.secretJwt, (err, decoded) => {
        if (decoded) {
            let userSql = `select id from user where tel = ${decoded.tel}`
            let goodSql = `select * from goods_list where id = ${goodsId}`
            //获取用户id
            connect.query(userSql, (e, r) => {
                let userId = r[0].id
                //查询购物车中是否存在商品
                let sql = `select * from cart where (goods_id = ${goodsId} and uid = ${userId})`
                connect.query(sql, (error, result) => {
                    //已存在此商品则商品数量加一
                    if (result.length > 0) {
                        //新的数量
                        let num = result[0].goods_num + 1
                        let updateSql = `update cart set goods_num="${num}" where goods_id = ${goodsId}`
                        connect.query(updateSql, (e2, r2) => {
                            resp.send({
                                code: 200,
                                success: true,
                                msg: "商品已在购物车，该商品数量已加一"
                            })
                        })
                    } else {
                        //不存在商品则新建
                        //获取商品信息
                        connect.query(goodSql, (err, res) => {
                            let goods_name = res[0].name
                            let goods_price = res[0].price
                            let goods_imgUrl = res[0].imgUrl
                            //添加商品至数据库
                            let addSql = `insert into cart (uid,goods_id,goods_name,goods_price,goods_imgUrl,goods_num) values (${userId},${goodsId},"${goods_name}",${goods_price},"${goods_imgUrl}",1)`
                            connect.query(addSql, (e3, r3) => {
                                resp.send({
                                    code: 200,
                                    success: true,
                                    msg: "成功添加商品至购物车"
                                })
                            })
                        })

                    }
                })
            })
        } else {
            resp.status(401).send({
                code: 401,
                msg: '登录已过期，请重新登录',
                success: false
            })
        }
    })
})

//从购物车中获取数据
router.get('/getFromCart', (req, resp) => {
    let token = req.headers.token
    jwt.verify(token, global.secretJwt, (err, decoded) => {
        if (decoded) {
            let userSql = `select id from user where tel = ${decoded.tel}`
            connect.query(userSql, (e, r) => {
                let userId = r[0].id
                let sql = `select * from cart where uid = ${userId}`
                connect.query(sql, (err, res) => {
                    console.log(res);
                    resp.send({
                        code: 200,
                        success: true,
                        msg: "成功获取购物车数据",
                        data: res
                    })
                })
            })
        } else {
            resp.status(401).send({
                code: 401,
                msg: '登录已过期，请重新登录',
                success: false
            })
        }
    })
})

//删除购物车指定商品
router.post('/deleteGood', (req, resp) => {
    let token = req.headers.token
    let goodId = req.body.id
    jwt.verify(token, global.secretJwt, (err, decoded) => {
        if (decoded) {
            let userSql = `select id from user where tel = ${decoded.tel}`
            //获取用户id
            connect.query(userSql, (e, r) => {
                let userId = r[0].id
                let sql = ''
                //如果id存在就删除一件指定商品
                if (req.body.id) {
                    sql = `delete from cart where (goods_id = ${goodId} and uid = ${userId})`
                } else {
                    //如果id不存在就删除所有商品
                    sql = `delete from cart where uid = ${userId}`
                }
                connect.query(sql, (err, res) => {
                    resp.send({
                        code: 200,
                        success: true,
                        msg: "删除成功"
                    })
                })
            })
        } else {
            resp.status(401).send({
                code: 401,
                msg: '登录已过期，请重新登录',
                success: false
            })
        }
    })
})

//修改商品数量
router.post('/updateNum', (req, resp) => {
    let token = req.headers.token
    let goodId = req.body.id
    let newNum = req.body.newNum
    jwt.verify(token, global.secretJwt, (err, decoded) => {
        if (decoded) {
            let userSql = `select id from user where tel = ${decoded.tel}`
            //获取用户id
            connect.query(userSql, (e, r) => {
                let userId = r[0].id
                let sql = `update cart set goods_num = ${newNum} where (goods_id = ${goodId} and uid = ${userId})`
                connect.query(sql, (err, res) => {
                    resp.send({
                        code: 200,
                        success: true,
                        msg: "修改成功"
                    })
                })
            })
        } else {
            resp.status(401).send({
                code: 401,
                msg: '登录已过期，请重新登录',
                success: false
            })
        }
    })
})

module.exports = router