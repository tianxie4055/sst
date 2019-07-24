<template>
	<section class="section">
		<div class="monitorTab">
			<a href="javasrcipt:;" :class="tabActive(index)" @click="tabChange(index)" v-for="(item,index) in tabList" :key="index"><i class="iconfont" :class="item.icon"></i><span>{{item.name}}</span></a>
		</div>
		<swiper :options="swiperOption" class="swiper-monitor" ref="schoolMonitorSwiper">
			<swiper-slide v-for="(item,index) in tabList" :key="index">
				<SchoolMonitorList :schoolId="schoolId" :index="index" :type="item.type" @viewMonitor="viewMonitor" v-if="item.loaded"></SchoolMonitorList>
			</swiper-slide>
		</swiper>
		<element-video-dialog
			:show.sync="dialogOption.show"
			:title="dialogOption.title"
			:videoSrc="dialogOption.url"
			:videoType="dialogOption.videoType"
			:techOrder="dialogOption.techOrder">
		</element-video-dialog>
	</section>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import SchoolMonitorList from './school-monitor-list.vue';
	export default {
		data() {
			let _this = this;
			return {
				tabIndex: 0,
				tabList: [
					{
						type: 1,
						name: '教室',
						icon: 'icon-shinei',
						loaded: false
					},
					{
						type: 2,
						name: '户外',
						icon: 'icon-huwai',
						loaded: false
					}
				],
				swiperOption: {
					direction: 'vertical',
					on: {
						slidePrevTransitionEnd: function(){
							_this.slideChange(this.activeIndex);
						},
						slideNextTransitionEnd: function(){
							_this.slideChange(this.activeIndex);
						}
					}
				},
				dialogOption: {
					title: '',
					url: '',
					videoType: 'rtmp/flv',
					techOrder: ['flash'],
					show: false
				}
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		components: {
			swiper,
			swiperSlide,
			SchoolMonitorList
		},
		methods: {
			viewMonitor(item){
				this.dialogOption.title = item.title;
				this.dialogOption.url = item.url;
				this.dialogOption.show = true;
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
			}
		},
		computed: {
			swiper() {
				return this.$refs.schoolMonitorSwiper.swiper;
			}
		},
		mounted() {
			this.tabChange(0);
		}
	}
</script>

<style scoped>
	.swiper-container {
		width: 100%;
		height: 100%;
	}
	
	.swiper-slide {
		overflow: hidden;
	}
</style>