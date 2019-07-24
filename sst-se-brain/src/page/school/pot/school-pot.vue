<template>
	<section class="section">
		<div class="monitorTab">
			<a href="javasrcipt:;" :class="tabActive(index)" @click="tabChange(index)" v-for="(item,index) in tabList" :key="index"><i class="iconfont" :class="item.icon"></i><span>{{item.name}}</span></a>
		</div>
		<swiper :options="swiperOption" class="swiper-activity" ref="schoolPotSwiper">
			<swiper-slide v-for="(item,index) in tabList" :key="index">
				<SchoolPotOverview :schoolId="schoolId" :index="index" v-if="item.type=='overview' && item.loaded"></SchoolPotOverview>
				<SchoolPotRule :schoolId="schoolId" :index="index" v-if="item.type=='rule' && item.loaded"></SchoolPotRule>
			</swiper-slide>
		</swiper>
	</section>
</template>

<script>
	import SchoolPotOverview from './school-pot-overview.vue';
	import SchoolPotRule from './school-pot-rule.vue';
	export default {
		data() {
			let _this = this;
			return {
				tabIndex: 0,
				tabList: [
					{
						type: 'overview',
						name: '总览',
						icon: 'icon-shinei',
						loaded: false
					},
					{
						type: 'rule',
						name: '规则',
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
			SchoolPotOverview,
			SchoolPotRule
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
				return this.$refs.schoolPotSwiper.swiper;
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