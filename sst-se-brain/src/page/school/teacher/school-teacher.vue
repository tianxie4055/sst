<template>
	<section class="section">
		<div class="monitorTab">
			<a href="javasrcipt:;" :class="tabActive(index)" @click="tabChange(index)" v-for="(item,index) in tabList" :key="index"><i class="iconfont" :class="item.icon"></i><span>{{item.name}}</span></a>
		</div>
		<swiper :options="swiperOption" class="swiper-activity" ref="schoolTeacherSwiper">
			<swiper-slide v-for="(item,index) in tabList" :key="index">
				<SchoolTeacherRelation :schoolId="schoolId" v-if="item.type=='rela' && item.loaded"></SchoolTeacherRelation>
				<SchoolTeacherList :schoolId="schoolId" v-if="item.type=='list' && item.loaded"></SchoolTeacherList>
			</swiper-slide>
		</swiper>
	</section>
</template>

<script>
	import SchoolTeacherRelation from './school-teacher-relation.vue';
	import SchoolTeacherList from './school-teacher-list.vue';
	export default {
		data() {
			let _this = this;
			return {
				tabIndex: 0,
				tabList: [
					{
						type: 'rela',
						name: '总览',
						icon: 'icon-shinei',
						loaded: false
					},
					{
						type: 'list',
						name: '列表',
						icon: 'icon-huwai',
						loaded: false
					}
				],
				swiperOption: {
					direction: 'vertical',
					allowTouchMove: false,
					on: {
						slidePrevTransitionEnd: function(){
							_this.slideChange(this.activeIndex);
						},
						slideNextTransitionEnd: function(){
							_this.slideChange(this.activeIndex);
						}
					}
				}
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		components: {
			SchoolTeacherRelation,
			SchoolTeacherList
		},
		methods: {
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
				return this.$refs.schoolTeacherSwiper.swiper;
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