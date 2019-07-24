<template>
	<div class="resources-info-box">
		<div class="resources-info-left">
			<div class="resources-info">
				<div class="rsrceIcon" :style="{backgroundImage: 'url(' + course.courseImage + ')'}">
					<div class="resources-infoText">
						<h1>{{course.courseName}}</h1>
						<ul>
							<li><label>学科</label><span>{{course.subjectName}}</span></li>
							<li><label>开课教师数</label><span>{{course.teacherCnt}}</span></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="resources-info-right">
			<ul class="resourcesIR-titleBox">
				<li>
					<div class="rsrceIcon">
						<h1>课件</h1>
						<div><span>{{yearData.lessonCnt}}</span>/<span>{{allData.lessonCnt}}</span></div>
					</div>
				</li>
				<li>
					<div class="rsrceIcon">
						<h1>练习</h1>
						<div><span>{{yearData.testCnt}}</span>/<span>{{allData.testCnt}}</span></div>
					</div>
				</li>
				<li>
					<div class="rsrceIcon">
						<h1>题目</h1>
						<div><span>{{yearData.questionCnt}}</span>/<span>{{allData.questionCnt}}</span></div>
					</div>
				</li>
				<li>
					<div class="rsrceIcon">
						<h1>教案</h1>
						<div><span>{{yearData.planCnt}}</span>/<span>{{allData.planCnt}}</span></div>
					</div>
				</li>
				<li>
					<div class="rsrceIcon">
						<h1>课堂</h1>
						<div><span>{{yearData.teachingCnt}}</span>/<span>{{allData.teachingCnt}}</span></div>
					</div>
				</li>

			</ul>
			<ul class="resourcesIR-iconBox">
				<li>
					<div class="rsrceIcon-title">课件分布</div>
					<div class="rsrceIcon" id="course-elemdist-chart-lesson"></div>
				</li>
				<li>
					<div class="rsrceIcon-title">题型分布</div>
					<div class="rsrceIcon" id="course-elemdist-chart-questiontype"></div>
				</li>
				<li>
					<div class="rsrceIcon-title">明星课堂</div>
					<div class="rsrceIcon" id="course-elemdist-chart-starteaching"></div>
				</li>
				<li>
					<div class="rsrceIcon-title">错题数</div>
					<div class="rsrceIcon" id="course-elemdist-chart-wrongquestion"></div>
				</li>
				<li>
					<div class="rsrceIcon-title">热度课件</div>
					<div class="rsrceIcon" id="course-elemdist-chart-lessontop"></div>
				</li>
				<li>
					<div class="rsrceIcon-title">教案过程</div>
					<div class="rsrceIcon" id="course-elemdist-chart-plan"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				course: {},
				allCycleType: 1,
				yearCycleType: 2,
				allData: {},
				yearData: {},
				elemdist: {
					chart: {
						prefix: 'course-elemdist-chart-',
						lesson: 'lesson',
						questionType: 'questiontype',
						starTeaching: 'starteaching',
						lessonTop: 'lessontop',
						plan: 'plan',
						wrongQuestion: 'wrongquestion'
					},
					lesson: {},
					questionType: {},
					starTeaching: {},
					plan: {},
					wrongQuestion: {}
				},
				lessonTopCnt: 10,
				lessonTopData: {},
				legendTypeName: {
					1: "总数量",
					2: "本学年",
					3: "本学期"
				},
				fontSize: this.$common.getDpr(),
				barWidth: this.$common.getCategoryBarWidth()
			}
		},
		props: {
			schoolId: {
				required: true
			},
			courseId: {
				required: true
			}
		},
		components: {

		},
		methods: {
			renderCategoryChart(option) {
				let chart = this.$echarts.init(document.getElementById(option.chartId), 'dark');
				let chartOption = {
					backgroundColor: '',
					tooltip: {
						trigger: 'axis',
						textStyle: {
							fontSize: this.fontSize
						}
					},
					grid: {
						x: 50,
						x2: 20,
						y: 30,
						y2: 30
					},
					toolbox: {
						show: false,
					},
					xAxis: [{
						type: 'category',
						data: option.xData,
						splitLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								fontSize: this.fontSize
							}
						}
					}],
					yAxis: [{
						type: 'value',
						axisTick: {
							show: false
						},
						splitLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								fontSize: this.fontSize
							}
						}
					}],
					series: option.seriesData,
					legend: {
						textStyle: {
							fontSize: this.fontSize
						},
						left: 'right',
						show: option.legendShow || false,
						data: option.legendData || []
					}
				};
				chart.setOption(chartOption);
			},
			renderElemdistLessonChart() {
				let data = this.elemdist.lesson || {};
				let items = data.items || [];
				let elemItems = data.elemItems || [];
				let seriesData = [],
					legendData = [],
					max = 0,
					indicatorData = [];
				items.forEach(item => {
					let elemCnts = item.elemCnts || [];
					elemCnts.forEach(elemItem => {
						max = Math.max(max, elemItem);
					});
					let legendName = this.legendTypeName[item.cycleType];
					seriesData.push({
						value: elemCnts,
						name: legendName
					});
					legendData.push(legendName);
				});
				elemItems.forEach(item => {
					indicatorData.push({
						name: item,
						max: max + 10
					});
				});
				let chartId = this.elemdist.chart.prefix + this.elemdist.chart.lesson;
				let chart = this.$echarts.init(document.getElementById(chartId), 'dark');
				let option = {
					backgroundColor: '',
					tooltip: {
						
					},
					legend: {
						data: legendData,
						top: 0,
						right: 0,
						orient: 'vertical',
						textStyle: {
							fontSize: this.fontSize
						},
					},
					radar: {
						shape: 'circle',
						nameGap: 10,
						radius: '70%',
						indicator: indicatorData
					},
					series: [{
				        type: 'radar',
				        data : seriesData
				    }]
				};
				chart.setOption(option);
			},
			renderElemdistQuestionTypeChart() {
				let data = this.elemdist.questionType || {};
				let items = data.items || [];
				let xData = data.elemItems || [];
				let seriesData = [],
					legendData = [];
				items.forEach(item => {
					let legendName = this.legendTypeName[item.cycleType];
					seriesData.push({
						name: legendName,
						type: 'bar',
						data: item.elemCnts,
						barWidth: this.barWidth
					});
					legendData.push(legendName);
				});
				let chartId = this.elemdist.chart.prefix + this.elemdist.chart.questionType;
				this.renderCategoryChart({
					chartId: chartId,
					xData: xData,
					seriesData: seriesData,
					legendShow: true,
					legendData: legendData
				});
			},
			renderElemdistStarTeachingChart() {
				let data = this.elemdist.starTeaching || {};
				let items = data.items || [];
				let xData = data.elemItems || [];
				let seriesData = [],
					legendData = [];
				items.forEach(item => {
					let legendName = this.legendTypeName[item.cycleType];
					seriesData.push({
						name: legendName,
						type: 'bar',
						data: item.elemCnts,
						barWidth: this.barWidth
					});
					legendData.push(legendName);
				});
				let chartId = this.elemdist.chart.prefix + this.elemdist.chart.starTeaching;
				this.renderCategoryChart({
					chartId: chartId,
					xData: xData,
					seriesData: seriesData,
					legendShow: true,
					legendData: legendData
				});
			},
			renderElemdistPlanChart() {
				let data = this.elemdist.plan || {};
				let items = data.items || [];
				let elemItems = data.elemItems || [];
				let xData = [],
					seriesData = [],
					legendData = [];
				elemItems.forEach(item => {
					xData.push({
						value: item,
						textStyle: {
							fontSize: this.fontSize
						}
					});
				});
				items.forEach(item => {
					let legendName = this.legendTypeName[item.cycleType];
					seriesData.push({
						name: legendName,
						type: 'line',
						areaStyle: {
							normal: {}
						},
						data: item.elemCnts
					});
					legendData.push(legendName);
				});
				let chartId = this.elemdist.chart.prefix + this.elemdist.chart.plan;
				let chart = this.$echarts.init(document.getElementById(chartId), 'dark');
				let option = {
					backgroundColor: '',
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						x: 50,
						x2: 20,
						y: 30,
						y2: 30
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						splitLine: {
							show: false
						},
						data: xData
					}],
					yAxis: [{
						type: 'value',
						splitLine: {
							show: false
						},
						axisLabel: {
							fontSize: this.fontSize
						}
					}],
					series: seriesData,
					legend: {
						show: true,
						textStyle: {
							fontSize: this.fontSize
						},
						data: legendData
					}
				};
				chart.setOption(option);
			},
			renderElemdistWrongQuestionChart() {
				let data = this.elemdist.wrongQuestion || {};
				let items = data.items || [];
				let elemItems = data.elemItems || [];
				let seriesData = [],
					angleData = [],
					legendData = [];
				elemItems.forEach(item => {
					angleData.push({
						value: item,
						textStyle: {
							fontSize: this.fontSize
						}
					});
				});
				items.forEach(item => {
					let legendName = this.legendTypeName[item.cycleType];
					seriesData.push({
						type: 'bar',
						data: item.elemCnts,
						coordinateSystem: 'polar',
						name: legendName,
						stack: 'a'
					});
					legendData.push(legendName);
				});
				let chartId = this.elemdist.chart.prefix + this.elemdist.chart.wrongQuestion;
				let chart = this.$echarts.init(document.getElementById(chartId), 'dark');
				let option = {
					backgroundColor: '',
					tooltip: {
						trigger: 'item',
						padding: 10,
						textStyle: {
							fontSize: this.fontSize
						}
					},
					angleAxis: {
						type: 'category',
						data: angleData,
						textStyle: {
							color: 'blue'
						},
						z: 10
					},
					radiusAxis: {
						axisLabel: {
							fontSize: this.fontSize
						}
					},
					polar: {
						radius: '70%'
					},
					series: seriesData,
					legend: {
						show: true,
						data: legendData,
						top: 0,
						right: 0,
						orient: 'vertical',
						textStyle: {
							fontSize: this.fontSize
						}
					}
				};
				chart.setOption(option);
			},
			renderLessonTopChart() {
				let data = this.lessonTopData || {};
				let xData = data.itemNames || [];
				let items = data.itemCnts || [];
				let seriesData = [];
				seriesData.push({
					type: 'bar',
					data: items,
					barWidth: this.barWidth
				});
				let chartId = this.elemdist.chart.prefix + this.elemdist.chart.lessonTop;
				this.renderCategoryChart({
					chartId: chartId,
					xData: xData,
					seriesData: seriesData
				});
			},
			getElemdistLessonData() {
				this.getElemdistData(1);
			},
			getElemdistQuestionTypeData() {
				this.getElemdistData(2);
			},
			getElemdistStarTeachingData() {
				this.getElemdistData(3);
			},
			getElemdistPlanData() {
				this.getElemdistData(4);
			},
			getElemdistWrongQuestionData() {
				this.getElemdistData(5);
			},
			getElemdistData(elemType) {
				let _this = this;
				this.$fetch(this.$api.url.school.courseInfoElemdist, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					courseId: this.courseId,
					elemType: elemType
				}).then(function(res) {
					if(res.respCode == "success") {
						if(elemType == 1) {
							_this.elemdist.lesson = res.data;
							setTimeout(function() {
								_this.renderElemdistLessonChart();
							}, 10);
						} else if(elemType == 2) {
							_this.elemdist.questionType = res.data;
							setTimeout(function() {
								_this.renderElemdistQuestionTypeChart();
							}, 10);
						} else if(elemType == 3) {
							_this.elemdist.starTeaching = res.data;
							setTimeout(function() {
								_this.renderElemdistStarTeachingChart();
							}, 10);
						} else if(elemType == 4) {
							_this.elemdist.plan = res.data;
							setTimeout(function() {
								_this.renderElemdistPlanChart();
							}, 10);
						} else if(elemType == 5) {
							_this.elemdist.wrongQuestion = res.data;
							setTimeout(function() {
								_this.renderElemdistWrongQuestionChart();
							}, 10);
						}
					}
				}).catch(function(error) {

				});
			},
			getLessonTopData() {
				let _this = this;
				this.$fetch(this.$api.url.school.courseInfoLessonTop, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					courseId: this.courseId,
					topCnt: this.lessonTopCnt
				}).then(function(res) {
					if(res.respCode == "success") {
						_this.lessonTopData = res.data;
						_this.renderLessonTopChart();
					}
				}).catch(function(error) {

				});
			},
			getCourseData() {
				let _this = this;
				this.$fetch(this.$api.url.school.courseInfo, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					courseId: this.courseId
				}).then(function(res) {
					if(res.respCode == "success") {
						_this.course = res.data;
						if(null != _this.course && null != _this.course.infos && _this.course.infos.length > 0) {
							_this.course.infos.forEach(item => {
								if(item.cycleType == _this.allCycleType) {
									_this.allData = item;
								} else if(item.cycleType == _this.yearCycleType) {
									_this.yearData = item;
								}
							});
						}
					}
				}).catch(function(error) {

				});
			},
			fetchData() {
				this.getCourseData();
				this.getElemdistLessonData();
				this.getElemdistQuestionTypeData();
				this.getElemdistStarTeachingData();
				this.getElemdistPlanData();
				this.getElemdistWrongQuestionData();
				this.getLessonTopData();
			}
		},
		mounted() {
			this.fetchData();
		}
	}
</script>

<style>

</style>