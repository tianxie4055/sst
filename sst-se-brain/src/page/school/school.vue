<template>
	<div class="">
		<header class="head flex-top">
			<hgroup>
				<div class="fl head_left">
					<!--<a href="#" class="btn-fanhui">（返回）</a>-->
				</div>
				<div class="fl head_center">
					<h1 class="head-title1">校&nbsp;&nbsp;园&nbsp;&nbsp;大&nbsp;&nbsp;脑</h1>
					<h2 class="head-title2">{{school.schoolName}}</h2>
				</div>
				<div class="fl head_right"></div>
			</hgroup>
			<nav class="nav">
				<a href="javascript:;" :class="tabActive(index)" @click="tabChange(index)" v-for="(item,index) in tabList" :key="index">{{item.name}}</a>
			</nav>
		</header>

		<swiper :class="{'swiper-no-swiping': swiperNoSwiping}" :options="swiperOption" ref="schoolSwiper">
			<swiper-slide v-for="(item,index) in tabList" :key="index">
				<SchoolInfo :schoolId="schoolId" v-if="item.type=='info' && item.loaded"></SchoolInfo>
				<SchoolHistory :schoolId="schoolId" v-if="item.type=='history' && item.loaded"></SchoolHistory>
				<SchoolCourse :schoolId="schoolId" v-if="item.type=='course' && item.loaded"></SchoolCourse>
				<SchoolTeacher :schoolId="schoolId" v-if="item.type=='teacher' && item.loaded"></SchoolTeacher>
				<SchoolClass :schoolId="schoolId" v-if="item.type=='class' && item.loaded"></SchoolClass>
				<SchoolActivity :schoolId="schoolId" v-if="item.type=='activity' && item.loaded"></SchoolActivity>
				<SchoolPot :schoolId="schoolId" v-if="item.type=='pot' && item.loaded"></SchoolPot>
				<SchoolTeachingComment :schoolId="schoolId" v-if="item.type=='teaching_comment' && item.loaded"></SchoolTeachingComment>
				<SchoolMonitor :schoolId="schoolId" v-if="item.type=='monitor' && item.loaded"></SchoolMonitor>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import SchoolInfo from './info/school-info.vue';
	import SchoolHistory from './history/school-history.vue';
	import SchoolCourse from './course/school-course.vue';
	import SchoolTeacher from './teacher/school-teacher.vue';
	import SchoolClass from './class/school-class.vue';
	import SchoolActivity from './activity/school-activity.vue';
	import SchoolPot from './pot/school-pot.vue';
	import SchoolTeachingComment from './teaching-comment/school-teaching-comment.vue';
	import SchoolMonitor from './monitor/school-monitor.vue';

	export default {
		data() {
			return {
				tabIndex: 0,
				tabList: [
					{
						type: 'info',
						name: '学校',
						loaded: false
					},
					{
						type: 'history',
						name: '校史',
						loaded: false
					},
					{
						type: 'course',
						name: '资源',
						loaded: false
					},
					{
						type: 'teacher',
						name: '教师',
						loaded: false
					},
					{
						type: 'class',
						name: '班级',
						loaded: false
					},
					{
						type: 'activity',
						name: '活动',
						loaded: false
					},
					{
						type: 'pot',
						name: '积分',
						loaded: false
					},
					{
						type: 'teaching_comment',
						name: '评课',
						loaded: false
					},
					{
						type: 'monitor',
						name: '监控',
						loaded: false
					}
				],
				school: {
					schoolName: ''
				},
				swiperOption: {
					allowTouchMove: false
				},
				swiperNoSwiping: this.$api.swiperNoSwiping || false
			}
		},
		components: {
			swiper,
			swiperSlide,
			SchoolInfo,
			SchoolHistory,
			SchoolCourse,
			SchoolTeacher,
			SchoolClass,
			SchoolActivity,
			SchoolPot,
			SchoolTeachingComment,
			SchoolMonitor
		},
		props: {
			schoolId: {
				required: true
			}
		},
		methods: {
			pauseVideo() {
				$('video:visible').each(function(){
					if(!this.paused) {
						this.pause();
					}
				});
				if(null != this.$common.videoPlayer){
					this.$common.videoPlayer.pause();
				}
			},
			tabActive(index) {
				return this.tabIndex == index ? 'active' : '';
			},
			slideChange(index){
				this.tabIndex = index;
				let tab = this.tabList[index];
				if(!tab.loaded) tab.loaded = true;
			},
			tabChange(index) {
				this.swiper.slideTo(index);
				this.slideChange(index);
			},
			schoolInfo() {
				let _this = this;
				this.$fetch(this.$api.url.school.info, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId
				}).then(function(res) {
					if(res.respCode == "success") {
						_this.school = res.data;
						sessionStorage['school'] = JSON.stringify(_this.school);
						_this.tabChange(0);
					}
				}).catch(function(error) {

				});
			}
		},
		computed: {
			swiper() {
				return this.$refs.schoolSwiper.swiper;
			}
		},
		mounted() {
			this.schoolInfo();
		},
		watch: {
			tabIndex: function(val, oldVal){
				if(val != oldVal){
					this.pauseVideo();
				}
			}
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