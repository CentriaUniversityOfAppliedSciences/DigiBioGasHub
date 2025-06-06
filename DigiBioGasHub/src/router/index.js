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
import UsersPage from '../views/Admin/UsersPage.vue';
import CompaniesPage from '../views/Admin/CompaniesPage.vue';
import ChatComponent from '../components/ChatComponent.vue';
import MaterialsPage from '../views/Admin/MaterialsPage.vue';
import SettingsPage from '../views/Admin/SettingsPage.vue';
import ReportsPage from '../views/Admin/ReportsPage.vue';
import ChatUserList from '../components/ChatUserList.vue';
import PrivateChatComponent from '../components/PrivateChatComponent.vue';
import ChatPageView from '../views/ChatPageView.vue';
import CompanyOffersPage from '../views/Company/OffersPage.vue';
import EditOfferPage from '../views/Company/EditOfferPage.vue';
import LoginPage from '../views/LoginPage.vue';
import JoinCompanyPage from '../views/JoinCompanyPage.vue';
import ContractHistoryPage from '../views/Company/ContractHistoryPage.vue';
import ContractsPage from '../views/ContractsPage.vue';
import UserSettingsPage from '../views/SettingsPage.vue';
import LogisticsRegisterComponent from '../components/LogisticsRegisterComponent.vue';
import LogisticsPage from '../views/LogisticsPage.vue';

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

function checkUser(to, from, next) {
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
    path: '/login',
    name: 'Login',
    component: LoginPage
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
    path: '/admin/manage-users',
    name: 'UsersPage',
    component: UsersPage,
    beforeEnter: [checkAdmin]
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
    path: '/admin/manage-companies',
    name: 'CompaniesPage',
    component: CompaniesPage,
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
    path: '/offers/edit/:id',
    name: 'CompanyEditOffer',
    component: EditOfferPage,
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
    }
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
    path: '/contractHistory/:id',
    name: 'ContractHistory',
    component: ContractHistoryPage,
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
    }
  },
  {
    path: '/company',
    name: 'Company',
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
    component: CompanyPage
  },
  {
    path: '/companyoffers:/:id',
    name: 'CompanyOffers',
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
    component: CompanyOffersPage
  },
  {
    path: '/logisticsregister',
    name: 'LogisticsRegister',
    component: LogisticsRegisterComponent
  },
  {
    path: '/logistics',
    name: 'Logistics',
    component: LogisticsPage,
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
    }
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
    path: '/settings',
    name: 'Settings',
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
    component: UserSettingsPage
  },
  {
    path: "/contracts",
    name: "ContractsPage",
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
    component: ContractsPage
  },
  {
    path: '/knowledge-base',
    name: 'Knowledge Base',
    component: KnowledgeBasePage
  },
  {
    path: '/admin/materials',
    name: 'MaterialsPage',
    component: MaterialsPage,
    beforeEnter: [checkAdmin]
  },
  {
    path: '/admin/settings',
    name: 'SettingsPage',
    component: SettingsPage,
    beforeEnter: [checkAdmin]
  },
  {
    path: '/admin/reports',
    name: 'ReportsPage',
    component: ReportsPage,
    beforeEnter: [checkAdmin]
  },
  {
    path: '/chat',
    name: 'ChatPageView',
    component: ChatPageView,
    beforeEnter:[checkUser]
  },
  {
    path: "/chat/:roomId/:roomTitle",
    name: "Chat",
    component: ChatComponent,
    beforeEnter:[checkUser]
  },
  {
    path: "/privateChat",
    name: "ChatUserList",
    component: ChatUserList,
    beforeEnter:[checkUser]
},
{
    path: "/privateChat/:recipientId/:recipientName",
    name: "PrivateChat",
    component: PrivateChatComponent,
    beforeEnter:[checkUser]
},
{
  path: "/join-company/:companyId/:invitationId",
  name: "JoinCompanyPage",
  component: JoinCompanyPage
},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})



export default router
