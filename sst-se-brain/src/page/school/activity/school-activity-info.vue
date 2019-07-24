<template>
	<div class="activity-info-box">
		<div class="activity-info-left">
			<div class="actvIL">
				<div class="actvIL-img"><img :src="activity.imageUrl==''?defaultImg:activity.imageUrl"></div>
				<h1>{{activity.activityTitle}}</h1>
				<div class="actvILenrolment"><label>报名人数</label><span>{{activity.registrationNum}}人</span></div>
				<ul>
					<li><label>时间</label><span>{{activity.occurTime}}</span></li>
					<li><label>地点</label><span>{{activity.address}}</span></li>
					<li><label>联系人</label><span>{{activity.linkPerson}}</span></li>
					<li><label>联系电话</label><span>{{activity.linkPhone}}</span></li>
					<li><label>活动详情</label><span v-html="activity.summary"></span></li>
				</ul>
			</div>
		</div>
		<div class="activity-info-right">
			<swiper :options="swiperOption" class="swiper-actvIR" ref="schoolActivityInfoSwiper" v-if="null!=images && images.length>0">
				<swiper-slide v-for="(item,index) in images" :key="index">
					<ul class="actvIR-imgbox">
						<li v-for="(dataItem,dataIndex) in item.items" :key="dataIndex">
							<div class="actvIR-img">
								<img :src="dataItem.url" v-if="dataItem.type=='image'">
								<video :id="dataItem.fileId" class="video-js" controls preload :poster="dataItem.bgImg" @play="pauseVideo(dataItem.fileId)" v-if="dataItem.type=='video'">
									<source :src="dataItem.url" type="video/mp4">
								</video>
							</div>
						</li>
					</ul>
				</swiper-slide>
				<div class="swiper-pagination page-turner activity-info-pager" slot="pagination"></div>
			</swiper>
			<div class="school-class-next icon-button-next" slot="button-next" v-if="null!=images && images.length>0"><i class="iconfont icon-right"></i></div>
			<div class="school-class-prev icon-button-prev" slot="button-prev" v-if="null!=images && images.length>0"><i class="iconfont icon-left"></i></div>
				<!-- <div class="swiper-button-next" slot="button-next"></div>
    			<div class="swiper-button-prev" slot="button-prev"></div> -->
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		data() {
			let _this = this;
			return {
				activity: {},
				pageIndex: 1,
				pageSize: 9,
				loading: false,
				pagerRendered: false,
				images: [],
				swiperOption: {
					observer: true,
					observeParents: true,
					pagination: {
						el: '.activity-info-pager',
						clickable: true,
						renderBullet: function(index, className) {
							return '<span class="' + className + '">' + (index + 1) + '</span>';
						}
					},
					navigation: {
				        nextEl: '.school-class-next',
				        prevEl: '.school-class-prev',
				    },
					on: {
						slidePrevTransitionEnd: function() {
							_this.slideChange(this.activeIndex);
						},
						slideNextTransitionEnd: function() {
							_this.slideChange(this.activeIndex);
						}
					}
				}
			}
		},
		props: {
			schoolId: {
				required: true
			},
			activityId: {
				required: true
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		methods: {
			backup() {
				this.$emit('tabChange', 'list');
			},
			pauseVideo(videoId) {
				let videoArr = document.getElementsByTagName('VIDEO');
				if(null != videoArr && videoArr.length > 0) {
					for(let i = 0; i < videoArr.length; i++) {
						if(null == videoId){
							if(!videoArr[i].paused) {
								videoArr[i].pause();
							}
						}else{
							if(videoArr[i].id != videoId && !videoArr[i].paused) {
								videoArr[i].pause();
							}
						}
					};
				}
			},
			slideChange(index) {
				if(null == this.images || this.images.length == 0) {
					return false;
				}
				this.pauseVideo();
				let tab = this.images[index];
				if(null != tab && tab.loaded) {
					return false;
				}
				this.pageIndex = index + 1;
				this.getActivityImageList();
			},
			resetSearch() {
				this.activity = {};
				this.pageIndex = 1;
				this.loading = false;
				this.pagerRendered = false;
				this.images = [];
			},
			getActivityInfo() {
				let _this = this;
				this.$fetch(this.$api.url.school.activityInfo, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					activityId: this.activityId
				}).then(function(res) {
					if(res.respCode == "success") {
						_this.activity = res.data;
					}
				}).catch(function(error) {

				});
			},
			getActivityImageList() {
				let _this = this;
				if(this.loading) {
					return false;
				}
				this.loading = true;
				this.$fetch(this.$api.url.school.activityImageList, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					activityId: this.activityId,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}).then(function(res) {
					if(res.respCode == "success") {
						if(!_this.pagerRendered) {
							let pagerTotal = res.data.total == 0 ? 0 : Math.ceil(res.data.total / _this.pageSize);
							for(let i = 0; i < pagerTotal; i++) {
								_this.images.push({
									loaded: false,
									items: []
								});
							}
							_this.pagerRendered = true;
						}
						if(res.data.total > 0) {
							let imageIndex = _this.pageIndex - 1;
							_this.images[imageIndex].loaded = true;
							let items = [];
							if(null != res.data.items && res.data.items.length > 0) {
								res.data.items.forEach((item, index) => {
									items.push({
										...item,
										fileId: 'file_' + imageIndex + '_' + index
									});
								});
							}
							_this.images[imageIndex].items = items;
						}
					}
					_this.loading = false;
				}).catch(function(error) {
					_this.loading = false;
				});
			}
		},
		computed: {
			swiper() {
				return this.$refs.schoolActivityInfoSwiper.swiper;
			}
		},
		mounted() {
			this.getActivityInfo();
			this.getActivityImageList();
		},
		watch: {
			activityId: function(val, oldVal) {
				if(val != oldVal) {
					this.resetSearch();
					this.getActivityInfo();
					this.getActivityImageList();
				}
			}
		}
	}
</script>

<style scoped>
	.swiper-container {
		width: 100%;
		height: 100%;
	}
	.activity-info-box .activity-info-right .swiper-actvIR{
		width:84%;
		height: 100%;
	}
	.activity-info-box .activity-info-right .swiper-actvIR .swiper-slide .actvIR-imgbox{
		height: 95%;
	}
	.activity-info-box .activity-info-right .swiper-actvIR .swiper-slide .actvIR-imgbox li .actvIR-img video{
		height: 100%;
		width: 100%;
		border-radius: .3vw;
	}
</style>