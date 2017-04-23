const fs = require('fs')
// exports.get_test_data = function () {
// 	const content = fs.readFileSync('./mock/test.json','utf-8')
// 	return content 
// }

exports.get_chapter_data = function () {
	const content = fs.readFileSync('./mock/reader/chapter.json','utf-8')
	return content 
}

exports.get_chapter_content_data = function (id) {
	if (!id) {
		id = "1"
	}
	let content = fs.readFileSync('./mock/reader/data/data' + id + '.json','utf-8')
	return content
}

exports.get_index_data = function () {
	const content = fs.readFileSync('./mock/home.json','utf-8')
	return content 
}

exports.get_book_data = function (id) {
	if (!id) {
		id = "18218"
	}
	if (fs.existsSync('./mock/book/' + id + '.json')) {
		return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8')
	} else {
		return fs.readFileSync('./mock/book/18218.json', 'utf-8')
	}
}

exports.get_rank_data = function () {
	const content = fs.readFileSync('./mock/rank.json','utf-8')
	return content 
}

exports.get_bookbacket_data = function () {
	const content = fs.readFileSync('./mock/bookbacket.json','utf-8')
	return content 
}

exports.get_category_data = function () {
	const content = fs.readFileSync('./mock/category.json','utf-8')
	return content 
}

exports.get_female_data = function () {
	const content = fs.readFileSync('./mock/channel/female.json','utf-8')
	return content 
}

exports.get_male_data = function () {
	const content = fs.readFileSync('./mock/channel/male.json','utf-8')
	return content 
}

exports.get_search_data = (start, end, keyword) => {
	return new Promise(resolve => {
		const http = require('http')
		const qs = require('querystring')
		// {a: '1'} http://127.0.0.1/api?a=1
		const data = {
			s: keyword,
			start,
			end
		}
		const query = qs.stringify(data)
		const http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: `/store/v0/lib/query/onebox?${query}`
		}
		req_obj = http.request(http_request, _res => {
			let content = ''
			_res.setEncoding('utf8')
			_res.on('data', chunk => {
				content += chunk
			})
			_res.on('end', () => {
				resolve(content)
			})
		}) 
		req_obj.on('error', () => {})
		req_obj.end()
	})
}
