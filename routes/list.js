const express = require('express')
const router = express.Router()

router.get('/', (req, resp) => {
    resp.send({
        code: 200,
        data: [
            {
                //一级
                id: 0,
                name: '推荐',
                data: [
                    {
                        //二级
                        id: 0,
                        name: '推荐',
                        list: [
                            //三级
                            {
                                id: 0,
                                name: '铁观音',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 1,
                                name: '功夫茶具',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 2,
                                name: '茶具电器',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 3,
                                name: '紫砂壶',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 4,
                                name: '龙井',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 5,
                                name: '武夷岩茶',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 6,
                                name: '武夷岩茶',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 7,
                                name: '武夷岩茶',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },

                        ]
                    }
                ]
            },
            {
                //一级
                id: 1,
                name: '绿茶',
                data: [
                    {
                        //二级
                        id: 0,
                        name: '绿茶',
                        list: [
                            //三级
                            {
                                id: 0,
                                name: '龙井',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 1,
                                name: '碧螺春',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 2,
                                name: '雀舌',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 3,
                                name: '安吉白茶',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 4,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 5,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 6,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 7,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                        ]
                    }
                ]
            },
            {
                //一级
                id: 2,
                name: '乌龙',
                data: [
                    {
                        //二级
                        id: 0,
                        name: '乌龙',
                        list: [
                            //三级
                            {
                                id: 0,
                                name: '龙井',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 1,
                                name: '碧螺春',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 2,
                                name: '雀舌',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 3,
                                name: '安吉白茶',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 4,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 5,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 6,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 7,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                        ]
                    }
                ]
            },
            {
                //一级
                id: 3,
                name: '红茶',
                data: [
                    {
                        //二级
                        id: 0,
                        name: '红茶',
                        list: [
                            //三级
                            {
                                id: 0,
                                name: '龙井',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 1,
                                name: '碧螺春',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 2,
                                name: '雀舌',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 3,
                                name: '安吉白茶',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 4,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 5,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 6,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 7,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:300`/images/list1.jpeg'
                            },
                        ]
                    }
                ]
            },
            {
                //一级
                id: 4,
                name: '白茶',
                data: [
                    {
                        //二级
                        id: 0,
                        name: '白茶',
                        list: [
                            //三级
                            {
                                id: 0,
                                name: '龙井',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 1,
                                name: '碧螺春',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 2,
                                name: '雀舌',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 3,
                                name: '安吉白茶',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 4,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 5,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                        ]
                    }
                ]
            },
            {
                //一级
                id: 5,
                name: '普洱',
                data: [
                    {
                        //二级
                        id: 0,
                        name: '普洱',
                        list: [
                            //三级
                            {
                                id: 0,
                                name: '龙井',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 1,
                                name: '碧螺春',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 2,
                                name: '雀舌',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 3,
                                name: '安吉白茶',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 4,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                            {
                                id: 5,
                                name: '六安瓜片',
                                imgUrl: 'http://101.33.249.237:3001/images/list1.jpeg'
                            },
                        ]

                    }
                ]
            }

        ]
    })
})

module.exports = router