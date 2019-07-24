import API from './API';
const api = new API();
import mockConst from './mock-const.js';

var Mock = require('mockjs');

/**
 * 登录
 */
Mock.mock(mockConst.getRegExpUrl(api.url.login), 'post', {
	"respCode": "success",
	"respDesc": "成功",
	"data": {
		"tokenId": "SE-BRAIN-893044488eef88889effefef",
		"nickName": "陈校长",
		"schoolId": 7
	}
});

/**
 * 学校-学校信息
 */
Mock.mock(mockConst.getRegExpUrl(api.url.school.info), 'get', {
    "respCode": "success",
    "respDesc": "成功",
    "data": {
        "schoolRunningIdea": "让每一个孩子享受最朴实的现代教育",
        "schoolDevelopmentGoal": "营造朴真校园 涵养朴美教师 培养朴雅学生",
        "description": "五都小学位于庆元县松源街道五都村，是县新经济商贸开发区、香菇小镇的核心区、工业园区、全国最大的香菇买卖集散地所在。学校生源主要来自同德新村、同心新村、香菇市场小区、五都村本部等共计二万多户人家。学校占地40409.04㎡、建筑面积25518.36 ㎡、绿化面积14143.6 ㎡；现有教学楼3幢、行政楼1幢、专业教学楼1幢、师生食堂1幢、学生宿舍2幢、环形300米田径场、4个室外篮球场、1个风雨操场、1个门球场。",
        "schoolRunningVision": "“环境一流、管理科学、内涵丰富、特色鲜明，师生健康成长” 区域现代化示范小学。",
        "schoolName": "五都小学",
        "schoolRunningMission": "践行朴素教育 奠基幸福人生",
        "imageVideos": [
	        {
	            "type": "image",
	            "url": mockConst.getNginxUrl("seuc/upfile/img/nature1.jpg")
	        },
	        {
	            "bgImg": mockConst.getNginxUrl("seuc/upfile/img/nature2.jpg"),
	            "type": "video",
	            "url": mockConst.getNginxUrl("seuc/upfile/haomei.mp4")
	        },
	        {
	            "type": "image",
	            "url": mockConst.getNginxUrl("seuc/upfile/img/nature3.jpg")
	        },
	        {
	            "type": "image",
	            "url": mockConst.getNginxUrl("seuc/upfile/img/nature4.jpg")
	        },
	        {
	            "type": "image",
	            "url": mockConst.getNginxUrl("seuc/upfile/img/nature5.jpg")
	        },
	        {
	            "type": "image",
	            "url": mockConst.getNginxUrl("seuc/upfile/img/nature6.jpg")
	        },
	        {
	            "type": "image",
	            "url": mockConst.getNginxUrl("seuc/upfile/img/nature7.jpg")
	        },
	        {
	            "type": "image",
	            "url": mockConst.getNginxUrl("seuc/upfile/img/nature8.jpg")
	        },
	        {
	            "type": "image",
	            "url": mockConst.getNginxUrl("seuc/upfile/img/nature9.jpg")
	        },
	        {
	            "type": "image",
	            "url": mockConst.getNginxUrl("seuc/upfile/img/nature10.jpg")
	        }
        ]
    }
});


/**
 * 学校-学校校史列表
 */
Mock.mock(mockConst.getRegExpUrl(api.url.school.historyList), 'get', function(options){
	let pageIndex = api.getUrlArg(options.url, 'pageIndex');
	let pageSize = api.getUrlArg(options.url, 'pageSize');
	let total = 12;
	let list = [];
	let firstIndex = (pageIndex - 1) * pageSize + 1;
	if(firstIndex >= total){
		return {
			"respCode": "success",
		    "respDesc": "成功",
		    "data": {
		        "total": total,
		        "pageIndex": pageIndex,
		        "pageSize": pageSize,
		        "items": list
		    }
		};
	}
	let listSize = pageIndex * pageSize <= total ? pageSize : total % pageSize;
	let historyImgArr = [
		mockConst.getNginxUrl("seuc/upfile/history_1.jpg"),
		mockConst.getNginxUrl("seuc/upfile/history_2.jpg"),
		mockConst.getNginxUrl("seuc/upfile/history_3.jpg")
	];
	let min = 0, max = historyImgArr.length - 1;
	for(let i=0; i<listSize; i++){
		list.push(Mock.mock({
			"id": function(){
				return firstIndex + i;
			},
    		"imageurl": function(){
				let index = Math.floor(Math.random()*(max-min+1)+min);
    			return historyImgArr[index];
    		},
    		"title": "民国二年广福寺为址设小学，距今有103年",
    		"occurTime": function(){
    			let min = 1913, max = 2018;
				let index = Math.floor(Math.random()*(max-min+1)+min);
    			return index + "年";
    		}
		}));
	}
	return {
	    "respCode": "success",
	    "respDesc": "成功",
	    "data": {
	        "total": total,
	        "pageIndex": pageIndex,
	        "pageSize": pageSize,
	        "items": list
	    }
	};
});

/**
 * 学校-学校活动列表
 */
