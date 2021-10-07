import {createRouter, createWebHistory} from 'vue-router';

import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';
import Upload from '../views/Upload.vue';
import Trainee from '../views/Trainee.vue';
// import App from '../App.vue';


const routes = [
    {
        path: "/",
        name: "Home",
        component: Login
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin
    },
    {
        path: "/upload",
        name: "Upload",
        component: Upload
    },
    {
        path: "/trainee",
        name: "Trainee",
        component: Trainee
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;