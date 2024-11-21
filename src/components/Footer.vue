<template>
    <nav class="navbar navbar-expand-lg fixed-bottom justify-content-center  bg-body-tertiary me-2 border-top border-primary align-items-center" style="color: white;">
        <a class="navbar-brand align-items-center" href="#">&copy; Food Search</a>
        <a class="align-items-end text-end justify-content-end icon" href="https://github.com/KeshawnSharper">
            <i class="fa fa-github" style="font-size:16px"></i>
        </a>
        <a class="align-items-end text-end justify-content-end icon" href="https://www.linkedin.com/in/keshawnsharper">
            <i class="fa fa-linkedin" style="font-size:16px"></i>
        </a>
        <a class="align-items-end text-end justify-content-end icon" href="https://docs.google.com/document/d/1t9MXveMU1oBkUvZo39XTtFgPAHW821fbIK9iXaqoGcU/edit?usp=sharing">
            <i class="fa fa-file" style="font-size:16px"></i>
        </a>
        <a class="align-items-end text-end justify-content-end icon" href="https://ksharper2024portfolio.vercel.app/">
            <i class="fa fa-globe" style="font-size:16px"></i>
        </a>
    </nav>
      </template>
      <script>
        import { useAuth0 } from '@auth0/auth0-vue';
        import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

      
        export default {
        //     setup() {
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
        margin: 0 auto;
    }
    .icon{
        text-align: right;
    }
    </style>