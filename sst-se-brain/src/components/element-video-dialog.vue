<template>
	<el-dialog 
		:visible.sync="visible" 
		:title="title" 
		:width="width" 
		:fullscreen="fullscreen" 
		:top="top" 
		:modal="modal" 
		:modal-append-to-body="modalAppendToBody" 
		:append-to-body="appendTobody" 
		:lock-scroll="lockScroll" 
		:custom-class="customClass" 
		:close-on-click-modal="closeOnClickModal" 
		:close-on-press-escape="closeOnPressEscape" 
		:show-close="showClose" 
		:before-close="beforeClose" 
		:center="center" 
		@open="open" 
		@opened="opened" 
		@close="close" 
		@closed="closed">
		<div class="video-dialog"></div>
	</el-dialog>
</template>

<script>
	export default {
		name: 'element-video-dialog',
		props: {
			title: {
				type: String
			},
			width: {
				type: String,
				default: '50%'
			},
			fullscreen: {
				type: Boolean,
				default: false
			},
			top: {
				type: String,
				default: '15vh'
			},
			modal: {
				type: Boolean,
				default: true
			},
			modalAppendToBody: {
				type: Boolean,
				default: true
			},
			appendTobody: {
				type: Boolean,
				default: true
			},
			lockScroll: {
				type: Boolean,
				default: true
			},
			customClass: {
				type: String
			},
			closeOnClickModal: {
				type: Boolean,
				default: false
			},
			closeOnPressEscape: {
				type: Boolean,
				default: false
			},
			showClose: {
				type: Boolean,
				default: true
			},
			beforeClose: {
				type: Function
			},
			center: {
				type: Boolean,
				default: false
			},
			show: {
                type: Boolean,
                default: false
            },
			videoId: {
				type: String,
				default: 'dialog-video-player'
			},
			videoSrc: {
				type: String,
				required: true
			},
			videoType: {
				type: String
			},
			techOrder: {
				type: Array
			}
		},
		data() {
			let videoContent = '<video id="' + this.videoId + '" class="video-js vjs-default-skin" controls preload="auto"></video>'
			return {
				contentEl: '.video-dialog',
				visible: this.show,
				content: videoContent,
				player: null,
				playerOptions: {
					height: '360',
					autoplay: true, // 自动播放
					controls: true, // 是否显示控制栏
					live: true,
					techOrder: ['html5', 'flash'],
					flash: {
						swf: '../../static/libs/videojs/media/video-js.swf'
					},
					sources: [{
						type: 'video/mp4',
						src: '',
						withCredentials: false
					}],
					poster: "../../static/libs/videojs/media/surmon.jpg",
					controlBar: {
						timeDivider: false, // 时间分割线
						durationDisplay: false, // 总时间
						remainingTimeDisplay: false,
						progressControl: true, // 进度条
						customControlSpacer: false, // 未知
						fullscreenToggle: true, // 全屏
						currentTimeDisplay: false
					}
				}
			};
		},
		methods: {
			open() {
				this.$emit('open');
			},
			opened() {
				this.$emit('opened');
				$(this.contentEl).html(this.content);
				let options = $.extend({}, this.playerOptions);
				if(null != this.techOrder){
					options.techOrder = this.techOrder;
				}
				options.sources[0].src = this.videoSrc;
				if(null != this.videoType){
					options.sources[0].type = this.videoType;
				}
				this.player = videojs(this.videoId, options);
				this.player.play();
			},
			close() {
				this.$emit('close');
				this.$emit('update:show', false);
			},
			closed() {
				this.$emit('closed');
				if(null != this.player){
					this.player.dispose();
					this.player = null;
				}
				$(this.contentEl).html('');
			}
		},
		mounted() {
			
		},
        watch: {
            show () {
                this.visible = this.show;
            }
        }
	};
</script>

<style scoped>
.video-dialog{width:100%;height:100%;}
.video-dialog video{width:100%;}
</style>