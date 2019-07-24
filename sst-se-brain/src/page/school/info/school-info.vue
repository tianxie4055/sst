<template>
	<section class="section">
		<div class="about">
			<SchoolInfoIntroduce :schoolId="schoolId"></SchoolInfoIntroduce>
			<SchoolInfoAbout :schoolId="schoolId"></SchoolInfoAbout>
		</div>
	</section>
</template>

<script>
	import SchoolInfoIntroduce from './school-info-introduce.vue';
	import SchoolInfoAbout from './school-info-about.vue';
	export default {
		data() {
			return {
				
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		components: {
			SchoolInfoIntroduce,
			SchoolInfoAbout
		},
		methods: {
			
		},
		mounted() {
			
		}
	}
</script>

<style>

</style>