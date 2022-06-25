const express = require('express')
const router = express.Router()
const connect = require('../db/request')
const QcloudSms = require("qcloudsms_js");
const jwt = require('jsonwebtoken');
const axios = require('axios')
//引入支付宝配置文件
const alipaySdk = require('../utils/aliPay');
const AlipayFormData = require('alipay-sdk/lib/form').default;

//密码登录验证
router.post('/login', (req, resp) => {
    const userTel = req.body.userTel
    const userPwd = req.body.userPwd
    let telSql = `select * from user where tel = ${userTel}`
    let userSql = `select * from user where (tel = ${userTel}) and pwd = ${userPwd}`
    //验证是否存在手机号
    connect.query(telSql, (err, res) => {
        //手机号存在
        if (res.length && res.length > 0) {
            connect.query(userSql, (e, r) => {
                //密码正确
                if (r.length > 0) {
                    //生成token
                    const payload = {
                        tel: userTel,
                        pwd: userPwd
                    }
                    let id = r[0].id
                    jwt.sign(payload, global.secretJwt, { expiresIn: '1h' }, (err, token) => {
                        //登录成功后更新数据库中的token
                        let sql = `update user set token = "${token}" where id = ${id}`
                        connect.query(sql, (error, result) => {
                            //修改后重新获取用户信息
                            connect.query(telSql, (error, result) => {
                                resp.send({
                                    code: 200,
                                    msg: '登录成功',
                                    data: result[0],
                                    success: true
                                })
                            })
                        })
                    })
                } else {
                    //密码错误
                    resp.send({
                        code: 200,
                        msg: '输入密码有误',
                        success: false
                    })
                }
            })
        } else {
            //手机号不存在
            resp.send({
                code: 200,
                msg: '输入的手机号不存在，请先注册',
                success: false
            })
        }
    })
})

//短信登录验证码
router.post('/login/code', (req, resp) => {
    let tel = req.body.phone;

    // 短信应用SDK AppID
    var appid = 1400187558;  // SDK AppID是1400开头

    // 短信应用SDK AppKey
    var appkey = "dc9dc3391896235ddc2325685047edc7";

    // 需要发送短信的手机号码
    var phoneNumbers = [tel];

    // 短信模板ID，需要在短信应用中申请
    var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

    // 签名
    var smsSign = "徐檀溪";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

    // 实例化QcloudSms
    var qcloudsms = QcloudSms(appid, appkey);

    // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
    function callback(err, res, resData) {
        if (err) {
            console.log("err: ", err);
        } else {
            resp.send({
                code: 200,
                data: {
                    success: true,
                    data: res.req.body.params[0]
                }
            })
        }
    }

    var ssender = qcloudsms.SmsSingleSender();
    //这个变量：params 就是往手机上，发送的短信
    var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000];
    ssender.sendWithParam(86, phoneNumbers[0], templateId,
        params, smsSign, "", "", callback);  // 签名参数不能为空串
})

//保存用户信息
router.post('/login/saveInfo', (req, resp) => {
    let userTel = req.body.phone
    //检查用户是否存在
    let sql1 = `select * from user where tel = ${userTel}`
    connect.query(sql1, (err, res) => {
        if (err) throw err
        //用户已存在,返回用户信息
        if (res.length > 0) {
            resp.send({
                code: 200,
                msg: '登录成功',
                data: res[0]
            })
        } else {
            //用户不存在，添加至数据库
            let sql2 = `insert into user (tel,pwd,imgUrl,nickName,token) values ("${userTel}","123456","http://101.33.249.237:3000/images/user.jpeg","某某某","")`
            connect.query(sql2, (err, res) => {
                connect.query(sql1, (e, r) => {
                    //保存用户信息后重新获取并返回
                    resp.send({
                        code: 200,
                        msg: '用户不存在，已自动注册',
                        data: r[0]
                    })
                })
            })
        }
    })
})

