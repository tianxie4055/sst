<template>
	<section class="section">
		<div class="resources-list-box" v-if="type=='list'">
			<div class="resources-list-left">
				<SchoolCourseOverview :schoolId="schoolId" @subjectChange="subjectChange"></SchoolCourseOverview>
			</div>
			<div class="resources-list-right">
				<SchoolCourseList :schoolId="schoolId" :subjectId="subjectId" @viewCourse="viewCourse"></SchoolCourseList>
			</div>
		</div>
		<SchoolCourseInfo :schoolId="schoolId" :courseId="courseId" v-if="type=='info'"></SchoolCourseInfo>
		<div class="opt-area" v-if="type=='info'">
			<a href="javascript:;" @click="tabChange('list')">返回资源列表</a>
		</div>
	</section>
</template>

<script>
	import SchoolCourseOverview from './school-course-overview.vue';
	import SchoolCourseList from './school-course-list.vue';
	import SchoolCourseInfo from './school-course-info.vue';
	export default {
		data() {
			return {
				subjectId: 0,
				courseId: null,
				type: 'list' // list/info
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		components: {
			SchoolCourseOverview,
			SchoolCourseList,
			SchoolCourseInfo
		},
		methods: {
			viewCourse(courseId){
				let _this = this;
				this.courseId = courseId;
				this.type = 'info';
			},
			subjectChange(subjectId){
				this.subjectId = subjectId;
			},
			tabChange(type){
				this.type = type;
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.resources-list-box{
		height: 100%;
	}
	.opt-area{
		position: absolute;
	    bottom: 10px;
	    right: 10px;
	    z-index: 100;
	}
</style>