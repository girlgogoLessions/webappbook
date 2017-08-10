import Vue from 'vue'
import $ from 'jquery'
import '../../css/reset.css'
import '../../css/all.css'

let windowWidth = $(window).width();
if (windowWidth < 320) {
	windowWidth = 320
}
let index_header_tab_width = $('.Swipe-tab').find('a').eq(0).outerWidth()

const vm = new Vue({
	el: '#app',
	data: {
		screen_width: windowWidth,
		double_screen_width: windowWidth*2,
		index_header_tab_width: index_header_tab_width,
		top: [],
		hot: [],
		recommend: [],
		female: [],
		male: [],
		free: [],
		topic: [],
		duration: 0,
		position: '0px',
		header_position: 0,
		header_duration:0,
		tab_1_class: 'Swipe-tab__on',
		tab_2_class: '',
		a: {
			b: 1
		}
	},
	created () {
		$.get('/ajax/index', (d) => {
			this.top = d.items[0].data.data
			this.hot = d.items[1].data.data
			this.recommend = d.items[2].data.data
			this.female = d.items[3].data.data
			this.male = d.items[4].data.data
			this.free = d.items[5].data.data
		},'json')
	},
	methods: {
		tabSwitch: function (pos) {
			this.duration = 0.5
			this.header_duration = 0.5
			if (pos == 0) {
				this.position = 0
				this.header_position = 0
				this.tab_1_class = 'Swipe-tab__on'
				this.tab_2_class = ''
			} else {
				this.position = '-50%'
				this.header_position = index_header_tab_width
				this.tab_2_class = 'Swipe-tab__on'
				this.tab_1_class = ''
			}
		}
	}
})

