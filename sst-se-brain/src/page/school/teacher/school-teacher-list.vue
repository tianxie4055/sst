<template>
	<swiper :options="swiperOption" class="list-swiper" ref="schoolTeacherListSwiper" v-if="null!=list && list.length>0">
		<swiper-slide v-for="(item,index) in list" :key="index">
			<ul class="list-frame teacher-list">
				<li v-for="(dataItem,dataIndex) in item.items" :key="dataIndex">
					<a href="javascript:;" class="informationBox teacher">
						<div class="labelBox">
							<div class="labelIcon icon-tolerance">{{dataItem.vacationTypeName}}</div>
						</div>
						<div class="objectHeadBox">
							<div class="objectHead">
								<img :src="dataItem.largePicture==''?defaultAvatar:dataItem.largePicture" @error="renderErrorDefaultSrc">
							</div>
							<div class="headECharts" :id="'chart_teacher_' + index + '_' + dataIndex"></div>
							<div class="headData">
								<ul>
									<li v-for="(cataItem,cataIndex) in catas" :key="cataIndex">{{cataItem}}（{{getPoint(dataItem.points, cataIndex)}}分）</li>
								</ul>
							</div>
							<div class="headName">
								<h1>{{dataItem.teacherName}}</h1>
								<h2>{{dataItem.administrativeName}}</h2>
							</div>
						</div>
						<div class="introduce">
							<div class="overflow3" v-html="dataItem.teacherDesc"></div>
						</div>
					</a>
				</li>
			</ul>
		</swiper-slide>
		<div class="swiper-pagination teacher-list-pager" slot="pagination"></div>
		<div class="school-class-next icon-button-next" slot="button-next"><i class="iconfont icon-right"></i></div>
		<div class="school-class-prev icon-button-prev" slot="button-prev"><i class="iconfont icon-left"></i></div>
	</swiper>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import Avatar from '../../../assets/images/head.png';
	export default {
		data() {
			let _this = this;
			return {
				defaultAvatar: Avatar,
				catas: [],
				pointMin: 0,
				pointMax: 100,
				list: [],
				pageIndex: 1,
				pageSize: 6,
				loading: false,
				pagerRendered: false, // 分页是否渲染
				chartPrefix: 'chart_teacher_',
				swiperOption: {
					observer: true,
					observeParents: true,
					pagination: {
						el: '.teacher-list-pager',
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
						slidePrevTransitionEnd: function() {
							_this.slideChange(this.activeIndex);
						},
						slideNextTransitionEnd: function() {
							_this.slideChange(this.activeIndex);
						}
					}
				},
				fontSize: this.$common.getDpr(),
				gaugeWidth: this.$common.getGaugeWidth(),
				gaugeDistance: this.$common.getGaugeDistance()
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
			renderErrorDefaultSrc(e) {
				e.target.src = this.defaultAvatar;
			},
			getPoint(points, index) {
				if(null == points || points.length - 1 < index) return 0;
				return points[index];
			},
			renderChart(listIndex, items) {
				if(null == items || items.length == 0) return false;
				items.forEach((item, index) => {
					let id = this.chartPrefix + listIndex + '_' + index;
					this.drawGauge(id, item.totalPoint);
				});
			},
			drawGauge(id, value) {
				let _this = this;
				let chart = this.$echarts.init(document.getElementById(id));
				let option = {
					series: [{
						type: 'gauge',
						min: _this.pointMin,
						max: _this.pointMax,
						splitNumber: 5,
						axisLine: {
							lineStyle: {
								width: _this.gaugeWidth,
								color: [
									[0.2, '#E43F3D'],
									[0.4, '#E98E2C'],
									[0.6, '#DDBD4D'],
									[0.8, '#7CBB55'],
									[1, '#9CD6CE']
								]
							}
						},
						splitLine: { // 分隔线
							show: false,
							length: _this.gaugeWidth
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							distance: _this.gaugeDistance,
							color: '#fff',
							fontSize: _this.fontSize - 3
						},
						pointer: {
							//show: false,
							length: '80%',
							width: _this.gaugeWidth / 2
						},
						detail: {
							formatter: '{value}分',
							offsetCenter: [0, '80%'],
							fontSize: _this.fontSize
						},
						data: [{
							value: value,
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
				this.$fetch(this.$api.url.school.teacherList, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}).then(function(res) {
					if(res.respCode == "success") {
						if(!_this.pagerRendered) {
							_this.catas = res.data.catas;
							_this.pointMin = res.data.minScore;
							_this.pointMax = res.data.maxScore;
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
				return this.$refs.schoolTeacherListSwiper.swiper;
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