import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { 
        path: '/', 
        redirect: { name: "People", params: { filters: 'without__filters' } }
    },
    { 
        path: '/people', 
        redirect: { name: "People", params: { filters: 'without__filters' } }
    },
    {
      path: '/people/:filters',
      name: 'People',
      component: () => import('@/pages/People'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/pages/404'),
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if(!to.matched.length) next('/404')
    else next();
})
  
export default router