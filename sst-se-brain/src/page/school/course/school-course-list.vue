<template>
	<swiper :options="swiperOption" class="list-swiper" ref="schoolCourseListSwiper" v-if="null!=list && list.length>0">
		<swiper-slide v-for="(item,index) in list" :key="index">
			<ul class="list-frame resources-list">
				<li v-for="(dataItem,dataIndex) in item.items" :key="dataIndex">
					<a href="javascript:;" @click="viewCourse(dataItem)" class="resources" :style="{backgroundImage: 'url(' + dataItem.courseImage + ')'}">
						<ul>
							<li><label>课件</label><span>{{dataItem.lessonCnt}}</span></li>
							<li><label>题目</label><span>{{dataItem.questionCnt}}</span></li>
							<li><label>练习</label><span>{{dataItem.testCnt}}</span></li>
							<li><label>教案</label><span>{{dataItem.planCnt}}</span></li>
						</ul>
						<h1>{{dataItem.courseName}}</h1>
						<div class="leftLine"></div>
					</a>
				</li>
			</ul>
		</swiper-slide>
		<div class="swiper-pagination course-list-pager" slot="pagination"></div>
		<!-- <div class="swiper-button-next" slot="button-next"></div>
    	<div class="swiper-button-prev" slot="button-prev"></div> -->
		<div class="school-class-next icon-button-next" slot="button-next"><i class="iconfont icon-right"></i></div>
		<div class="school-class-prev icon-button-prev" slot="button-prev"><i class="iconfont icon-left"></i></div>
	</swiper>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		data() {
			let _this = this;
			return {
				list: [],
				pageIndex: 1,
				pageSize: 6,
				loading: false,
				pagerRendered: false, // 分页是否渲染
				swiperOption: {
					observer: true,
    				observeParents: true,
					pagination: {
						el: '.course-list-pager',
						clickable: true,
						type: 'custom',
						renderCustom: function (swiper, current, total) {
				          return '<span style="color:#fff;font-size:14px;">' + current + ' / ' + total + '</span>';
				       },
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
			},
			subjectId: {
				required: true,
				default: 0
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		methods: {
			viewCourse(item) {
				this.$emit('viewCourse', item.courseId);
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
			resetSearch(){
				this.list = [];
				this.pageIndex = 1;
				this.pageSize = 6;
				this.loading = false;
				this.pagerRendered = false;
			},
			fetchData() {
				let _this = this;
				if(this.loading){
					return false;
				}
				this.loading = true;
				this.$fetch(this.$api.url.school.courseList, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					subjectId: this.subjectId,
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
				return this.$refs.schoolCourseListSwiper.swiper;
			}
		},
		mounted() {
			this.fetchData();
		},
		watch: {
			subjectId: function(val, oldVal){
				if(val != oldVal){
					this.resetSearch();
					this.fetchData();
				}
			}
		}
	}
</script>

<style scoped>
	.swiper-container{
		width: 100%;
		height: 100%;
	}
	.resources-list{width:90%; margin:auto;}
</style>