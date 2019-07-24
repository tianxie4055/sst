<template>
	<section class="section">
		<div class="history">
			<swiper :options="swiperOption" class="swiper-history" ref="schoolHistorySwiper">
				<swiper-slide v-for="(item,index) in list" :key="index">
					<div class="history-img">
						<img :src="item.imageurl">
					</div>
					<div class="history-line"></div>
					<div class="history-spot">{{getIndex(index)}}</div>
					<div class="history-text">
						<h1>{{item.occurTime}}</h1>
						<div class="introduce" v-html="item.title"></div>
					</div>
				</swiper-slide>
				<!-- 如果需要滚动条 -->
				<div class="swiper-scrollbar"></div>
			</swiper>
			<div class="school-history-next icon-button-next" slot="button-next"><i class="iconfont icon-right"></i></div>
			<div class="school-history-prev icon-button-prev" slot="button-prev"><i class="iconfont icon-left"></i></div>
			<div class="history-timeline"></div>
		</div>
	</section>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		data() {
			let _this = this;
			return {
				pageIndex: 1,
				pageSize: 10,
				list: [],
				hasMore: true,
				loading: false,
				swiperOption: {
					slidesPerView: 6,
					spaceBetween: 30,
					navigation: {
				        nextEl: '.school-history-next',
				        prevEl: '.school-history-prev',
				    },
					scrollbar: {
						el: '.swiper-scrollbar'
					},
					on: {
						reachEnd: function(){
							if(_this.pageIndex > 1){
								_this.fetchData();
							}
						}
					}
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
			getIndex(index){
				index += 1;
				return index < 10 ? '0' + index : '' + index;
			},
			fetchData(){
				let _this = this;
				if(this.loading || !this.hasMore){
					return false;
				}
				this.loading = true;
				this.$fetch(this.$api.url.school.historyList, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}).then(function(res) {
					if(res.respCode == "success") {
						if(res.data.total > 0) {
							_this.pageIndex++;
							_this.list = _this.list.concat(res.data.items);
						}
						_this.hasMore = _this.$api.hasMore(res.data.total, res.data.pageIndex, res.data.pageSize);
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