<template>
	<div id="rule-tree" style="width:100%;height:100%;"></div>
</template>

<script>
	export default {
		data() {
			let _this = this;
			return {
				rule: {},
				chartId: 'rule-tree',
				fontSize: this.$common.getDpr()
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		methods: {
			renderRuleTree() {
				let chart = this.$echarts.init(document.getElementById(this.chartId));
				let data = this.rule || {};
				let chartOption = {
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove'
					},
					series: [{
						type: 'tree',
						data: [data],

						top: '1%',
						left: '10%',
						bottom: '1%',
						right: '25%',
						symbol: 'circle',
						symbolSize: 15,

						label: {
							normal: {
								position: 'left',
								verticalAlign: 'middle',
								align: 'right',
								backgroundColor: '#04b0df',
								padding: 5,
								borderRadius: 10,
								color: '#000',
								fontSize: this.fontSize
							}
							
						},
						
						leaves: {
							label: {
								normal: {
									position: 'right',
									verticalAlign: 'middle',
									align: 'left'
								}
							}
						},

						expandAndCollapse: true,
						animationDuration: 550,
						animationDurationUpdate: 750
					}]
				};
				chart.setOption(chartOption);
			},
			fetchData() {
				let _this = this;
				this.$api.getPotRule({
					//this.$fetch(this.$api.url.school.potRule, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId
				}).then(function(res) {
					if(res.respCode == "success") {
						_this.rule = res.data;
						setTimeout(function(){
							_this.renderRuleTree();
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