Mock.mock(mockConst.getRegExpUrl(api.url.school.activityList), 'get', function(options){
	let pageIndex = api.getUrlArg(options.url, 'pageIndex');
	let pageSize = api.getUrlArg(options.url, 'pageSize');
	let activityType = api.getUrlArg(options.url, 'type');
	let total = 12;
	let list = [];
	let firstIndex = (pageIndex - 1) * pageSize + 1;
	if(firstIndex >= total){
		return {
			"respCode": "success",
		    "respDesc": "成功",
		    "data": {
		        "total": total,
		        "pageIndex": pageIndex,
		        "pageSize": pageSize,
		        "items": list
		    }
		};
	}
	let listSize = pageIndex * pageSize <= total ? pageSize : total % pageSize;
	let historyImgArr = [
		mockConst.getNginxUrl("seuc/upfile/history_1.jpg"),
		mockConst.getNginxUrl("seuc/upfile/history_2.jpg"),
		mockConst.getNginxUrl("seuc/upfile/history_3.jpg")
	];
	let min = 0, max = historyImgArr.length - 1;
	for(let i=0; i<listSize; i++){
		list.push(Mock.mock({
			"activityId": function(){
				return firstIndex + i;
			},
			"activityType": activityType,
    		"imageUrl": function(){
				let index = Math.floor(Math.random()*(max-min+1)+min);
    			return historyImgArr[index];
    		},
    		"activityTitle": "民国二年广福寺为址设小学，距今有103年",
    		"occurTime": "2018.10.20"
		}));
	}
	return {
	    "respCode": "success",
	    "respDesc": "成功",
	    "data": {
	        "total": total,
	        "pageIndex": pageIndex,
	        "pageSize": pageSize,
	        "items": list
	    }
	};
});

/**
 * 学校-学校活动详情
 */
Mock.mock(mockConst.getRegExpUrl(api.url.school.activityInfo), 'get', function(options){
	let activityId = api.getUrlArg(options.url, 'activityId');
	return {
	    "respCode": "success",
	    "respDesc": "成功",
	    "data": {
	        "activityId": activityId,
	        "activityTitle": "亲子活动",
	        "imageUrl": mockConst.getNginxUrl("seuc/upfile/history_1.jpg"),
	        "occurTime": "2018-11-01 10:00-2018-11-01 12:00",
	        "address": "五都小学风雨操场",
	        "linkPerson": "刘老师",
	        "linkPhone": "13800091012",
	        "registrationNum": 1,
	        "summary": "本次活动的展开主要是为了培养学生和家长之间的合作。"
	        
	    }
	};
});

/**
 * 学校-学校活动详情图片列表
 */
Mock.mock(mockConst.getRegExpUrl(api.url.school.activityImageList), 'get', function(options){
	let activityId = api.getUrlArg(options.url, 'activityId');
	let pageIndex = api.getUrlArg(options.url, 'pageIndex');
	let pageSize = api.getUrlArg(options.url, 'pageSize');
	let total = 22;
	let list = [];
	let firstIndex = (pageIndex - 1) * pageSize + 1;
	if(firstIndex >= total){
		return {
			"respCode": "success",
		    "respDesc": "成功",
		    "data": {
		        "total": total,
		        "pageIndex": pageIndex,
		        "pageSize": pageSize,
		        "items": list
		    }
		};
	}
	let listSize = pageIndex * pageSize <= total ? pageSize : total % pageSize;
	let imageArr = [
		mockConst.getNginxUrl("seuc/upfile/img/nature1.jpg"),
		mockConst.getNginxUrl("seuc/upfile/img/nature2.jpg"),
		mockConst.getNginxUrl("seuc/upfile/img/nature3.jpg"),
		mockConst.getNginxUrl("seuc/upfile/img/nature4.jpg"),
		mockConst.getNginxUrl("seuc/upfile/img/nature5.jpg"),
		mockConst.getNginxUrl("seuc/upfile/img/nature6.jpg"),
		mockConst.getNginxUrl("seuc/upfile/img/nature7.jpg"),
		mockConst.getNginxUrl("seuc/upfile/img/nature8.jpg"),
		mockConst.getNginxUrl("seuc/upfile/img/nature9.jpg"),
		mockConst.getNginxUrl("seuc/upfile/img/nature10.jpg")
	];
	var videoArr = [
		mockConst.getNginxUrl("seuc/upfile/haomei.mp4"),
		mockConst.getNginxUrl("seuc/upfile/20160525003704-78048a.mp4")
	];
	let typeArr = ["image", "video"];
	let min = 0, max = 0;
	for(let i=0; i<listSize; i++){
		max = typeArr.length - 1;
		let typeIndex = Math.floor(Math.random()*(max-min+1)+min);
		let type = typeArr[typeIndex];
		list.push(Mock.mock({
			"type": type,
			"url": function(){
				if(type == 'video'){
					max = videoArr.length - 1;
					let index = Math.floor(Math.random()*(max-min+1)+min);
    				return videoArr[index];
				}
				max = imageArr.length - 1;
				let index = Math.floor(Math.random()*(max-min+1)+min);
				return imageArr[index];
				
    		},
    		"bgImg": function(){
    			if(type == 'image'){
    				return "";
				}
				max = imageArr.length - 1;
				let index = Math.floor(Math.random()*(max-min+1)+min);
    			return imageArr[index];
    		}
		}));
	}
	return {
	    "respCode": "success",
	    "respDesc": "成功",
	    "data": {
	        "total": total,
	        "pageIndex": pageIndex,
	        "pageSize": pageSize,
	        "items": list
	    }
	};
});