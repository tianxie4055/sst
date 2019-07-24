<template>
	<ul class="list-frame integral-list">
		<li>
			<SchoolPotOverviewType :schoolId="schoolId"></SchoolPotOverviewType>
		</li>
		<li>
			<SchoolPotOverviewApply :schoolId="schoolId"></SchoolPotOverviewApply>
		</li>
		<li>
			<SchoolPotOverviewTop :schoolId="schoolId"></SchoolPotOverviewTop>
		</li>
		<li>
			<SchoolPotOverviewDragonTiger :schoolId="schoolId"></SchoolPotOverviewDragonTiger>
		</li>
		<li>
			<SchoolPotOverviewTask :schoolId="schoolId"></SchoolPotOverviewTask>
		</li>
		<li>
			<SchoolPotOverviewGauge :schoolId="schoolId"></SchoolPotOverviewGauge>
		</li>
	</ul>
</template>

<script>
	import SchoolPotOverviewType from './school-pot-overview-type.vue';
	import SchoolPotOverviewApply from './school-pot-overview-apply.vue';
	import SchoolPotOverviewTop from './school-pot-overview-top.vue';
	import SchoolPotOverviewDragonTiger from './school-pot-overview-dragon-tiger.vue';
	import SchoolPotOverviewTask from './school-pot-overview-task.vue';
	import SchoolPotOverviewGauge from './school-pot-overview-gauge.vue';
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
			SchoolPotOverviewType,
			SchoolPotOverviewApply,
			SchoolPotOverviewTop,
			SchoolPotOverviewDragonTiger,
			SchoolPotOverviewTask,
			SchoolPotOverviewGauge
		},
		methods: {
			
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>