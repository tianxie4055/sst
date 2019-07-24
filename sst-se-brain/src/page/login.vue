<template>
	<div class="login-body">
		<div class="login-left">
			<img src="../assets/images/login_left.png">
		</div>
		<div class="login-right">
			<img src="../assets/images/login_right.png">
		</div>
		<div class="login-title">校园大脑</div>
		<div class="login-box">
			<div class="login-logo">
				<img src="../assets/images/login.png" alt="">
				<h1>庆元县五都小学</h1>
			</div>
			<div class="login-info">
				<div class="tips" v-if="ispromt">{{ promtmsg }}</div>
				<div class="inputRegion">
					<label>用户名</label>
					<input v-model="loginName" type="text" autocomplete="off" />
				</div>
				<div class="inputRegion">
					<label>密码</label>
					<input v-model="password" type="password" autocomplete="off" />
				</div>
				<input class="loginBtn" type="button" @click="login" value="登陆">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				loginName: "13506820520",
				password: "123456a",
				ispromt: false,
				promtmsg: ""
			}
		},
		methods: {
			checkForm() {
				if($.trim(this.loginName) == '') {
					this.ispromt = true;
					this.promtmsg = '用户名不能为空';
					return false;
				}
				if($.trim(this.password) == '') {
					this.ispromt = true;
					this.promtmsg = '密码不能为空';
					return false;
				}
				this.ispromt = false;
				this.promtmsg = '';
				return true;
			},

			login: function() {
				let _this = this;
				if(!this.checkForm()) return false;
				this.$post(this.$api.url.login, {
					loginName: _this.loginName,
					password: _this.password
				}).then(function(res) {
					if(res.respCode == "success") {
						_this.ispromt = true;
						_this.promtmsg = '登录成功';
						sessionStorage['tokenId'] = res.data.tokenId;
						sessionStorage['nickName'] = res.data.nickName;
						sessionStorage['schoolId'] = res.data.schoolId;
						setTimeout(function(){
							_this.$router.push('/school/' + res.data.schoolId);
						}, 1000);
					} else {
						_this.ispromt = true;
						_this.promtmsg = res.data.msg;
					}
				}).catch(function(error) {
					_this.ispromt = true;
					_this.promtmsg = '登录失败';
				});
			}
		}
	}
</script>