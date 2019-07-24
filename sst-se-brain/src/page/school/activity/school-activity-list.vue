<template>
	<div>
		<div class="activityTab">
			<a href="javascript:;" :class="tabActive(index)" @click="tabChange(index)" v-for="(item,index) in tabList" :key="index">{{item.name}}</a>
		</div>
		<div class="activityInfo">
			<swiper :options="swiperOption" ref="schoolActivitySwiper">
				<swiper-slide v-for="(item,index) in tabList" :key="index">
					<div class="activity-list-item">
						<swiper class="swiper-activity-sublevel" :options="childSwiperOption" ref="'schoolActivitySwiper_' + index">
							<swiper-slide v-for="(dataItem, dataIndex) in item.list" :key="dataIndex">
								<div @click="viewActivity(dataItem)">
									<div class="activity-img">
										<img :src="dataItem.imageUrl">
									</div>
									<div class="activity-time">{{dataItem.occurTime}}</div>
									<div class="activity-text">
										<div class="introduce" v-html="dataItem.activityTitle"></div>
									</div>
								</div>
							</swiper-slide>
							<!-- <div class="swiper-button-next" slot="button-next"></div>
	    					<div class="swiper-button-prev" slot="button-prev"></div> -->
							<div class="school-class-next icon-button-next" slot="button-next"><i class="iconfont icon-right"></i></div>
							<div class="school-class-prev icon-button-prev" slot="button-prev"><i class="iconfont icon-left"></i></div>
						</swiper>
						<div class="activity-timeline" v-if="null!=item.list && item.list.length>0"></div>
						<div class="swiper-scrollbar"></div>
					</div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		data() {
			let _this = this;
			return {
				tabIndex: 0,
				tabList: [{
						type: 1,
						name: '校级活动',
						loaded: false,
						pageIndex: 1,
						pageSize: 10,
						list: [],
						hasMore: true,
						loading: false,
					},
					{
						type: 2,
						name: '班级活动',
						loaded: false,
						pageIndex: 1,
						pageSize: 10,
						list: [],
						hasMore: true,
						loading: false,
					},
					{
						type: 3,
						name: '家校活动',
						loaded: false,
						pageIndex: 1,
						pageSize: 10,
						list: [],
						hasMore: true,
						loading: false,
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
				childSwiperOption: {
					slidesPerView: 6,
					spaceBetween: 0,
					scrollbar: {
						el: '.swiper-scrollbar'
					},
					navigation: {
				        nextEl: '.icon-button-next',
				        prevEl: '.icon-button-prev',
				    },
					on: {
						reachEnd: function(){
							let tab = _this.tabList[_this.tabIndex];
							if(tab.pageIndex > 1){
								_this.fetchData();
							}
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
			swiper,
			swiperSlide
		},
		methods: {
			tabActive(index) {
				return this.tabIndex == index ? 'active' : '';
			},
			slideChange(index){
				this.tabIndex = index;
				let tab = this.tabList[index];
				if(!tab.loaded) {
					this.fetchData();
				}
			},
			tabChange(index) {
				this.swiper.slideTo(index);
				this.slideChange(index);
			},
			viewActivity(item) {
				this.$emit('viewActivity', item.activityId);
			},
			fetchData() {
				let _this = this;
				let tab = this.tabList[this.tabIndex];
				if(tab.loading || !tab.hasMore) {
					return false;
				}
				tab.loading = true;
				this.$fetch(this.$api.url.school.activityList, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					type: tab.type,
					pageIndex: tab.pageIndex,
					pageSize: tab.pageSize
				}).then(function(res) {
					if(res.respCode == "success") {
						if(res.data.total > 0) {
							tab.pageIndex++;
							tab.list = tab.list.concat(res.data.items);
						}
						tab.hasMore = tab.$api.hasMore(res.data.total, res.data.pageIndex, res.data.pageSize);
						if(!tab.loaded) {
							tab.loaded = true;
						}
					}
					tab.loading = false;
				}).catch(function(error) {
					tab.loading = false;
				});
			}
		},
		computed: {
			swiper() {
				return this.$refs.schoolActivitySwiper.swiper;
			}
		},
		mounted() {
			this.fetchData();
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
	.activity-list-item{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.activity-list-item .swiper-container{
		position: initial;
	}
	.swiper-activity-sublevel{width:90%;}
</style>