import API from './API';
const api = new API();
const getRegExpUrl = function(relativeUrl){
	return RegExp(api.baseURL + relativeUrl + ".*")
}

const getNginxUrl = function(relativeUrl){
	return api.nginxURL + relativeUrl;
}

const courseList = [
	{
		id: 11,
		name: '一年级语文（上）'
	},
	{
		id: 12,
		name: '一年级语文（下）'
	},
	{
		id: 16,
		name: '二年级语文（上）'
	},
	{
		id: 17,
		name: '二年级语文（下）'
	},
	{
		id: 18,
		name: '三年级语文（上）'
	},
	{
		id: 19,
		name: '三年级语文（下）'
	},
	{
		id: 20,
		name: '四年级语文（上）'
	},
	{
		id: 21,
		name: '四年级语文（下）'
	},
	{
		id: 22,
		name: '五年级语文（上）'
	},
	{
		id: 23,
		name: '五年级语文（下）'
	},
	{
		id: 24,
		name: '六年级语文（上）'
	},
	{
		id: 25,
		name: '六年级语文（下）'
	},
	{
		id: 26,
		name: '一年级数学（上）'
	},
	{
		id: 27,
		name: '一年级数学（下）'
	}
];
const subjectArray = [
	{
		"subjectId": "14",
		"subjectName": "语文",
		"subjectIcon": getNginxUrl("serc/subject/subject_iconpic_7bd4aa8c.png")
	},
	{
		"subjectId": "15",
		"subjectName": "数学",
		"subjectIcon": getNginxUrl("serc/subject/subject_iconpic_c4ddf900.png")
	},
	{
		"subjectId": "16",
		"subjectName": "英语",
		"subjectIcon": getNginxUrl("serc/subject/subject_iconpic_e5f4ccb9.png")
	},
	{
		"subjectId": "17",
		"subjectName": "美术",
		"subjectIcon": getNginxUrl("serc/subject/subject_iconpic_cc85af7f.png")
	},
	{
		"subjectId": "18",
		"subjectName": "音乐",
		"subjectIcon": getNginxUrl("serc/subject/subject_iconpic_d201aa07.png")
	},
	{
		"subjectId": "21",
		"subjectName": "科学",
		"subjectIcon": getNginxUrl("serc/subject/subject_iconpic_bcf36110.png")
	}
];

const catas = ["日常", "资源", "荣誉", "考勤", "课堂"];
const teacherVacationType = {
	"0": "出勤",
	"1": "公差",
	"2": "事假",
	"3": "病假",
	"4": "产假",
	"5": "婚假",
	"6": "丧假",
	"7": "护理假"
};
const studentVacationType = {
	"2": "事假",
	"3": "病假"
};

const subjectResourceTypes = ['自建','之江汇','希沃'];
export default {
	getRegExpUrl,
	getNginxUrl,
	courseList,
	subjectArray,
	catas,
	teacherVacationType,
	studentVacationType,
	subjectResourceTypes,
	isStatic: {
		login: true,
		schoolInfo: false,
		schoolHistoryList: false,
		schoolSubjects: false,
		schoolSubjectResource: false,
		schoolCourseList: false,
		schoolTeacherList: false,
		schoolActivityList: false,
		schoolActivityInfo: false,
		schoolActivityImageList: false
	}
}