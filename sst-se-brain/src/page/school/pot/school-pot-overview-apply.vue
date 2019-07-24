<template>
	<div class="integralBox">
		<div class="integral-title">
			<h1>积分应用趋势</h1>
		</div>
		<div class="integral-info">
			<div class="integral-icon-box" id="school-pot-overview-apply">

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				chartId: 'school-pot-overview-apply',
				weeks: [],
				data: [],
				fontSize: this.$common.getDpr(),
				barWidth: this.$common.getCategoryBarWidth()
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		methods: {
			renderChart() {
				let chart = this.$echarts.init(document.getElementById(this.chartId));
				let xData = this.weeks || [], legendData = [], seriesData = [];
				if(null != this.data && this.data.length > 0){
					this.data.forEach(item => {
						legendData.push(item.objTypeName);
						seriesData.push({
							name: item.objTypeName,
							type: 'line',
							stack: '总量',
							data: item.ruleTimes
						});
					});
				}
				let chartOption = {
					tooltip: {
						trigger: 'axis',
						textStyle: {
							fontSize: this.fontSize
						}
					},
					legend: {
						data: legendData,
						icon: 'pin',
						left: 'right',
						textStyle: {
							color: '#99abb4',
							fontSize: this.fontSize
						}
					},
					grid: {
						top: '20%',
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						show: false
					},
					xAxis: {
						type: 'category',
						boundaryGap: true,
						data: xData,
						axisLine: {
							lineStyle: {
								color: '#49d69c'
							}
						},
						axisLabel: {
							fontSize: this.fontSize
						}
					},
					yAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#49d69c'
							}
						},
						axisLabel: {
							fontSize: this.fontSize
						},
						splitLine: {
							lineStyle: {
								color: '#3e4c6b'
							}
						}
					},
					series: seriesData
				};
				chart.setOption(chartOption);
			},
			fetchData() {
				let _this = this;
				this.$fetch(this.$api.url.school.potTrend, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId
				}).then(function(res) {
					if(res.respCode == "success") {
						console.info(res.data);
						if(null != res.data) {
							_this.weeks = res.data.weeks;
							_this.data = res.data.items;
							setTimeout(function() {
								_this.renderChart();
							}, 10);
						}
					}
				}).catch(function(error) {

				});
			}
		},
		mounted() {
			this.fetchData();
		}
	}
</script>

<style>

</style>