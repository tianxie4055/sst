<template>
	<div class="about-img-box">
		<div class="about-view" v-if="null!=list && list.length>0">
			<swiper class="gallery-top" :options="swiperTopOption" ref="schoolInfoIntroduceTopSwiper">
				<swiper-slide v-for="(item,index) in list" :key="index">
					<a href="javascript:;" v-if="item.type=='image'"><img :src="item.url"></a>
					<video :id="item.fileId" class="video-js" controls preload :poster="item.bgImg" v-if="item.type=='video'">
						<source :src="item.url" type="video/mp4">
					</video>
				</swiper-slide>
				<div class="swiper-button-prev arrow-left" slot="button-prev" @click="slidePrev()"></div>
				<div class="swiper-button-next arrow-right" slot="button-next" @click="slideNext()"></div>
			</swiper>
		</div>
		<div class="about-preview" v-if="null!=list && list.length>0">
			<swiper class="gallery-thumbs" :options="swiperThumbsOption" ref="schoolInfoIntroduceThumbsSwiper">
				<swiper-slide :class="navActive(index)" v-for="(item,index) in list" :key="index">
					<a href="javascript:;" v-if="item.type=='image'" @click="slideChange(index)"><img :src="item.url"/></a>
					<a href="javascript:;" v-if="item.type=='video'" @click="slideChange(index)"><img :src="item.bgImg"/></a>
				</swiper-slide>
			</swiper>
			<div class="swiper-button-prev arrow-left" @click="slidePrev()"></div>
			<div class="swiper-button-next arrow-right" @click="slideNext()"></div>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		data() {
			let _this = this;
			return {
				activeIndex: 0,
				list: [],
				topSwiper: null,
				thumbsSwiper: null,
				swiperTopOption: {
					
				},
				swiperThumbsOption: {
					freeMode: true,
					slidesPerView: 'auto'
				}
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
			navActive(index) {
				return this.activeIndex == index ? 'active-nav' : '';
			},
			initSwiperEvent(){
				let _this = this;
				this.topSwiper.on('slidePrevTransitionEnd', function(){
					_this.handlePreviousSilde(this.previousIndex);
					if(this.activeIndex < 0){
						_this.activeIndex = _this.thumbsSwiper.slides.length - 1;
					}else{
						_this.activeIndex = this.activeIndex;
					}
					_this.thumbsSwiper.slideTo(_this.activeIndex);
				}).on('slideNextTransitionEnd', function(){
					_this.handlePreviousSilde(this.previousIndex);
					if(this.activeIndex > _this.thumbsSwiper.slides.length - 1){
						_this.activeIndex = 0;
					}else{
						_this.activeIndex = this.activeIndex;
					}
					_this.thumbsSwiper.slideTo(_this.activeIndex);
				});
			},
			handlePreviousSilde(index){
				let item = this.list[index];
				if(item.type == 'video'){
					var video = document.getElementById(item.fileId);
					if(!video.paused){
						video.pause();
					}
				}
			},
			slidePrev(){
				this.slideChange(this.activeIndex - 1);
			},
			slideNext(){
				this.slideChange(this.activeIndex + 1);
			},
			slideChange(index){
				if(index > this.thumbsSwiper.slides.length - 1){
					index = 0;
				}else if(index < 0){
					index = this.thumbsSwiper.slides.length - 1;
				}
				this.activeIndex = index;
				this.topSwiper.slideTo(index);
				this.thumbsSwiper.slideTo(index);
			}
		},
		mounted() {
			let _this = this;
			let school = JSON.parse(window.sessionStorage.getItem('school'));
			let list = school.imageVideos || [];
			list.forEach((item, index) => {
				_this.list.push({
					...item,
					fileId: 'file_' + index
				});
			});
			this.$nextTick(() => {
				this.topSwiper = this.$refs.schoolInfoIntroduceTopSwiper.swiper;
				this.thumbsSwiper = this.$refs.schoolInfoIntroduceThumbsSwiper.swiper;
				this.initSwiperEvent();
			});
		}
	}
</script>

<style scoped>
	.video-js{
		width: 100%;
		height: 100%;
	}
	.gallery-thumbs .swiper-slide {
		opacity: 0.4;
	}
	
	.gallery-thumbs .swiper-slide.active-nav {
		opacity: 1;
	}
</style>