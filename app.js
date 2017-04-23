const Koa = require('koa')
const route = require('koa-route')
const app = new Koa()
const views = require('co-views')
const render = views('./view',{
 map: { html: 'ejs'}
})
const koa_static = require('koa-static-server')
const service = require ('./service/webAppService.js')

app.use(koa_static({
 rootDir: './static/',
 rootPath: '/static/',
 maxage: 0
}))

app.use(route.get('/route_test', (ctx, next) => {
 ctx.set('Cache-Control','no-cache')
 ctx.body = 'Hello koa!'
 next()
}))

// app.use(route.get('/ejs_test', (ctx, next) => {	
// 	ctx.set('Cache-Control','no-cache')
// 	return new Promise((resolve, reject) => {
// 		render('test', {title: 'title_test', name: 'sean'}).then(html => {
// 			ctx.body = html
// 			resolve()
// 		})
// 	})
// }))

app.use(route.get('/ejs_test', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = await render('test', {title: 'title_test', name: 'sean'})
}))

app.use(route.get('/api_test', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = service.get_test_data()
}))

// 业务代码

app.use(route.get('/', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = await render('index', {nav: '书城首页'})
}))

app.use(route.get('/rank', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = await render('rank', {nav: '排行榜'})
}))

app.use(route.get('/bookbacket', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = await render('bookbacket')
}))

app.use(route.get('/category', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = await render('category', {nav: '分类'})
}))

app.use(route.get('/female', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = await render('female', {nav: '女生频道'})
}))

app.use(route.get('/male', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = await render('male', {nav: '男生频道'})
}))

const querystring = require('querystring')
app.use(route.get('/book', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  let params = querystring.parse(ctx.req._parsedUrl.parse)
  let bookId = params.id
  ctx.body = await render('book', {nav: '书籍详情', bookId: 'bookId'})
}))

app.use(route.get('/reader', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = await render('reader')
}))

app.use(route.get('/search', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = await render('search', {nav: '搜索'})
}))

app.use(route.get('/ajax/index', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = service.get_index_data()
}))

app.use(route.get('/ajax/rank', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = service.get_rank_data()
}))

app.use(route.get('/ajax/bookbacket', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = service.get_bookbacket_data()
}))

app.use(route.get('/ajax/category', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = service.get_category_data()
}))

app.use(route.get('/ajax/female', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = service.get_female_data()
}))

app.use(route.get('/ajax/male', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = service.get_male_data()
}))

// url query <-> 对象
app.use(route.get('/ajax/book', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  const querystring = require('querystring')
  const params = querystring.parse(ctx.req._parsedUrl.query)
  const id = params.id
  if (!id) {
    id = ''
  }
  ctx.body = service.get_book_data(id)
}))

app.use(route.get('/ajax/chapter', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  ctx.body = service.get_chapter_data()
}))

app.use(route.get('/ajax/chapter_data', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  const querystring = require('querystring')
  const params = querystring.parse(ctx.req._parsedUrl.query)
  const id = params.id
  if (!id) {
    id = ''
  }
  ctx.body = service.get_chapter_content_data(id)
}))

app.use(route.get('/ajax/search', async (ctx, next) => {	
  ctx.set('Cache-Control','no-cache')
  // url query -> 对象
  const querystring = require('querystring')
  const params = querystring.parse(ctx.req._parsedUrl.query)
  const start = params.start
  const end = params.end
  const keyword = params.keyword
  ctx.body = await service.get_search_data(start, end, keyword)
}))

app.listen(30000)
console.log('Koa server is started!')
