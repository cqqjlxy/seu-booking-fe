import { createRouter, createWebHistory } from "vue-router"
import Home from "/src/views/Home.vue"
import Login from "/src/views/Login.vue"
import Register from "/src/views/Register.vue"
import { useAuthStore } from "/src/stores/auth.js"


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isLoggedIn) {
        next({ name: 'Login' });
    } else {
        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
            window.location.replace(`https://${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${window.location.pathname}`);
        } else {
            next();
        }
    }
})

export default router