<template>
	<div class="about-text-box">
		<ul>
			<li class="active">
				<h1 class="about-title">学校简介</h1>
				<div class="about-info">
					<div class="about-info-text" v-html="school.description"></div>
				</div>
			</li>
			<li>
				<h1 class="about-title">办学理念</h1>
				<div class="about-info" v-html="school.schoolRunningIdea"></div>
			</li>
			<li>
				<h1 class="about-title">办学宗旨</h1>
				<div class="about-info" v-html="school.schoolRunningMission"> </div>
			</li>
			<li>
				<h1 class="about-title">办学特色</h1>
				<div class="about-info" v-html="school.schoolRunningVision"></div>
			</li>
			<li>
				<h1 class="about-title">发展目标</h1>
				<div class="about-info" v-html="school.schoolDevelopmentGoal"></div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			let school = JSON.parse(window.sessionStorage.getItem('school'));
			return {
				school: school
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		methods: {
			
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>