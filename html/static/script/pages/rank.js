import Vue from 'vue'
import $ from 'jquery'
import '../../css/reset.css'
import '../../css/all.css'
import '../../css/rank.css'

$.get('/ajax/rank', function (d) {
	for (let i = 0; i < d.items.length; i++) {
		d.items[i].description = d.items[i].description.split('\n')
	}
	let windowWidth = $(window).width();
	if (windowWidth < 320) {
		windowWidth = 320
	}
	new Vue ({
		el: '#app',
		data: {
			screen_width: windowWidth,
			items: d.items
		}
	})
}, 'json')