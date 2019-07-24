<template>
	<div style="width:100%;height:100%;" v-if="null != subjects && subjects.length > 0">
		<div class="resources-survey">
			<div class="bgcolor-box">
				<h1>概况</h1>
				<div class="survey-infoBox">
					<div class="survey-info-iconBox">
						<div class="survey-icon">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 1200 1019" enable-background="new 0 0 1200 1019" xml:space="preserve">
								<g>
									<path :class="pathActive(index)" @click="pathChange(index)" @mouseover="pathMouseover(index)" @mouseout="pathMouseout(index)" :fill="item.fill" :d="item.d" v-for="(item,index) in paths" :key="index" />
								</g>
							</svg>
							<span class="surveyOther survey0" @click="pathChange(-1)">{{activeSub.subjectName}}</span>
							<span class="surveyOther" :class="surveyActive(index)" @click="pathChange(index)" @mouseover="pathMouseover(index)" @mouseout="pathMouseout(index)" v-for="(item,index) in subjects" :key="index">
								<img :src="item.subjectIcon"/>
							</span>
						</div>
					</div>
					<ul class="survey-text">
						<li><label>教案</label><span>{{activeSub.resource.planCnt}}</span></li>
						<li><label>课堂</label><span>{{activeSub.resource.teachingCnt}}</span></li>
						<li><label>练习</label><span>{{activeSub.resource.testCnt}}</span></li>
						<li><label>题目</label><span>{{activeSub.resource.questionCnt}}</span></li>
						<li><label>课件</label><span>{{activeSub.resource.lessonCnt}}</span></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="resources-icon">
			<div class="bgcolor-box">
				<div class="courseware-box">
					<h1>课件来源分析</h1>
					<div class="icon-box" id="subjectLessonChart">

					</div>
				</div>
				<div class="subject-box">
					<h1>题目来源分析</h1>
					<div class="icon-box" id="subjectQuestionChart">

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let _this = this;
			return {
				loading: false,
				subjectId: 0,
				subjects: [],
				activeIndex: -1,
				activeSub: {
					subjectId: "0",
					subjectName: "全部",
					subjectIcon: "",
					resource: {},
					active: false,
					loaded: false,
					loading: false
				},
				allSub: null,
				lessonChartEl: 'subjectLessonChart',
				questionChartEl: 'subjectQuestionChart',
				paths: [{
						fill: '#FFCD42',
						d: 'M189,1008.878l224.787-231.401c5.491-5.65,5.967-14.461,1.167-20.709c-29.759-38.752-48.384-83.383-55.803-129.502c-1.245-7.741-8.01-13.377-15.846-13.265l-322.577,4.677c-9.165,0.134-16.331,7.998-15.554,17.131c11.441,134.445,65.114,265.85,160.709,372.641C171.991,1015.271,182.621,1015.445,189,1008.878z'
					},
					{
						fill: '#FFCD42',
						d: 'M25.332,595.549l322.607-0.83c7.88-0.02,14.516-5.837,15.633-13.637c6.936-48.361,25.855-92.868,53.672-130.397c4.668-6.3,3.976-15.076-1.58-20.604L186.958,202.547c-6.498-6.464-17.132-6.093-23.124,0.839C75.634,305.498,19.11,435.706,9.492,578.709C8.877,587.843,16.179,595.573,25.332,595.549z'
					},
					{
						fill: '#FFCD42',
						d: 'M198.633,184.354l228.594,227.643c5.583,5.559,14.387,6.145,20.693,1.422c39.117-29.274,83.975-47.345,130.187-54.19c7.754-1.148,13.473-7.843,13.456-15.682l-0.671-322.608c-0.019-9.165-7.795-16.427-16.934-15.765C439.383,14.943,307.318,66.98,199.35,161.245C192.453,167.264,192.146,177.894,198.633,184.354z'
					},
					{
						fill: '#FFCD42',
						d: 'M612.754,20.838v322.608c0,7.879,5.799,14.531,13.596,15.667c48.344,7.06,92.803,26.096,130.259,54.008c6.287,4.684,15.065,4.014,20.608-1.529l228.12-228.12c6.481-6.48,6.141-17.115-0.78-23.123C902.673,71.885,772.612,15.027,629.633,5.039C620.501,4.401,612.754,11.683,612.754,20.838z'
					},
					{
						fill: '#FFCD42',
						d: 'M1018.149,203.271L787.328,428.654c-5.638,5.504-6.346,14.3-1.711,20.673c28.722,39.522,46.161,84.63,52.36,130.93c1.041,7.771,7.653,13.584,15.491,13.677l322.589,3.849c9.162,0.11,16.532-7.565,15.999-16.712c-7.885-134.702-58.067-267.48-150.81-376.759C1035.323,197.331,1024.7,196.876,1018.149,203.271z'
					},
					{
						fill: '#FFCD42',
						d: 'M1180.358,618.967l-322.583-4.004c-7.879-0.098-14.603,5.617-15.835,13.398c-7.659,48.254-27.244,92.474-55.621,129.581c-4.763,6.228-4.199,15.013,1.274,20.628l225.271,230.933c6.398,6.56,17.036,6.352,23.131-0.493c89.721-100.779,148.189-230.124,159.95-372.967C1196.699,626.917,1189.513,619.082,1180.358,618.967z'
					}
				],
				fontSize: this.$common.getDpr()
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		methods: {
			resetActiveSub(){
				this.activeSub = {
					subjectId: "0",
					subjectName: "全部",
					subjectIcon: "",
					resource: {},
					active: false,
					loaded: false,
					loading: false
				}
			},
			surveyActive(index){
				let surveyClass = 'survey' + (index + 1);
				let pathClass = this.pathActive(index);
				return surveyClass + ' ' + pathClass;
			},
			pathActive(index) {
				let item = this.subjects[index];
				return this.activeIndex == index || item.active == true ? 'active' : '';
			},
			pathChange(index) {
				if(this.loading) {
					return false;
				}
				this.activeIndex = index;
				if(index == -1){
					this.activeSub = this.allSub;
				}else{
					this.activeSub = this.subjects[index];
				}
				if(this.activeSub.loaded) {
					this.renderChart();
				} else {
					this.getSubjectResource();
				}
				this.$emit('subjectChange', this.activeSub.subjectId);
			},
			pathMouseover(index) {
				let item = this.subjects[index];
				item.active = true;
			},
			pathMouseout(index) {
				let item = this.subjects[index];
				item.active = false;
			},
			renderChart() {
				let _this = this;
				setTimeout(function(){
					_this.renderLessonChart();
					_this.renderQuestionChart();
				}, 100);
			},
			renderLessonChart() {
				let lessons = this.activeSub.resource.lessons;
				let seriesData = [];
				lessons.forEach(item => {
					seriesData.push({
						name: item.kpiName,
						value: item.kpiVal
					});
				});
				let chart = this.$echarts.init(document.getElementById(this.lessonChartEl), 'dark');
				let option = {
					backgroundColor: '',
					tooltip: {
						trigger: 'item',
						textStyle: {
							fontSize: this.fontSize
						},
						position: 'inside',
						formatter: "{a} <br/>{b}:{c} ({d}%)"
					},
					legend: {
						show: false
					},
					toolbox: {
						show: false
					},
					series: [{
						name: '课件来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
			            label: {
			                fontSize: this.fontSize
			            },
						data: seriesData
					}]
				};
				chart.setOption(option);
			},
			renderQuestionChart() {
				let questions = this.activeSub.resource.questions;
				let xData = [],
					seriesData = [];
				questions.forEach(item => {
					xData.push(item.kpiName);
					seriesData.push(item.kpiVal);
				});
				let chart = this.$echarts.init(document.getElementById(this.questionChartEl), 'dark');
				let option = {
					backgroundColor: '',
					tooltip: {
						trigger: 'item',
						textStyle: {
							fontSize: this.fontSize
						},
						formatter: "{a} <br/>{b}:{c}"
					},
					xAxis: {
						type: 'category',
						data: xData,
						axisLabel: {
							textStyle: {
								fontSize: this.fontSize
							}
						}
					},
					yAxis: {
						show: false,
						type: 'value'
					},
					series: [{
						name: '题目来源',
						data: seriesData,
						type: 'bar'
					}]
				};
				chart.setOption(option);
			},
			getSubjects() {
				let _this = this;
				this.$fetch(this.$api.url.school.subjects, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId
				}).then(function(res) {
					if(res.respCode == "success") {
						if(null != res.data && res.data.length > 0) {
							res.data.forEach(item => {
								_this.subjects.push({
									...item,
									resource: {},
									active: false,
									loaded: false
								});
							});
						}
					}
				}).catch(function(error) {

				});
			},
			getSubjectResource() {
				let _this = this;
				let sub = this.activeSub;
				if(_this.loading) {
					return false;
				}
				_this.loading = true;
				this.$fetch(this.$api.url.school.subjectResource, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					subjectId: sub.subjectId
				}).then(function(res) {
					if(res.respCode == "success") {
						sub.resource = res.data;
						sub.loaded = true;
						if(sub.subjectId == '0'){
							_this.allSub = sub;
						}
						_this.renderChart();
					}
					_this.loading = false;
				}).catch(function(error) {
					_this.loading = false;
				});
			}
		},
		mounted() {
			this.getSubjects();
			this.getSubjectResource();
		}
	}
</script>

<style>

</style>