import Vue from 'vue'
import $ from 'jquery'
import '../../css/reset.css'
import '../../css/all.css'
import '../../css/channel.css'

let sex = location.href.split('/').pop()
$.get('/ajax/' + sex ,function (d) {
	new Vue ({
		el: '#app',
		data: d
	})
},'json')