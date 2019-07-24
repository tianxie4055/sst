<template>
	<section class="section">
		<keep-alive>
			<SchoolTeachingCommentList :schoolId="schoolId" @viewDetail="viewDetail" v-if="type=='list'"></SchoolTeachingCommentList>
			<SchoolTeachingCommentInfo :schoolId="schoolId" :roomId="roomId" :classRoomId="classRoomId" @tabChange="tabChange" v-if="type=='info'"></SchoolTeachingCommentInfo>
		</keep-alive>
	</section>
</template>

<script>
	import SchoolTeachingCommentList from './school-teaching-comment-list.vue';
	import SchoolTeachingCommentInfo from './school-teaching-comment-info.vue';
	export default {
		data() {
			return{
				type: 'list', // list/info
				roomId: null,
				classRoomId: null
			}
		},
		props: {
			schoolId: {
				required: true
			}
		},
		components: {
			SchoolTeachingCommentList,
			SchoolTeachingCommentInfo
		},
		methods: {
			viewDetail(roomId, classRoomId){
				this.roomId = roomId;
				this.classRoomId = classRoomId;
				this.type = 'info';
			},
			tabChange(type){
				this.type = type;
			}
		},
		mounted() {
			
		}
	}
</script>

<style>

</style>