//保存注册用户信息
router.post('/login/register', (req, resp) => {
    let userTel = req.body.phone
    let userPwd = req.body.pwd
    //检查用户是否存在
    let sql1 = `select * from user where tel = ${userTel}`
    connect.query(sql1, (err, res) => {
        if (err) throw err
        //用户已存在,返回用户信息
        if (res.length > 0) {
            resp.send({
                code: 200,
                msg: '用户已存在，请登录',
                data: res[0]
            })
        } else {
            //生成token
            const payload = {
                tel: userTel,
                pwd: userPwd
            }
            jwt.sign(payload, global.secretJwt, { expiresIn: '1h' }, (err, token) => {
                //用户不存在，添加至数据库
                let sql2 = `insert into user (tel,pwd,imgUrl,nickName,token) values ("${userTel}","${userPwd}","http://101.33.249.237:3000/images/user.jpeg","${userTel}","${token}")`
                connect.query(sql2, (err, res) => {
                    connect.query(sql1, (e, r) => {
                        //保存用户信息后重新获取并返回
                        resp.send({
                            code: 200,
                            msg: '用户注册成功',
                            data: r[0]
                        })
                    })
                })
            })
        }
    })
})

//验证用户输入手机号是否存在
router.post('/searchPwd/selectTel', (req, resp) => {
    let userTel = req.body.phone
    let telSql = `select * from user where tel = ${userTel}`
    connect.query(telSql, (err, res) => {
        //手机号存在
        if (res.length > 0) {
            resp.send({
                code: 200,
                msg: "手机号验证成功"
            })
        } else {
            //手机号不存在
            resp.send({
                code: 0,
                msg: '输入的手机号不存在'
            })
        }
    })
})

//用户修改密码
router.post('/searchPwd/resetPwd', (req, resp) => {
    let userTel = req.body.phone
    let userPwd = req.body.pwd
    let sql1 = `select * from user where tel = ${userTel}`
    //获取目标用户信息
    connect.query(sql1, (err, res) => {
        //获取修改的目标用户的id和旧密码
        let id = res[0].id
        let sql2 = `update user set pwd = "${userPwd}" where id = ${id}`
        //修改密码
        connect.query(sql2, (error, result) => {
            resp.send({
                code: 200,
                msg: '密码修改成功',
            })
        })
    })
})

