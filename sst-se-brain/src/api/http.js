import axios from 'axios';
import config from './config';
import router from '../router';

axios.interceptors.request.use(
	config => {
		if(!sessionStorage.tokenId) {
			sessionStorage.tokenId = '';
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);
//添加一个返回拦截器
axios.interceptors.response.use(function(response) {
	if(response.data.respCode == 'nologin') {
		router.push({
			path: '/login',
			query: {
				redirect: sessionStorage.redirectUrl
			}
		});
		return false;
	}
	return response;
}, function(error) {
	//对返回的错误进行一些处理
	console.info(error);
	return Promise.reject(error);
});

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(config.baseURL + url, {
			params: params
		}, config)
		.then(response => {
			resolve(response.data);
		})
		.catch(err => {
			reject(err)
		})
	})
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(config.baseURL + url, data, config)
		.then(response => {
			resolve(response.data);
		}, err => {
			reject(err)
		})
	})
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.patch(config.baseURL + url, data, config)
		.then(response => {
			resolve(response.data);
		}, err => {
			reject(err)
		})
	})
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(config.baseURL + url, data, config)
		.then(response => {
			resolve(response.data);
		}, err => {
			reject(err)
		})
	})
}