const host = '/api';

const tickethost = '/schedule';

// http://aura.maizuo.com/api/ad/list
const shop = '/ad';

const category = '/category';

// http://m.maizuo.com/act/active/api/active-detail?cityId=10&id=1191
const act = '/act/active/api/active-detail';

/**
 * 根据请求的时间戳获取banner列表
 */
const banner = '/billboard/home?__t=' + new Date()*1;

// 获取首页热映电影
const nowplaying = '/film/now-playing?_t=' + new Date()*1 +'&page=1&count=5';

// 获取首页即将上映电影
const coming = '/film/coming-soon?__t=' + new Date()*1 +'&page=1&count=3';

// 根据id获取相关影片信息
const filmdetail = (id) => host +'/film/' + id + '?__t=' + new Date()*1;

// 获取热映列表
const nowplaylist = (page) => host +'/film/now-playing?page=' + page + '&count=10';

// 获取即将上映列表
const cominglist = (page) => host + '/film/coming-soon?page=' + page +'&count=10';

// 获取全部影院
const cinemalist = host + '/cinema?__t=' + new Date()*1;

// 根据影片id获取相关影院
const cinemalistById = (id) => host + '/film/' + id + '/cinema?__t=' + new Date()*1;

// 根据id获取影院详情
const cinemadetail = (id) => host + '/cinema/' + id; 

// 获取全国城市列表
const citylist = host + '/city?__t=' + new Date()*1;

// 获取演出列表
const ticketlist = (pageNo) => tickethost + '?__t=' + new Date()*1 + '&pageSize=6&pageNumber='+ pageNo +'&sortKey=sortSalesCount&sortType=desc&isMultiSku=1';

// 演出详情
const ticketdetail = (id) => tickethost + '/' + id + '?__t=' + new Date()*1;

// 演出详情的一些图片
const ticketdescription = (id) => tickethost + '/' + id + '/description?__t=' + new Date()*1;

// 卖座商城
const shopApi = shop + '/list';

// 卖座商城分类
//http://aura.maizuo.com/api/category?id=8
//http://aura.maizuo.com/api/category/items?id=8&page=1&num=20
const categorydetail = (id) => category + '?id=' + id;

const categoryitems = (id, page, num) => category + '/items?id=' + id + '&page=' + page + '&num=' + num;

// http://m.maizuo.com/act/active/api/active-detail?cityId=10&id=1191
//http://m.maizuo.com/act/active/api/active-detail?cityId=11&id=1190
const active = (id) => act + '?cityId=10&id=' + id;

//http://aura.maizuo.com/api/active?id=14&page=1&pageSize=30
const activing = (id, page, pageSize) => '/active?id=' + id + '&page=' + page + '&pageSize=' + pageSize;

// 好货精选
// http://aura.maizuo.com/api/recommend/home?page=1&num=20
const recommend = (page, num) => '/recommend/home?page=' + page + '&num=' + num;

// 商品描述图片
// http://aura.maizuo.com/api/item/desc?id=138
const shopdesc = (id) => '/item/desc?id=' + id;

// 商品详情
// http://aura.maizuo.com/api/item?id=138
const shopdetail = (id) => '/item?id=' + id;

export default {
    bannerApi: host + banner,
    nowplayingApi: host + nowplaying,
    comingApi: host + coming,
    filmdetail,
    nowplaylist,
    cominglist,
    cinemalist,
    cinemadetail,
    cinemalistById,
    citylist,
    ticketlist,
    ticketdetail,
    ticketdescription,
    shopApi,
    categorydetail,
    categoryitems,
    active,
    activing,
    recommend,
    shopdesc,
    shopdetail
}