//保存/修改用户地址信息
router.post('/saveAdrInfo', (req, resp) => {
    let token = req.headers.token
    //添加为true，修改为false
    let type = req.body.type
    //获取修改地址对应的index
    let index = req.body.index
    let { name, tel, province, city, county, addressDetail, isDefault, areaCode } = req.body
    jwt.verify(token, global.secretJwt, (err, decoded) => {
        if (decoded) {
            //通过解析token获取用户id
            let userSql = `select id from user where tel = ${decoded.tel}`
            connect.query(userSql, (err, res) => {
                let userId = res[0].id
                if (isDefault === 1) {
                    //如果选择的地址为默认，则改变之前数据库中默认为1的地址
                    let updateSql = `update address set isDefault = "0" where uid = ${userId}`
                    connect.query(updateSql, (e2, r2) => {
                    })
                }

                if (type) {
                    //保存地址信息
                    let adrSql = `insert into address (uid,name, tel, province, city, county, addressDetail, isDefault,areaCode) values (${userId},"${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`
                    connect.query(adrSql, (e, r) => {
                        resp.send({
                            code: 200,
                            msg: "地址保存成功",
                            success: true
                        })
                    })
                } else {
                    //获取数据库要修改的地址对应的id
                    let idSql = `select * from address where uid = ${userId}`
                    connect.query(idSql, (e3, r3) => {
                        let adrId = r3[index].id
                        //修改用户地址
                        let editUrl = `update address set name="${name}",tel="${tel}",province="${province}",city="${city}",county="${county}",addressDetail="${addressDetail}",isDefault="${isDefault}",areaCode="${areaCode}" where id=${adrId}`
                        connect.query(editUrl, (e4, r4) => {
                            resp.send({
                                code: 200,
                                msg: '地址修改成功',
                                success: true
                            })
                        })
                    })
                }

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

//获取用户地址信息
router.get('/getAdrInfo', (req, resp) => {
    let token = req.headers.token
    jwt.verify(token, global.secretJwt, (err, decoded) => {
        if (decoded) {
            //通过解析token获取用户id
            let userSql = `select id from user where tel = ${decoded.tel}`
            connect.query(userSql, (err, res) => {
                let sql = `select * from address where uid = ${res[0].id}`
                connect.query(sql, (e, r) => {
                    resp.send({
                        code: 200,
                        msg: '获取地址成功',
                        success: true,
                        data: r
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

//删除用户地址信息
router.post('/deleteAdrInfo', (req, resp) => {
    let token = req.headers.token
    //获取删除地址对应的index
    let index = req.body.index
    jwt.verify(token, global.secretJwt, (err, decoded) => {
        if (decoded) {
            //通过解析token获取用户id
            let userSql = `select id from user where tel = ${decoded.tel}`
            connect.query(userSql, (err, res) => {
                let userId = res[0].id
                //获取数据库要修改的地址对应的id
                let idSql = `select * from address where uid = ${userId}`
                connect.query(idSql, (e3, r3) => {
                    let adrId = r3[index].id
                    let delSql = `delete from address where id = ${adrId}`
                    connect.query(delSql, (err, res) => {
                        resp.send({
                            code: 200,
                            msg: "删除地址成功",
                            success: true
                        })
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

//生成订单
router.post('/getOrder', (req, resp) => {
    let token = req.headers.token
    jwt.verify(token, global.secretJwt, (err, decoded) => {
        if (decoded) {
            //获取当前订单的所有商品名，商品总价和商品总数
            let { goods_name, goods_price, goods_num } = req.body
            //生成订单号order_id，规则：时间戳 + 6为随机数
            function setTimeDateFmt(s) {
                return s < 10 ? '0' + s : s
            }
            //生成订单号
            function randomNumber() {
                const now = new Date();
                let month = now.getMonth() + 1;
                let day = now.getDate();
                let hour = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();
                month = setTimeDateFmt(month);
                day = setTimeDateFmt(day);
                hour = setTimeDateFmt(hour);
                minutes = setTimeDateFmt(minutes);
                seconds = setTimeDateFmt(seconds);
                let orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString();
                return orderCode;
            }
            //通过解析token获取用户id
            let userSql = `select id from user where tel = ${decoded.tel}`
            let orderId = randomNumber()
            connect.query(userSql, (err, res) => {
                let userId = res[0].id
                /*订单状态：
                未支付：1
                待支付：2
                支付成功：3
                支付失败：4 | 0
                */
                let sql = `insert into goods_order (uid,order_id,goods_name,goods_price,goods_num,order_status) values (${userId},"${orderId}","${goods_name}","${goods_price}",${goods_num},"1")`
                connect.query(sql, () => {
                    resp.send({
                        code: 200,
                        success: true,
                        msg: "成功生成订单",
                        data: { goods_name, goods_price, goods_num, order: orderId }
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

//提交订单
router.post('/commitOrder', (req, resp) => {
    let token = req.headers.token
    jwt.verify(token, global.secretJwt, (err, decoded) => {
        if (decoded) {
            //通过解析token获取用户id
            let userSql = `select id from user where tel = ${decoded.tel}`
            connect.query(userSql, (err, res) => {
                let userId = res[0].id
                let { goodsIdList, orderId } = req.body
                //删除购物车中在订单中的商品
                goodsIdList.forEach(item => {
                    let delCartGoods = `delete from cart where (uid=${userId} and goods_id = ${item})`
                    connect.query(delCartGoods, () => { })
                })
                //修改订单状态为待支付
                let updateOrderSql = `update goods_order set order_status = "2" where (order_id = ${orderId} and uid=${userId})`

                connect.query(updateOrderSql, () => {
                    resp.send({
                        code: 200,
                        success: true,
                        msg: "订单提交成功，正在跳转到支付页面"
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

//支付宝支付
router.post('/aliPay', (req, resp) => {
    let token = req.headers.token
    //获取前端传过来的订单号/商品名称/商品总价
    let { orderId, goodsName, goodsPrice } = req.body
    jwt.verify(token, global.secretJwt, (err, decoded) => {
        if (decoded) {
            //开始对接支付宝API
            const formData = new AlipayFormData();
            // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
            formData.setMethod('get');
            //支付时信息
            formData.addField('bizContent', {
                outTradeNo: orderId,//订单号
                productCode: 'FAST_INSTANT_TRADE_PAY',//写死的
                totalAmount: goodsPrice,//价格
                subject: goodsName,//商品名称
            });
            //支付成功或者失败跳转的链接(前端提前定义好的路由组件)
            formData.addField('returnUrl', 'http://localhost:8080/payment');
            //返回promise
            const result = alipaySdk.exec(
                'alipay.trade.page.pay',
                {},
                { formData: formData },
            );
            //对接支付宝成功，支付宝方返回的数据
            result.then(res => {
                resp.send({
                    code: 200,
                    success: true,
                    msg: '支付中',
                    data: res
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

//获取支付状态同时修改订单状态
router.post('/getPayStatus', (req, resp) => {
    let token = req.headers.token
    //获取前端传过来的数据
    let { out_trade_no, trade_no } = req.body
    jwt.verify(token, global.secretJwt, (err, decoded) => {
        if (decoded) {
            //支付宝配置
            const formData = new AlipayFormData();
            // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
            formData.setMethod('get');
            //支付时信息
            formData.addField('bizContent', {
                out_trade_no,
                trade_no
            });
            //返回promise
            const result = alipaySdk.exec(
                'alipay.trade.query',
                {},
                { formData: formData },
            );
            //后端请求支付宝
            result.then(resData => {
                axios({
                    method: 'GET',
                    url: resData
                }).then(data => {
                    let responseCode = data.data.alipay_trade_query_response;
                    if (responseCode.code == '10000') {
                        switch (responseCode.trade_status) {
                            case 'WAIT_BUYER_PAY':
                                resp.send({
                                    data: {
                                        code: 0,
                                        data: {
                                            msg: '支付宝有交易记录，没付款'
                                        }
                                    }
                                })
                                break;

                            case 'TRADE_CLOSED':
                                resp.send({
                                    data: {
                                        code: 1,
                                        data: {
                                            msg: '交易关闭'
                                        }
                                    }
                                })
                                break;

                            case 'TRADE_FINISHED':
                                //获取用户id
                                connect.query(`select * from user where tel = ${decoded.tel}`, (e, r) => {
                                    //用户id
                                    let userId = r[0].id;
                                    let sql = `update goods_order set order_status = '3' where (uId = ${userId} and order_id = ${out_trade_no})`
                                    //订单的状态修改掉2==》3
                                    connect.query(sql, () => {
                                        resp.send({
                                            data: {
                                                code: 2,
                                                data: {
                                                    msg: '交易完成'
                                                }
                                            }
                                        })
                                    })
                                })
                                break;

                            case 'TRADE_SUCCESS':
                                connect.query(`select * from user where tel = ${decoded.tel}`, (e, r) => {
                                    //用户id
                                    let userId = r[0].id;
                                    let sql = `update goods_order set order_status = '3' where (uId = ${userId} and order_id = ${out_trade_no})`
                                    //订单的状态修改掉2==》3
                                    connect.query(sql, () => {
                                        resp.send({
                                            data: {
                                                code: 2,
                                                data: {
                                                    msg: '交易完成'
                                                }
                                            }
                                        })
                                    })
                                })
                                break;
                        }
                    } else if (responseCode.code == '40004') {
                        resp.send({
                            data: {
                                code: 4,
                                msg: '交易不存在'
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err);
                    resp.send({
                        data: {
                            code: 500,
                            msg: '交易失败',
                            err
                        }
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