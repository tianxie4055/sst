<template>
	<div class="evaluate-info-box">
		<div class="evaluate-info-left">
			<div class="evaluateIL-img">
				<img :src="activeChannel.lastSnapImage==''?defaultChannelImg:activeChannel.lastSnapImage" @error="renderErrorDefaultSrc" v-show="!playing">
				<div id="monitorPlay" v-show="playing"></div>
			</div>
		</div>
		<div class="evaluate-info-right" v-if="info.teachingId != ''">
			<div class="evaluateIR-info">
				<div class="evaluateIRI-left">
					<div class="evaluate-code">
						<qriously id="qrcode-area-canvas" :value="info.qrcodeUrl" :size="qrcodeSize" style="background:#fff;text-align:center;" v-if="info.qrcodeUrl!=null&&info.qrcodeUrl!=''" />
					</div>
					<div class="evaluate-code-title">评课二维码</div>
				</div>
				<ul class="evaluateIRI-right">
					<li><label>主题</label><span>{{info.teachingTopic}}</span></li>
					<li><label>时间</label><span>{{info.teachingTime}}</span></li>
					<li><label>地点</label><span>{{info.classroomName}}</span></li>
					<li><label>班级</label><span>{{info.className}}</span></li>
					<li><label>教师</label><span>{{info.teacherName}}</span></li>
					<li><label>归属课程</label><span>{{info.courseName}}</span></li>
				</ul>
			</div>
			<div class="evaluateIR-icon">
				<div class="evaluateIR-process" id="teaching_comment_result_1"></div>
				<div class="evaluateIR-teaching" id="teaching_comment_result_2"></div>
			</div>
		</div>
		<div class="opt-area">
			<a href="javascript:;" @click="backup()">返回评课列表</a>
		</div>
	</div>
</template>

