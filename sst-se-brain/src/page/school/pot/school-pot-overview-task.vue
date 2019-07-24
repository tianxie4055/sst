<template>
	<div class="integralBox">
		<div class="integral-title">
			<h1>任务进展跟踪</h1>
			<div class="subblockTab">
				<a href="javasrcipt:;" :class="tabActive(index)" @click="tabChange(index)" v-for="(item, index) in tabList" :key="index">{{item.name}}</a>
			</div>
		</div>
		<div class="integral-info">
			<swiper :options="swiperOption" class="swiper-track" ref="schoolPotOverviewTaskSwiper">
				<swiper-slide v-for="(item,index) in tabList" :key="index">
					<div class="integral-icon-box icon-type-box">
						<div :class="chartClass(dataIndex)" :id="'school-pot-overview-task-' + index + '-' + dataIndex" v-for="(dataItem, dataIndex) in item.data" :key="dataIndex"></div>
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
				type: 'week',
				tabIndex: 0,
				tabList: [{
						type: 'week',
						name: '本周',
						className: 'subblockTab-week',
						data: [],
						loaded: false,
						loading: false
					},
					{
						type: 'month',
						name: '本月',
						className: 'subblockTab-month',
						data: [],
						loaded: false,
						loading: false
					}
				],
				swiperOption: {
					on: {
						slidePrevTransitionEnd: function() {
							_this.slideChange(this.activeIndex);
						},
						slideNextTransitionEnd: function() {
							_this.slideChange(this.activeIndex);
						}
					}
				},
				chartPrefix: 'school-pot-overview-task-',
				fontSize: this.$common.getDpr(),
				barWidth: this.$common.getCategoryBarWidth()
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
			chartClass(index){
				let tab = this.tabList[index];
				return 'icon-' + tab.type;
			},
			tabActive(index) {
				let tab = this.tabList[index];
				return tab.className + (this.tabIndex == index ? ' active' : '');
			},
			tabChange(index) {
				this.swiper.slideTo(index);
				this.slideChange(index);
			},
			slideChange(index) {
				this.tabIndex = index;
				let tab = this.tabList[index];
				this.type = tab.type;
				if(tab.loaded) {
					return false;
				}
				this.fetchData();
			},
			renderBarChart(option){
				let chart = this.$echarts.init(document.getElementById(option.chartId));
				let chartOption = {
					graphic: {
						elements: [
							{
								type: 'text',
								style: {
									text: option.title,
									fill: '#f57f17',
									font: this.fontSize + 'px "Microsoft YaHei", sans-serif'
								},
								left: 'center',
            					top: 'center'
							}
						]
					},
					//color: ['#25f19b', '#feea6e', '#fba43b', '#e5703f', '#e14622'],
					tooltip: {
						trigger: 'item',
						formatter: "{b}:<br/>{c} ({d}%)",
						textStyle: {
							fontSize: this.fontSize
						}
					},
					legend: {
						show: false,
					},
					toolbox: {
						show: false,
					},
					series: [{
						name: option.title,
						type: 'pie',
						radius: ['50%', '70%'],
						animation: true,
						label: {
							position: 'inner',
							fontSize: this.fontSize
						},
						emphasis: {
							label: {
								position: 'center'
							}
						},
						data: option.seriesData
					}]
				};
				chart.setOption(chartOption);
			},
			renderChart() {
				let _this = this;
				let tab = this.tabList[this.tabIndex];
				if(null != tab.data && tab.data.length > 0){
					tab.data.forEach((item, index) => {
						let chartId = _this.chartPrefix + _this.tabIndex + '-' + index;
						let title = item.objTypeName;
						let seriesData = [];
						if(null != item.items && item.items.length > 0){
							item.items.forEach(dataItem => {
								seriesData.push({
									name: dataItem.traceTypeName,
									value: dataItem.taskCnt
								});
							});
						}
						_this.renderBarChart({
							chartId: chartId,
							title: title,
							seriesData: seriesData
						});
					});
				}
			},
			fetchData() {
				let _this = this;
				let tab = this.tabList[this.tabIndex];
				if(tab.loading) {
					return false;
				}
				tab.loading = true;
				this.$fetch(this.$api.url.school.potTask, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					dateType: this.type
				}).then(function(res) {
					if(res.respCode == "success") {
						tab.data = res.data;
						tab.loaded = true;
						setTimeout(function() {
							_this.renderChart();
						}, 10);
					}
					tab.loading = false;
				}).catch(function(error) {
					tab.loading = false;
				});
			}
		},
		computed: {
			swiper() {
				return this.$refs.schoolPotOverviewTaskSwiper.swiper;
			}
		},
		mounted() {
			this.tabChange(0);
		}
	}
</script>

<style>

</style>