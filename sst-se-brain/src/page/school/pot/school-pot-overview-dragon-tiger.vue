<template>
	<div class="integralBox">
		<div class="integral-title">
			<h1>教师龙虎榜</h1>
		</div>
		<div class="integral-info">
			<ul class="teacher-rankings">
				<li v-for="(item, index) in list" :key="index">
					<div class="rankings-head">
						<img :src="item.largePicture==''?defaultAvatar:item.largePicture" @error="renderErrorDefaultSrc">
					</div>
					<div class="rankings-name">{{item.itemName}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Avatar from '../../../assets/images/head.png';
	export default {
		data() {
			return {
				defaultAvatar: Avatar,
				topCnt: 10,
				list: []
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		methods: {
			renderErrorDefaultSrc(e) {
				e.target.src = this.defaultAvatar;
			},
			fetchData() {
				let _this = this;
				if(_this.loading){
					return false;
				}
				_this.loading = true;
				this.$fetch(this.$api.url.school.potTeacherRank, {
					tokenId: sessionStorage.tokenId,
					schoolId: this.schoolId,
					topCnt: this.topCnt
				}).then(function(res) {
					if(res.respCode == "success") {
						_this.list = res.data;
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