<template>
	<div id="teacher-relation" style="width:100%;height:100%;"></div>
</template>

<script>
	export default {
		data() {
			let _this = this;
			return {
				graph: {},
				chartId: 'teacher-relation',
				min: 100,
				max: 500,
				showSize: 40,
				fontSize: this.$common.getDpr()
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		methods: {
			renderGraph() {
				let chart = this.$echarts.init(document.getElementById(this.chartId));
				let data = this.rule || {};
				let categories = this.graph.categories || [],
					nodes = this.graph.data || [],
					links = this.graph.links || [];
				let categoriesData = {};
				categories.forEach(item => {
					categoriesData[item.id] = item.name;
				});
				nodes.forEach(node => {
					node.itemStyle = null;
					let value = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
					node.symbolSize = value / 10;
					node.value = categoriesData[node.category];
					node.label = {
						normal: {
							show: node.symbolSize > this.showSize
						}
					};
					node.tooltip = {
						formatter: '{b}: {c}'
					}
				});
				let chartOption = {
					tooltip: {
						textStyle: {
							fontSize: this.fontSize
						}
					},
					legend: [{
						textStyle: {
							color: '#99abb4',
							fontSize: this.fontSize
						},
						data: categories.map(function (a) {
			                return a.name;
			            })
					}],
					animationDurationUpdate: 1500,
					animationEasingUpdate: 'quinticInOut',
					series: [{
						type: 'graph',
						layout: 'circular',
						data: nodes,
						links: links,
						categories: categories,
						roam: true,
						label: {
							fontSize: this.fontSize,
							normal: {
								formatter: '{b}'
							}
						},
						lineStyle: {
							normal: {
								curveness: 0.3
							}
						}
					}]
				};
				chart.setOption(chartOption);
			},
			fetchData() {
				let _this = this;
				this.$api.getTeacherRelative({
					//this.$fetch(this.$api.url.school.potRule, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId
				}).then(function(res) {
					if(res.respCode == "success") {
						_this.graph = res.data;
						setTimeout(function() {
							_this.renderGraph();
						}, 100);
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