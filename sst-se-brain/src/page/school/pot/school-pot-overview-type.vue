<template>
	<div class="integralBox">
		<div class="integral-title">
			<h1>积分类型分布</h1>
		</div>
		<div class="integral-info">
			<div class="integral-icon-box icon-type-box">
				<div class="icon-teacher" id="school-pot-overview-type-teacher"></div>
				<div class="icon-student" id="school-pot-overview-type-student"></div>
				<div class="icon-class" id="school-pot-overview-type-class"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				chartPrefix: 'school-pot-overview-type-',
				teacher: {
					type: 1,
					name: '教师',
					chart: 'teacher',
					data: []
				},
				student: {
					type: 2,
					name: '学生',
					chart: 'student',
					data: []
				},
				'class': {
					type: 3,
					name: '班级',
					chart: 'class',
					data: []
				},
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
			renderChart(option) {
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
						},
						position: 'inside'
					},
					legend: {
						show: false,
					},
					toolbox: {
						show: false,
					},
					series: [{
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
			getSeriesData(items){
				let data = [];
				if(null!=items && items.length>0){
					items.forEach(item => {
						data.push({
							name: item.cataName,
							value: item.times
						});
					});
				}
				return data;
			},
			renderTeacherChart() {
				this.renderChart({
					chartId: this.chartPrefix + this.teacher.chart,
					title: this.teacher.name,
					seriesData: this.getSeriesData(this.teacher.data)
				});
			},
			renderStudentChart() {
				this.renderChart({
					chartId: this.chartPrefix + this.student.chart,
					title: this.student.name,
					seriesData: this.getSeriesData(this.student.data)
				});
			},
			renderClassChart() {
				this.renderChart({
					chartId: this.chartPrefix + this['class'].chart,
					title: this['class'].name,
					seriesData: this.getSeriesData(this['class'].data)
				});
			},
			fetchData() {
				let _this = this;
				this.$fetch(this.$api.url.school.potScoreCata, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId
				}).then(function(res) {
					if(res.respCode == "success") {
						console.info(res.data);
						if(null != res.data && res.data.length > 0) {
							res.data.forEach(item => {
								if(item.objType == _this.teacher.type) {
									_this.teacher.name = item.objTypeName;
									_this.teacher.data = item.items;
									setTimeout(function() {
										_this.renderTeacherChart();
									}, 10);
								} else if(item.objType == _this.student.type) {
									_this.student.name = item.objTypeName;
									_this.student.data = item.items;
									setTimeout(function() {
										_this.renderStudentChart();
									}, 10);
								} else if(item.objType == _this['class'].type) {
									_this['class'].name = item.objTypeName;
									_this['class'].data = item.items;
									setTimeout(function() {
										_this.renderClassChart();
									}, 10);
								}
							});
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