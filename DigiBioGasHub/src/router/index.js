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
import LandingPage from '../views/LandingPage.vue';
import LogisticsRegisterComponent from '../components/LogisticsRegisterComponent.vue';
import LogisticsPage from '../views/LogisticsPage.vue';
import CompanyUsersPage from '../views/Company/CompanyUsersPage.vue';
import GDPRPage from '../views/GDPRPage.vue';
import ToSPage from '../views/ToSPage.vue';
import CompanyAnalyticsPage from '../views/Company/CompanyAnalyticsPage.vue';
import AnalyticsPage from '../views/Admin/AnalyticsPage.vue';
import CompanyLocationsPage from '../views/Company/CompanyLocationsPage.vue';
import CompanyLocationRegisterComponent from '../components/CompanyLocationRegisterComponent.vue';
import ApiKeysPage from '../views/ApiKeysPage.vue';
import SubscriptionPage from '../views/SubscriptionPage.vue';
import BuySubscriptionPage from '../views/BuySubscriptionPage.vue';

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
    path: '/welcome',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
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
    component: MapPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/manage-users',
    name: 'UsersPage',
    component: UsersPage,
    beforeEnter: [checkAdmin],
    meta: { requiresAuth: true }
  },

  {
    path: '/admin/add-blog-post',
    name: 'AddBlogPost',
    component: AddBlogPostPage,
    beforeEnter: [checkAdmin],
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/edit-blog-post/:postID/:title',
    name: 'EditBlogPostPage',
    component: EditBlogPostPage,
    beforeEnter: [checkAdmin],
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/manage-blog-post',
    name: 'ManageBlogPosts',
    component: ManageBlogPosts,
    beforeEnter: [checkAdmin] ,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/manage-companies',
    name: 'CompaniesPage',
    component: CompaniesPage,
    beforeEnter: [checkAdmin],
    meta: { requiresAuth: true }
  },
  {
    path: '/blog/:postID/:title',
    name: 'Blog',
    component: BlogPage,
    meta: { requiresAuth: true  }
  },
  {
    path: '/articles',
    name: 'Articles Listing',
    component: BlogListingPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/offers/:id',
    name: 'Product Offer',
    component: OfferPage,
    meta: { requiresAuth: true }
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
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'Marketplace',
    component: ProductPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: MarketplacePage,
    meta: { requiresAuth: true }
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
    },
    meta: { requiresAuth: true }
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
    component: CompanyPage,
    meta: { requiresAuth: true }
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
    component: CompanyOffersPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/companyusers:/:id',
    name: 'CompanyUsers',
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
    component: CompanyUsersPage,
  },
  {
    path: '/companyanalytics',
    name: 'CompanyAnalytics',
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
    component: CompanyAnalyticsPage
  },
  {
    path: '/companylocations',
    name: 'CompanyLocations',
    component: CompanyLocationsPage

  },
  {
    path: '/companylocationregister',
    name: 'CompanyLocationRegister',
    component: CompanyLocationRegisterComponent

  },
  {
    path: '/logisticsregister',
    name: '',
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
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/api-keys',
    name: 'ApiKeysPage',
    component: ApiKeysPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/mysubscription',
    name: 'SubscriptionPage',
    component: SubscriptionPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/subscription',
    name: 'BuySubscriptionPage',
    component: BuySubscriptionPage,
    meta: { requiresAuth: true }
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
    component: UserSettingsPage,
    meta: { requiresAuth: true }
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
    component: ContractsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/knowledge-base',
    name: 'Knowledge Base',
    component: KnowledgeBasePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/materials',
    name: 'MaterialsPage',
    component: MaterialsPage,
    beforeEnter: [checkAdmin],
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/settings',
    name: 'SettingsPage',
    component: SettingsPage,
    beforeEnter: [checkAdmin],
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/reports',
    name: 'AnalyticsPage',
    component: AnalyticsPage,
    beforeEnter: [checkAdmin],
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'ChatPageView',
    component: ChatPageView,
    beforeEnter:[checkUser],
    meta: { requiresAuth: true }
  },
  {
    path: "/chat/:roomId/:roomTitle",
    name: "Chat",
    component: ChatComponent,
    beforeEnter:[checkUser],
    meta: { requiresAuth: true }
  },
  {
    path: "/privateChat",
    name: "ChatUserList",
    component: ChatUserList,
    beforeEnter:[checkUser],
    meta: { requiresAuth: true }
},
{
    path: "/privateChat/:recipientId/:recipientName",
    name: "PrivateChat",
    component: PrivateChatComponent,
    beforeEnter:[checkUser],
    meta: { requiresAuth: true }
},
{
  path: "/join-company/:companyId/:invitationId",
  name: "JoinCompanyPage",
  component: JoinCompanyPage
},
{
  path: '/privacy-policy',
  name: 'GDPRPage',
  component: GDPRPage
},
{
  path : '/terms-of-service',
  name: 'ToSPage',
  component: ToSPage
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  let user = null
  let isValid = false

  if (token) {
    try {
      user = jwtDecode(token)
      const isUserLevel = user?.userlevel >= 1
      isValid = isUserLevel
    } catch (e) {
      console.warn('Invalid token:', e)
    }
  }

  if (to.path === '/') {
    return isValid ? next('/home') : next({ name: 'LandingPage' })
  }

  if (to.meta.requiresAuth && !isValid) {
    return next({ name: 'LandingPage' })
  }

  next()
})

export default router
