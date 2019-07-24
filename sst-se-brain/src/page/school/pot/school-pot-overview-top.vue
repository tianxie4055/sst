<template>
	<div class="integralBox">
		<div class="integral-title">
			<h1>总积分排行榜</h1>
			<div class="subblockTab">
				<a href="javasrcipt:;" :class="tabActive(index)" @click="tabChange(index)" v-for="(item, index) in tabList" :key="index">{{item.name}}</a>
			</div>
		</div>
		<div class="integral-info integral-icon">
			<swiper :options="swiperOption" class="list-swiper" ref="schoolPotOverviewTopSwiper">
				<swiper-slide v-for="(item,index) in tabList" :key="index">
					<div class="integral-data">
						<table class="table-integral" v-if="item.loaded">
							<tbody>
								<tr v-for="(dataItem, dataIndex) in item.data" :key="dataIndex" v-if="null!=item.data&&item.data.length>0">
									<td>{{dataItem.rank}}</td>
									<td>{{dataItem.itemName}}</td>
									<td>{{dataItem.itemCnt}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		data() {
			let _this = this;
			return {
				type: 1,
				topCnt: 10,
				tabIndex: 0,
				tabList: [
					{
						type: 1,
						name: '老师',
						className: 'ubblockTab-teacher',
						loaded: false,
						loading: false,
						data: []
					},
					{
						type: 2,
						name: '学生',
						className: 'ubblockTab-student',
						loaded: false,
						loading: false,
						data: []
					},
					{
						type: 3,
						name: '班级',
						className: 'ubblockTab-class',
						loaded: false,
						loading: false,
						data: []
					}
				],
				swiperOption: {
					on: {
						slidePrevTransitionStart: function(){
							_this.slideChange(this.activeIndex);
						},
						slideNextTransitionStart: function(){
							_this.slideChange(this.activeIndex);
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
			tabActive(index){
				let tab = this.tabList[index];
				return tab.className + (this.tabIndex == index ? ' active' : '');
			},
			tabChange(index){
				this.swiper.slideTo(index);
				this.slideChange(index);
			},
			slideChange(index){
				this.tabIndex = index;
				let tab = this.tabList[index];
				this.type = tab.type;
				if(tab.loaded){
					return false;
				}
				this.fetchData();
			},
			fetchData() {
				let _this = this;
				let tab = this.tabList[this.tabIndex];
				if(tab.loading){
					return false;
				}
				tab.loading = true;
				this.$fetch(this.$api.url.school.potTotalRank, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					objType: this.type,
					topCnt: this.topCnt
				}).then(function(res) {
					if(res.respCode == "success") {
						tab.data = res.data;
						tab.loaded = true;
					}
					tab.loading = false;
				}).catch(function(error) {
					tab.loading = false;
				});
			}
		},
		computed: {
			swiper() {
				return this.$refs.schoolPotOverviewTopSwiper.swiper;
			}
		},
		mounted() {
			this.tabChange(this.tabIndex);
		}
	}
</script>

<style scoped>
.swiper-container{width:100%;height:100%;}
.integral-data{width:100%;height:100%;overflow:auto;}
</style>