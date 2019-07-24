import Qs from 'qs';
export default {
	
//	baseURL: 'http://localhost:9008/',
	baseURL: 'http://112.124.124.4:9008/',
//	baseURL: 'http://10.245.84.110:9008/', // wudu
//	nginxURL: 'http://localhost:9099/',
	nginxURL: 'http://120.55.251.196:7077/',
//	nginxURL: 'http://10.245.84.100/', // wudu

//	swiperNoSwiping: true, // 是否禁止触摸滑动

	method: 'POST',

	transformRequest: [function(data) {
		
		return Qs.stringify(data);
	}],

	transformResponse: [function(data) {
		debugger;
		console.info(data);
		if (typeof data === 'string') {
			return JSON.parse(data);
		}
		return data;
	}],

	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	},

	data: {
		
	},

	timeout: 30000,

	withCredentials: false,

	responseType: 'json'

}