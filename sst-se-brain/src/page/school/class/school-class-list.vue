<template>
	<swiper :options="swiperOption" class="list-swiper" ref="schoolClassSwiper" v-if="null!=list && list.length>0">
		<swiper-slide v-for="(item,index) in list" :key="index">
			<ul class="list-frame teacher-list">
				<li v-for="(dataItem,dataIndex) in item.items" :key="dataIndex">
					<a href="javascript:;" @click="viewClassStudent(dataItem)" class="informationBox class">
						<div class="labelBox" v-if="dataItem.isBeautiful == 1">
							<div class="labelIcon icon-tolerance">美丽班级</div>
						</div>
						<div class="objectHeadBox">
							<div class="objectHead">
								<h2>（{{dataItem.classOrderId}}）班</h2>
								<h3>{{dataItem.gradeName}}</h3>
								<embed :src="classSvg" class="badgePic" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
								<h1>{{dataItem.classTeacher}}</h1>
							</div>
							<div class="headECharts" :id="'chart_class_' + index + '_' + dataIndex"></div>
						</div>
						<div class="introduce">
							<div class="overflow2" v-html="dataItem.classDesc"></div>
						</div>
						<div class="statistics">
							<div><i class="iconfont icon-ren"></i><span>{{dataItem.signTeacherNum}}/{{dataItem.teacherNum}}</span></div>
							<div><i class="iconfont icon-qizhi"></i><span>{{dataItem.beautifulClassNum}}/{{dataItem.weekCnt}}</span></div>
							<div><i class="iconfont icon-renqun"></i><span>{{dataItem.signStudentNum}}/{{dataItem.studentNum}}</span></div>
						</div>
					</a>
				</li>
			</ul>
		</swiper-slide>
		<div class="swiper-pagination class-list-pager" slot="pagination"></div>
		<div class="school-class-next icon-button-next" slot="button-next"><i class="iconfont icon-right"></i></div>
		<div class="school-class-prev icon-button-prev" slot="button-prev"><i class="iconfont icon-left"></i></div>
		<!-- <div class="swiper-button-next" slot="button-next"></div>
    	<div class="swiper-button-prev" slot="button-prev"></div> -->
	</swiper>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import defaultSvg from '../../../assets/images/class.svg';
	export default {
		data() {
			let _this = this;
			return {
				classSvg: defaultSvg,
				catas: [],
				pointMin: 0,
				pointMax: 100,
				list: [],
				pageIndex: 1,
				pageSize: 6,
				loading: false,
				pagerRendered: false, // 分页是否渲染
				chartPrefix: 'chart_class_',
				swiperOption: {
					observer: true,
					observeParents: true,
					pagination: {
						el: '.class-list-pager',
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
				},
				fontSize: this.$common.getDpr(),
				gaugeWidth: this.$common.getGaugeWidth()
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
			viewClassStudent(item){
				this.$emit('showStudentList', item.classId);
			},
			renderChart(listIndex, items) {
				if(null == items || items.length == 0) return false;
				items.forEach((item, index) => {
					let id = this.chartPrefix + listIndex + '_' + index;
					this.drawRadar(id, item);
				});
			},
			drawRadar(id, item) {
				let _this = this;
				let chart = this.$echarts.init(document.getElementById(id));
				let option = {
					tooltip: {
						trigger: 'item',
						textStyle: {
							fontSize: this.fontSize
						},
						position: 'inside'
					},
					legend: {
						data: ['']
					},
					radar: {
						radius: '65%',
						shape: 'circle',
						name: {
							color: '#39b5ac',
							fontSize: this.fontSize
						},
						nameGap: 5,
						indicator: _this.catas
					},
					series: [{
						name: '',
						type: 'radar',
						areaStyle: {
							normal: {}
						},
						data: [{
							value: item.points,
							name: ''
						}]
					}]
				};
				chart.setOption(option);
			},
			slideChange(index) {
				if(null == this.list || this.list.length == 0) {
					return false;
				}
				let tab = this.list[index];
				if(null != tab && tab.loaded) {
					return false;
				}
				this.pageIndex = index + 1;
				this.fetchData();
			},
			fetchData() {
				let _this = this;
				if(this.loading) {
					return false;
				}
				this.loading = true;
				this.$fetch(this.$api.url.school.classList, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}).then(function(res) {
					if(res.respCode == "success") {
						if(!_this.pagerRendered) {
							if(null!=res.data.catas&&res.data.catas.length>0){
								res.data.catas.forEach(item => {
									_this.catas.push({
										name: item.cataName,
										max: item.max
									});
								});
							}
							let pagerTotal = res.data.total == 0 ? 0 : Math.ceil(res.data.total / _this.pageSize);
							for(let i = 0; i < pagerTotal; i++) {
								_this.list.push({
									loaded: false,
									items: []
								});
							}
							_this.pagerRendered = true;
						}
						if(res.data.total > 0) {
							_this.list[_this.pageIndex - 1].loaded = true;
							let items = res.data.items;
							if(null == items.points) items.points = [];
							_this.list[_this.pageIndex - 1].items = items;
							setTimeout(function() {
								_this.renderChart(_this.pageIndex - 1, items);
							}, 100);
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
				return this.$refs.schoolClassSwiper.swiper;
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