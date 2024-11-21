<template>
<nav :key="loggedIn" class="navbar navbar-expand-lg fixed-top justify-content-start  bg-body-tertiary me-2 border-bottom border-primary">
  <div class="container-fluid">
    <img src="./foodsearchicon.png" class="header-icon" />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="routes">
      <ul class="navbar-nav mb-2 mb-lg-0" v-for="route in routes">
        <router-link class="text-success-emphasis" :to="route.link">
            {{ route.title }}
    </router-link>
      </ul>
      <div class="mobile-nav-items" v-if="loggedIn">
      <router-link class="text-success-emphasis" :to="account">Account</router-link>
      <br>
      <router-link class="text-success-emphasis" :to="logout" data-bs-target="#logoutModal" data-bs-toggle="modal">Log Out</router-link>
    </div>
    </div>
  </div>
  <div class="desktop-nav-items" v-if="loggedIn">
  <img :src="picture" class="nav-icon"/>
  <button type="button" class="btn btn-dark nav-button" width="500px" height="300px" data-bs-toggle="modal" data-bs-target="#logoutModal">Log Out</button>
      <!-- Modal -->

  </div>
</nav>
<div class="modal" tabindex="-1" id="logoutModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Log Out</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Are You sure You Want To Log Out?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button type="button" class="btn btn-primary" @click="logOut">Yes</button>
      </div>
    </div>
  </div>
</div>
  </template>
  <script>

    import { useAuth0 } from '@auth0/auth0-vue';
import LogOutModal from './LogOutModal.vue';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
  
    export default {
        props: ["routes"],
        watch: {
  $route(to, from) {
    if (localStorage.getItem("user")){
      this.loggedIn = true}
      else{
        this.loggedIn = false
      }
    }
    // Perform actions here
},
  setup(props){
    const loggedIn = ref(localStorage.getItem("user") ? true : false)
    let picture = "https://res.cloudinary.com/di449masi/image/upload/v1642618315/default-profile-picture1_ny7dzc.jpg"
    console.log(props.routes)
          const router = useRouter()
          const logOut = () => {
            const auth = getAuth()
            signOut(auth)
            .then(data => {
              localStorage.clear()
              router.push("/login")
              
            })
            .catch(err => console.log(err))
          }
          return {logOut,picture,loggedIn}
        }
    //   const { loginWithRedirect, user, isAuthenticated } = useAuth0();

    //   return {
    //     login: () => {
    //         localStorage.getItem("user",user)
    //       loginWithRedirect();
    //     },
    //     user,
    //     isAuthenticated
    //   }
    // }
    };
  </script>
  <style>
  nav{
    width: 100%;
  }
.nav-icon{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.header-icon{
    width: 120px;
    height: 80px;
}
.nav-button{
    width: 100px;
    height:40px;
}
.desktop-nav-items{
display:none;
}
.mobile-nav-items{
    display: block;
}
@media only screen and (min-width: 992px) {
    .desktop-nav-items {
     display: flex;
    }
    .mobile-nav-items{
        display: none;
    }
   }
</style>