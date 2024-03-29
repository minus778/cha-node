const express = require('express')
const router = express.Router()

//首页头部切换导航栏数据
router.get('/topMes', (req, resp) => {
    resp.send({
        code: 200,
        data: [
            { id: 0, label: '推荐' },
            { id: 1, label: '大红袍' },
            { id: 2, label: '铁观音' },
            { id: 3, label: '绿茶' },
            { id: 4, label: '普洱' },
            { id: 5, label: '茶具' },
            { id: 6, label: '花茶' },
        ],

    })
})
//首页推荐的数据
router.get('/index_list/0/data/1', (req, resp) => {
    resp.send({
        code: 200,
        data: [
            //swiper轮播图数据
            {
                id: 0,
                type: 'swiperList',
                data: [
                    { id: 0, imgUrl: 'http://101.33.249.237:3001/images/swiper1.jpeg' },
                    { id: 1, imgUrl: 'http://101.33.249.237:3001/images/swiper2.jpeg' },
                    { id: 3, imgUrl: 'http://101.33.249.237:3001/images/swiper3.jpeg' }
                ]
            },
            //icons图标数据
            {
                id: 1,
                type: 'iconsList',
                data: [
                    {
                        id: 1,
                        title: '自饮茶',
                        imgUrl: 'http://101.33.249.237:3001/images/icons1.png'
                    },
                    {
                        id: 2,
                        title: '茶具',
                        imgUrl: 'http://101.33.249.237:3001/images/icons2.png'
                    },
                    {
                        id: 3,
                        title: '茶礼盒',
                        imgUrl: 'http://101.33.249.237:3001/images/icons3.png'
                    },
                    {
                        id: 4,
                        title: '领福利',
                        imgUrl: 'http://101.33.249.237:3001/images/icons4.png'
                    },
                    {
                        id: 5,
                        title: '官方验证',
                        imgUrl: 'http://101.33.249.237:3001/images/icons5.png'
                    }
                ]
            },
            //爆款推荐
            {
                id: 2,
                type: 'recommendList',
                data: [
                    {
                        id: 1,
                        name: '龙井1號铁罐250g',
                        content: '鲜爽甘醇 口粮首选',
                        price: '68',
                        imgUrl: 'http://101.33.249.237:3001/images/recommend.jpeg'
                    },
                    {
                        id: 2,
                        name: '龙井1號铁罐250g',
                        content: '鲜爽甘醇 口粮首选',
                        price: '68',
                        imgUrl: 'http://101.33.249.237:3001/images/recommend.jpeg'
                    }
                ]
            },
            //猜你喜欢
            {
                id: 3,
                type: 'likeList',
                data: [
                    {
                        id: 1,
                        imgUrl: 'http://101.33.249.237:3001/images/goods1.jpg',
                        name: '赛事茶-第三届武夷山茶叶交易会暨仙店杯-优质奖肉桂160g',
                        price: 238
                    },
                    {
                        id: 2,
                        imgUrl: 'http://101.33.249.237:3001/images/goods2.jpg',
                        name: '茶具-中式陶瓷茶叶罐 2色可选',
                        price: 26
                    },
                    {
                        id: 3,
                        imgUrl: 'http://101.33.249.237:3001/images/goods3.jpg',
                        name: '绿茶  远致龙井3号 150g 清爽甘醇',
                        price: 118
                    },
                    {
                        id: 4,
                        imgUrl: 'http://101.33.249.237:3001/images/goods4.jpg',
                        name: '明前春茶 绿茶 龙井破春系列80g罐装',
                        price: 98
                    },
                    {
                        id: 5,
                        imgUrl: 'http://101.33.249.237:3001/images/like.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    },
                    {
                        id: 6,
                        imgUrl: 'http://101.33.249.237:3001/images/like.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    },
                    {
                        id: 7,
                        imgUrl: 'http://101.33.249.237:3001/images/like2.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    },
                    {
                        id: 8,
                        imgUrl: 'http://101.33.249.237:3001/images/like3.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    },
                    {
                        id: 9,
                        imgUrl: 'http://101.33.249.237:3001/images/like2.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    },
                    {
                        id: 10,
                        imgUrl: 'http://101.33.249.237:3001/images/like3.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    },
                ]
            }

        ]
    })
});
//首页大红袍的数据
router.get('/index_list/1/data/1', (req, resp) => {
    resp.send({
        code: 200,
        data: [
            {
                id: 1,
                type: 'adList',
                data: [
                    {
                        id: 1,
                        imgUrl: 'http://101.33.249.237:3001/images/dhp.jpeg'
                    },
                    {
                        id: 2,
                        imgUrl: 'http://101.33.249.237:3001/images/dhp.jpeg'
                    }
                ]
            },
            {
                id: 2,
                type: 'likeList',
                data: [
                    {
                        id: 1,
                        imgUrl: 'http://101.33.249.237:3001/images/like.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    },
                    {
                        id: 2,
                        imgUrl: 'http://101.33.249.237:3001/images/like.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    },
                    {
                        id: 3,
                        imgUrl: 'http://101.33.249.237:3001/images/like.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    }
                ]
            }

        ]
    })
})
//首页铁观音的数据
router.get('/index_list/2/data/1', (req, resp) => {
    resp.send({
        code: 200,
        data: [
            {
                id: 1,
                type: 'adList',
                data: [
                    {
                        id: 1,
                        imgUrl: 'http://101.33.249.237:3001/images/tgy.jpeg'
                    },
                    {
                        id: 2,
                        imgUrl: 'http://101.33.249.237:3001/images/tgy.jpeg'
                    }
                ]
            },
            {
                id: 2,
                type: 'iconsList',
                data: [
                    {
                        id: 1,
                        title: '自饮茶',
                        imgUrl: 'http://101.33.249.237:3001/images/icons1.png'
                    },
                    {
                        id: 2,
                        title: '茶具',
                        imgUrl: 'http://101.33.249.237:3001/images/icons2.png'
                    },
                    {
                        id: 3,
                        title: '茶礼盒',
                        imgUrl: 'http://101.33.249.237:3001/images/icons3.png'
                    },
                    {
                        id: 4,
                        title: '领福利',
                        imgUrl: 'http://101.33.249.237:3001/images/icons4.png'
                    },
                    {
                        id: 5,
                        title: '官方验证',
                        imgUrl: 'http://101.33.249.237:3001/images/icons5.png'
                    }
                ]
            },
            {
                id: 3,
                type: 'likeList',
                data: [
                    {
                        id: 1,
                        imgUrl: 'http://101.33.249.237:3001/images/like.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    },
                    {
                        id: 2,
                        imgUrl: 'http://101.33.249.237:3001/images/like.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    },
                    {
                        id: 3,
                        imgUrl: 'http://101.33.249.237:3001/images/like.jpeg',
                        name: '建盏茶具套装 红色芝麻毫 12件套',
                        price: 299
                    }
                ]
            }

        ]
    })
})

module.exports = router;