<script>
	import defaultImg from '../../../assets/images/evaluate.jpg';
	export default {
		data() {
			let _this = this;
			return {
				defaultChannelImg: defaultImg,
				info: {},
				loading: false,
				qrcodeSize: 0,
				resultChartPrefix: 'teaching_comment_result_',
				typeName: {
					'1': '上课过程',
					'2': '教案'
				},
				channelIndex: 0,
				activeChannel: {},
				swiper: null,
				swiperOption: {
					freeMode: true,
					slidesPerView: 'auto'
				},
				playing: false,
				player: null,
				playerOptions: {
					height: '360',
					autoplay: true, // 自动播放
					controls: true, // 是否显示控制栏
					live: true,
					techOrder: ['flash'],
					flash: {
						swf: '../../../../static/libs/videojs/media/video-js.swf'
					},
					sources: [{
						type: 'rtmp/flv',// rtmp/flv
						src: '',
						withCredentials: false
					}],
					poster: "../../../../static/libs/videojs/media/surmon.jpg",
					controlBar: {
						timeDivider: false, // 时间分割线
						durationDisplay: false, // 总时间
						remainingTimeDisplay: false,
						progressControl: true, // 进度条
						customControlSpacer: false, // 未知
						fullscreenToggle: true, // 全屏
						currentTimeDisplay: false
					}
				},
				fontSize: this.$common.getDpr(),
				gaugeWidth: this.$common.getGaugeWidth(),
				gaugeDistance: this.$common.getGaugeDistance(),
				liveUrlArr: [
					//'rtmp://10.245.84.4/live/c3',
					//'rtmp://10.245.84.10/live/c2',
					'rtmp://10.245.84.4/live/c31'
				]
			}
		},
		props: {
			schoolId: {
				required: true
			},
			roomId: {
				required: true
			},
			classRoomId: {
				required: true
			}
		},
		methods: {
			backup() {
				this.$emit('tabChange', 'list');
			},
			renderErrorDefaultSrc(e) {
				e.target.src = this.defaultChannelImg;
			},
			viewChannel(index){
				this.channelIndex = index;
				this.activeChannel = this.info.channels[index];
				if(this.player != null){
					this.player.dispose();
					this.player = null;
					this.$common.videoPlayer = null;
				}
				this.viewClassMonitor();
			},
			viewClassMonitor(){
				this.playing = true;
				let $monitorPlay = $('#monitorPlay');
				$monitorPlay.html('<video id="monitor-video-player" class="video-js vjs-default-skin" controls preload="auto" style="width:100%;height:100%;"></video>');
				let options = $.extend({}, this.playerOptions);
				options.sources[0].src = this.activeChannel.liveUrl;
				//options.sources[0].src = this.liveUrlArr[this.channelIndex];
				//options.techOrder = ['html5', 'flash'];
				//options.sources[0].type = 'video/mp4';
				//options.sources[0].src = 'http://localhost:9099/seuc/upfile/haomei.mp4';
				this.player = videojs('monitor-video-player', options);
				this.$common.videoPlayer = this.player;
				this.player.play();
			},
			initChannel(){
				this.$nextTick(() => {
					this.viewChannel(0);
				});
			},
			setQrcodeSize() {
				this.qrcodeSize = $('.evaluate-code').width();
			},
			renderResultChart(type) {
				let data = this.info['result'][type];
				let chart = this.$echarts.init(document.getElementById(this.resultChartPrefix + type));
				let indicatorData = [],
					seriesData = data.scores || [];
				if(null != data && null != data.details && data.details.length > 0) {
					data.details.forEach(item => {
						indicatorData.push({
							name: item.text,
							max: item.max
						});
					});
				}
				let title = this.typeName[type] + '评价结果';
				let option = {
					title: {
						text: title,
						bottom: 0,
						left: 'center',
						textStyle: {
							color: '#f57f17',
							fontSize: this.fontSize
						}
					},
					tooltip: {
						textStyle: {
							fontSize: this.fontSize
						},
						position: function(point, params, dom, rect, size) {
							return [params[0] - 220, '10%'];
						}
					},
					radar: {
						name: {
							textStyle: {
								color: '#39b5ac',
								fontSize: this.fontSize
							}
						},
						radius: '60%',
						indicator: indicatorData
					},
					series: [{
						type: 'radar',
						areaStyle: {
							normal: {}
						},
						data: [{
							value: seriesData,
							name: title
						}]
					}]
				};
				chart.setOption(option);
			},
			getResult(type) {
				let _this = this;
				this.$fetch(this.$api.url.school.teachingCommentDetailResult, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					teachingId: this.info.teachingId,
					//teachingId: 221,
					busiType: type
				}).then(function(res) {
					if(res.respCode == "success") {
						_this.info['result'][type] = res.data;
						_this.renderResultChart(type);
					}
				}).catch(function(error) {

				});
			},
			getInfo() {
				let _this = this;
				this.$fetch(this.$api.url.school.teachingCommentDetail, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					roomId: this.roomId,
					classroomId: this.classRoomId
				}).then(function(res) {
					if(res.respCode == "success") {
						_this.info = res.data;
						_this.info['result'] = {};
						setTimeout(function() {
							_this.initChannel();
							if(null != _this.info.teachingId && '' != _this.info.teachingId){
								_this.setQrcodeSize();
								_this.getResult(1);
								if(_this.info.planId != '') {
									_this.getResult(2);
								}
							}
						}, 10);
					}
				}).catch(function(error) {

				});
			}
		},
		mounted() {
			this.getInfo();
		},
		watch: {
			roomId: function(val, oldVal) {
				if(val != oldVal) {
					this.getInfo();
				}
			}
		}
	}
</script>

<style scoped>
	.evaluate-info-box .evaluate-info-left .evaluateIL-img{
		height: 100%;
	}
	#monitorPlay {
		width: 100%;
		height: 100%;
	}
	#monitorPlay .video-area{
		width: 100%;
		height: 100%;
	}
	.opt-area {
		position: absolute;
		bottom: 10px;
		right: 10px;
		z-index: 100;
	}
</style>