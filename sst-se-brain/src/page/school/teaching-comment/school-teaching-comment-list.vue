<template>
	<swiper :options="swiperOption" class="list-swiper" ref="schoolTeachingCommentListSwiper" v-if="null!=list && list.length>0">
		<swiper-slide v-for="(item,index) in list" :key="index">
			<ul class="list-frame evaluate-list">
				<li v-for="(dataItem,dataIndex) in item.items" :key="dataIndex">
					<a href="javascript:;" @click="viewDetail(dataItem)" class="informationBox evaluate">
						<div class="evaluateImg">
							<i class="iconfont icon-bofang"></i>
							<img :src="dataItem.lastSnapUrl==''?defaultRoomImg:dataItem.lastSnapUrl" @error="renderErrorDefaultSrc">
						</div>
						<div class="evaluateName">{{dataItem.roomName}}</div>
					</a>
				</li>
			</ul>
		</swiper-slide>
		<div class="swiper-pagination teaching-comment-list-pager" slot="pagination"></div>
		<!-- <div class="swiper-button-next" slot="button-next"></div>
    	<div class="swiper-button-prev" slot="button-prev"></div> -->
		<div class="school-class-next icon-button-next" slot="button-next"><i class="iconfont icon-right"></i></div>
		<div class="school-class-prev icon-button-prev" slot="button-prev"><i class="iconfont icon-left"></i></div>
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
				list: [],
				pageIndex: 1,
				pageSize: 6,
				loading: false,
				pagerRendered: false, // 分页是否渲染
				swiperOption: {
					observer: true,
    				observeParents: true,
					pagination: {
						el: '.teaching-comment-list-pager',
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
			viewDetail(item) {
				this.$emit('viewDetail', item.id, item.classRoomId);
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
					bizSpot: 1, // 评课
					bizType: 1, // 教室
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}).then(function(res) {
					if(res.respCode == "success") {
						if(!_this.pagerRendered){
							let pagerTotal = Math.ceil(res.data.total / _this.pageSize);
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
				return this.$refs.schoolTeachingCommentListSwiper.swiper;
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