import { createRouter, createWebHistory } from '@ionic/vue-router';

import HomePage from '../views/HomePage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import MapPage from '../views/MapPage.vue';
import AddBlogPostPage from '../views/Admin/AddBlogPostPage.vue';
import BlogListingPage from '../views/BlogListingPage.vue';
import BlogPage from '../views/BlogPage.vue';
import OfferPage from '../views/OfferPage.vue';
import MarketplacePage from '../views/MarketplacePage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import ProductPage from '../views/ProductPage.vue';
import CompanyPage from '../views/CompanyPage.vue';
import KnowledgeBasePage from '../views/KnowledgeBasePage.vue';
import ManageBlogPosts from '../views/Admin/ManageBlogPosts.vue';
import EditBlogPostPage from '../views/Admin/EditBlogPostPage.vue';

export function jwtDecode(token) {
  try {
      return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
      return null;
  }
}
function checkAdmin(to, from, next) {
  let token = localStorage.getItem('token')
      if (token) {
        if (jwtDecode(token).userlevel === 99) {
        next()
        }
        else {
          next('/home')
        }
      } else {
        next('/home')
      }
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/map',
    name: 'Map',
    component: MapPage
  },
  {
    path: '/admin/add-blog-post',
    name: 'AddBlogPost',
    component: AddBlogPostPage,
    beforeEnter: [checkAdmin] 
  },
  {
    path: '/admin/edit-blog-post/:postID/:title',
    name: 'EditBlogPostPage',
    component: EditBlogPostPage,
    beforeEnter: [checkAdmin]
  },
  {
    path: '/admin/manage-blog-post',
    name: 'ManageBlogPosts',
    component: ManageBlogPosts,
    beforeEnter: [checkAdmin] 
  },
  {
    path: '/blog/:postID/:title',
    name: 'Blog',
    component: BlogPage
  },
  {
    path: '/articles',
    name: 'Articles Listing',
    component: BlogListingPage
  },
  {
    path: '/offers/:id',
    name: 'Product Offer',
    component: OfferPage
  },
  {
    path: '/products',
    name: 'Marketplace',
    component: ProductPage
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: MarketplacePage
  },
  {
    path: '/company',
    name: 'Company',
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem('token')
      if (token) {
        if (jwtDecode(token).userlevel >= 20) {
        next()
        }
        else {
          next('/home')
        }
      } else {
        next('/home')
      }
    },
    component: CompanyPage
  },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem('token')
      if (token) {
        if (jwtDecode(token).userlevel >= 1) {
        next()
        }
        else {
          next('/home')
        }
      } else {
        next('/home')
      }
    },
    component: ProfilePage
  },
  {
    path: '/knowledge-base',
    name: 'Knowledge Base',
    component: KnowledgeBasePage
  }
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})



export default router
