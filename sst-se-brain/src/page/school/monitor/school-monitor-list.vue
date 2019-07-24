<template>
	<swiper :options="swiperOption" class="list-swiper" :ref="swiperRef" v-if="null!=list && list.length>0">
		<swiper-slide v-for="(item,index) in list" :key="index">
			<ul class="list-frame monitor-list">
				<li v-for="(dataItem,dataIndex) in item.items" :key="dataIndex">
					<a href="javascript:;" @click="viewMonitor(dataItem)" class="informationBox monitor">
						<div class="monitorName">
							<span>{{dataItem.roomName}}</span>
							<i class="iconfont icon-bofang"></i>
						</div>
						<div class="monitorImg">
							<img :src="dataItem.lastSnapUrl==''?defaultRoomImg:dataItem.lastSnapUrl" @error="renderErrorDefaultSrc">
						</div>
					</a>
				</li>
			</ul>
		</swiper-slide>
		<div class="swiper-pagination" slot="pagination"></div>
		<div class="school-class-next icon-button-next" slot="button-next"><i class="iconfont icon-right"></i></div>
		<div class="school-class-prev icon-button-prev" slot="button-prev"><i class="iconfont icon-left"></i></div>
		<!-- <div class="swiper-button-next" slot="button-next"></div>
    	<div class="swiper-button-prev" slot="button-prev"></div> -->
	</swiper>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import defaultImg from '../../../assets/images/evaluate.jpg';
	export default {
		data() {
			let _this = this;
			return {
				defaultRoomImg: defaultImg,
				swiperRef: 'schoolMonitorListSwiper_' + _this.index,
				pagerClassName: 'school-monitor-list-pager-' + _this.index,
				list: [],
				pageIndex: 1,
				pageSize: 15,
				loading: false,
				pagerRendered: false, // 分页是否渲染
				swiperOption: {
					observer: true,
    				observeParents: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						renderBullet: function(index, className) {
							return '<span class="' + className + '">' + (index + 1) + '</span>';
						}
					},
					navigation: {
				        nextEl: '.icon-button-next',
				        prevEl: '.icon-button-prev',
				    },
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
					show: false
				}
			}
		},
		props: {
			schoolId: {
				required: true
			},
			index: {
				required: true,
				type: Number
			},
			type : {
				required: true
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		methods: {
			viewMonitor(item){
				this.$emit('viewMonitor', {
					title: item.roomName,
					url: item.liveUrl
					//url: 'http://localhost:9099/data/udisk/courselesson/23/haomei.mp4'
				});
			},
			renderErrorDefaultSrc(e) {
				e.target.src = this.defaultRoomImg;
			},
			slideChange(index){
				if(null == this.list || this.list.length == 0){
					return false;
				}
				let tab = this.list[index];
				if(null != tab && tab.loaded){
					return false;
				}
				this.pageIndex = index + 1;
				this.fetchData();
			},
			fetchData() {
				let _this = this;
				if(this.loading){
					return false;
				}
				this.loading = true;
				this.$fetch(this.$api.url.school.liveRoomList, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					bizSpot: 3, // 监控
					bizType: _this.type,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}).then(function(res) {
					if(res.respCode == "success") {
						if(!_this.pagerRendered){
							let pagerTotal = res.data.total == 0 ? 0 : Math.ceil(res.data.total / _this.pageSize);
							for(let i=0; i<pagerTotal; i++){
								_this.list.push({
									loaded: false,
									items:[]
								});
							}
							_this.pagerRendered = true;
						}
						if(res.data.total > 0) {
							_this.list[_this.pageIndex - 1].loaded = true;
							_this.list[_this.pageIndex - 1].items = res.data.items;
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
				return this.$refs[this.swiperRef].swiper;
			}
		},
		mounted() {
			this.fetchData();
		}
	}
</script>

<style scoped>
	.swiper-container{
		width: 100%;
		height: 100%;
	}
</style>