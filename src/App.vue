<template>
<Navbar :routes="routes" :key="loggedIn"/>
  <router-view></router-view>
<Footer />

</template>

<script>
import { ref } from 'vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';



export default {
  name: "App",
  components: {
    Navbar, // Register the component
    Footer
  },
  onMount(){
    if(localStorage.getItem("user")){
      this.loggedIn = true
    }
    else{
      this.loggedIn = false
    }
  },
  watch: {
    '$route'() {
      // Force re-render
      this.$forceUpdate();
    }
  },
  setup(){
    const loggedIn = ref("")

    const routes = [{"title":"Home", "link":"/"},{"title":"Recipes", "link":"/recipes"},{"title":"Login","link":"/login"},{"title":"Register","link":"/register"},{"title":"My Recipes","link":"/myrecipes"}]
    
    return {routes,loggedIn}
  }
};
</script>

<!-- <style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style> -->
