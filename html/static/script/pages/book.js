import Vue from 'vue'
import $ from 'jquery'
import '../../css/reset.css'
import '../../css/all.css'

let id = location.href.split('?id=').pop()
$.get('/ajax/book?id=' + id, function (d) {
	let windowWidth = $(window).width();
	if (windowWidth < 320) {
		windowWidth = 320
	}
	new Vue({
		el:'#app',
		data: {
			screen_width: windowWidth,
			item: d.item,
			author_books: d.author_books,
			related: d.related
		},
		methods: {
			readBook: function () {
				location.href = "/reader"
			}
		}
	})
}, 'json')