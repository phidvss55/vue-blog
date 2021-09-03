import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Blogs from '../views/Blogs.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import Admin from '../views/Admin.vue';
import Profile from '../views/Profile.vue';
import CreatePost from '../views/CreatePost.vue';
import BlogPreview from '../views/BlogPreview.vue';
import ViewBlog from '../views/ViewBlog.vue';
import EditBlog from '../views/EditBlog.vue';

import firebase from 'firebase/app';
import 'firebase/auth';

import { ADMIN_EMAIL } from '../constants';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home blog',
      requiresAuth: false
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    meta: {
      title: 'Blogs',
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
      requiresAuth: false
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'ForgotPassword',
      requiresAuth: false
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Admin',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth: true
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title: 'CreatePost',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/blog-preview',
    name: 'BlogPreview',
    component: BlogPreview,
    meta: {
      title: 'BlogPreview',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/view-blog/:blogid',
    name: 'ViewBlog',
    component: ViewBlog,
    meta: {
      title: 'ViewBlog',
      requiresAuth: false
    }
  },
  {
    path: '/edit-blog/:blogid',
    name: 'EditBlog',
    component: EditBlog,
    meta: {
      title: 'EditBlog',
      requiresAuth: true,
      requiresAdmin: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// middleware trigger create title
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Fireblog`;
  next();
});

// router guards
router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  let admin = null;
  if (user) {
    let token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }

  if (!admin) {
    console.log(ADMIN_EMAIL);
    if (user.email === ADMIN_EMAIL) {
      admin = user;
    }
  }

  if (to.matched.some(res => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some(res => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: 'home' });
      }
      return next();
    }
    return next({ name: 'home' });
  }
  return next();
});

// export this router
export default router;
