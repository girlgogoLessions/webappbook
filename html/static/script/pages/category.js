import Vue from 'vue'
import $ from 'jquery'
import '../../css/reset.css'
import '../../css/all.css'
import '../../css/category.css'

$.get('/ajax/category', function (d) {
	let windowWidth = $(window).width();
	if (windowWidth < 320) {
		windowWidth = 320
	}
	new Vue ({
		el: '#app',
		data: {
			screen_width: windowWidth,
			male: d.male,
			female: d.female
		}
	})
}, 'json')