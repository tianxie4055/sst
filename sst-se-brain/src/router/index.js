import Vue from 'vue'
import Router from 'vue-router'
import School from '@/page/school/school'
import Login from '@/page/login'
import PotRule from '@/page/school/pot/school-pot-rule.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/school/:schoolId',
			props: true,
			component: School
		},
		{
			path: '',
			props: true,
			component: Login
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/pot-rule',
			component: PotRule
		}
	]
})