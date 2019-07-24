<template>
	<section class="section">
		<keep-alive>
			<SchoolActivityList :schoolId="schoolId" @viewActivity="viewActivity" v-if="type=='list'"></SchoolActivityList>
			<SchoolActivityInfo :schoolId="schoolId" :activityId="activityId" @tabChange="tabChange" v-if="type=='info'"></SchoolActivityInfo>
		</keep-alive>
		<div class="opt-area" v-if="type=='info'">
			<a href="javascript:;" @click="tabChange('list')">返回活动列表</a>
		</div>
	</section>
</template>

<script>
	import SchoolActivityList from './school-activity-list.vue';
	import SchoolActivityInfo from './school-activity-info.vue';
	export default {
		data() {
			return{
				type: 'list', // list/info
				activityId: null
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		components: {
			SchoolActivityList,
			SchoolActivityInfo
		},
		methods: {
			viewActivity(activityId){
				this.activityId = activityId;
				this.type = 'info';
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
	.opt-area {
		position: absolute;
		bottom: 10px;
		right: 10px;
		z-index: 100;
	}
</style>