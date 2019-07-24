import axios from 'axios';
import config from './config';

class API {
	baseURL = config.baseURL
	nginxURL = config.nginxURL
	swiperNoSwiping = config.swiperNoSwiping
	url = {
		login: 'login',
		school: {
			info: 'school/base/info',
			historyList: 'school/base/history',
			subjects: 'school/course/subject/list',
			subjectResource: 'school/course/subject/resource',
			courseList: 'school/course/list',
			courseInfo: 'school/course/info',
			courseInfoElemdist: 'school/course/elemdist',
			courseInfoLessonTop: 'school/course/lesson/top',
			teacherRelative: 'school/teacher/relative',
			teacherRelativeJson: '../../static/json/teacher-relative.json',
			teacherList: 'school/teacher/list',
			classList: 'school/class/list',
			classStudentList: 'school/student/list',
			potScoreCata: 'school/pot/scorecata',
			potTrend: 'school/pot/trend',
			potTotalRank: 'school/pot/total/rank',
			potTeacherRank: 'school/pot/teacher/rank',
			potTask: 'school/pot/task',
			potRule: 'school/pot/rule',
			potRuleJson: '../../static/json/pot-rule.json',
			//potRuleJson: '../../static/json/flare.json',
			potAvgScore: 'school/pot/avgscore',
			activityList: 'school/activity/list',
			activityInfo: 'school/activity/detail',
			activityImageList: 'school/activity/imageVideo/list',
			liveRoomList: 'school/live/room/list',
			teachingCommentDetail: 'school/teaching/comment/detail',
			teachingCommentDetailResult: 'school/teaching/comment/result'
		}
	}
	get = function(url, param){
		return axios.get(this.baseURL + url,{params:param||{}},config);
	}
	post = function(url, param){
		return axios.post(this.baseURL + url,param||{},config);
	}
	hasMore = function(total, pageIndex, pageSize){
		return pageIndex * pageSize < total ? true : false;
	}
	getUrlStr = function(name){
		/**
         * 获取地址栏参数
         */
        let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
        if(reg.test(window.location.href)){
            return unescape(RegExp.$2.replace(/\+/g," "))
        }
        return undefined;
	}
	getUrlArg = function(sHref, sArgName){
		var args = sHref.split("?");
		var retval = "";
		if (args[0] == sHref) /*参数为空*/
		{
			return retval; /*无需做任何处理*/
		}
		var str = args[1];
		args = str.split("&");
		for (var i = 0; i < args.length; i++) {
			str = args[i];
			var arg = str.split("=");
			if (arg.length <= 1)
				continue;
			if (arg[0] == sArgName)
				retval = arg[1];
		}
		return retval;
	}
	changeUrlArg = function(url, arg, val){
		let pattern = arg+'=([^&]*)';
	    let replaceText = arg+'='+val;
	    return url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
	}
	/**
	 * 通过时间字符串获取对应的星期索引 yyyy-MM-dd hh24:mm:ss
	 * @param {Object} dateStr
	 */
	getWeekIndexByTimeStr = function(dateStr){
		dateStr = dateStr.replace(/-/g, '/');
		let date = new Date(dateStr);
		return date.getDay();
	}
	/**
	 * 通过日期字符串获取对应的星期索引 yyyy-MM-dd
	 * @param {Object} dateStr
	 */
	getWeekIndexByDateStr = function(dateStr){
		dateStr = dateStr + "00:00:00";
		return getWeekIndexByTimeStr(dateStr);
	}
	
	getTeacherRelative = function(params = {}){
		let teacherRelativeJson = this.url.school.teacherRelativeJson;
	    return new Promise((resolve, reject) => {
			axios.get(teacherRelativeJson, {
				params: params
			}, config)
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err)
			})
		});
	}
	
	getPotRule = function(params = {}){
		let potRuleJson = this.url.school.potRuleJson;
	    return new Promise((resolve, reject) => {
			axios.get(potRuleJson, {
				params: params
			}, config)
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err)
			})
		});
	}
}

export default API;