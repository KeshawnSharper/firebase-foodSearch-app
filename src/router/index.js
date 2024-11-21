import { createRouter, createWebHistory } from 'vue-router'
import Recipes from '../views/Recipes.vue'
import Recipe from '../views/Recipe.vue'
import Login from '../views/Login.vue'
import Register from "../views/Register.vue"
import LandingPage from '@/views/LandingPage.vue'
import MyRecipes from '@/views/MyRecipes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,// Mark this route as protected
    },
    { path: "/recipe/:id", name: 'recipe', component: Recipe, meta: { requiresAuth: true } // Mark this route as protected
    },
    { path: "/login", name: 'login', component: Login,
    },
    { path: "/recipes", name: 'recipes', component: Recipes, meta: { requiresAuth: true } // Mark this route as protected
    },
    { path: "/register", name: 'register', component: Register,
    },
    { path: "/myrecipes", name: 'My Recipes', component: MyRecipes, meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("user")
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login'); // Redirect to login page if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router
