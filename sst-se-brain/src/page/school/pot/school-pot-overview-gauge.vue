<template>
	<div class="integralBox">
		<div class="integral-title">
			<h1>积分仪表盘</h1>
		</div>
		<div class="integral-info integral-icon">
			<div class="integral-icon-box icon-type-box">
				<div :class="chartClass(index)" :id="'school-pot-overview-gauge-' + index" v-for="(item, index) in list" :key="index"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				loading: false,
				chartPrefix: 'school-pot-overview-gauge-',
				chartClassArr: [
					'meter-teacher',
					'meter-student',
					'meter-class'
				],
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
		methods: {
			chartClass(index) {
				return this.chartClassArr[index];
			},
			drawGauge(option) {
				let _this = this;
				let chart = this.$echarts.init(document.getElementById(option.chartId));
				let chartOption = {
					title: {
						text: option.title,
						left: 'center',
						top: '10%',
						textStyle: {
							color: '#25f09a',
							fontSize: this.fontSize
						}
					},
					toolbox: {
						show: false,
					},
					series: [{
						type: 'gauge',
						min: option.min,
						max: option.max,
						splitNumber: 5,
						radius: '70%',
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
							fontSize: _this.fontSize - 2
						},
						pointer: {
							length: '80%',
							width: _this.gaugeWidth / 2
						},
						detail: {
							formatter: '{value}分',
							offsetCenter: [0, '80%'],
							fontSize: _this.fontSize
						},
						data: [{
							value: option.value,
							name: ''
						}]
					}]
				};
				chart.setOption(chartOption);
			},
			renderChart() {
				let _this = this;
				if(null != this.list && this.list.length > 0) {
					this.list.forEach((item, index) => {
						let chartId = _this.chartPrefix + index;
						let title = item.objTypeName;
						_this.drawGauge({
							chartId: chartId,
							title: title,
							min: item.minScore,
							max: item.maxScore,
							value: item.avgScore
						});
					});
				}
			},
			fetchData() {
				let _this = this;
				if(_this.loading) {
					return false;
				}
				_this.loading = true;
				this.$fetch(this.$api.url.school.potAvgScore, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId
				}).then(function(res) {
					if(res.respCode == "success") {
						_this.list = res.data;
						setTimeout(function() {
							_this.renderChart();
						}, 10);
					}
					_this.loading = false;
				}).catch(function(error) {
					_this.loading = false;
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