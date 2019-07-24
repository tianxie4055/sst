<template>
	<section class="section">
		<keep-alive>
			<SchoolClassList :schoolId="schoolId" @showStudentList="showStudentList" v-if="type=='class'"></SchoolClassList>
			<SchoolClassStudentList :schoolId="schoolId" :classId="classId" v-if="type=='student'"></SchoolClassStudentList>
		</keep-alive>
		<div class="opt-area" v-if="type=='student'">
			<a href="javascript:;" @click="tabChange('class')">返回班级列表</a>
		</div>
	</section>
</template>

<script>
	import SchoolClassList from './school-class-list.vue';
	import SchoolClassStudentList from './school-class-student-list.vue';
	export default {
		data() {
			return{
				type: 'class', // class/student
				classId: null
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		components: {
			SchoolClassList,
			SchoolClassStudentList
		},
		methods: {
			showStudentList(classId){
				this.classId = classId;
				this.type = 'student';
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
	.opt-area{
		position: absolute;
	    bottom: 10px;
	    right: 10px;
	    z-index: 100;
	}
</style>