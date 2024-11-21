<template>
  <div class="container">
<h3><u>Login</u></h3>
  <div class="row">
    <label for="exampleFormControlInput1" class="form-label">Email Address</label>
    <input type="email"  class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="email"/>
  </div>
  <div class="row">
    <label for="exampleFormControlInput1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="********" v-model="password"/>
  </div>
  <br>
<div class="row">
      <button @click="login" class="btn btn-dark row sign-in-button">Log in</button>
      <button @click="loginWithGoogle" class="btn btn-dark row sign-in-button">Log in With <i class="fa fa-google" style="font-size:16px"></i></button>
    </div>
    </div>
  </template>
  <script>
    import { ref } from 'vue';
    import {getAuth,signInWithPopup,signInWithEmailAndPassword,GoogleAuthProvider} from "firebase/auth"
import { useRouter } from 'vue-router';
import { useRecipeStore } from '@/stores/recipes';

    
    export default {
        setup() {
          const email = ref("")
          const password = ref("")
          const router = useRouter()
          const recipesStore = useRecipeStore()
          const login = () => {
            console.log(email.value)
            console.log(password.value)
            signInWithEmailAndPassword(getAuth(),email.value,password.value)
            .then((data) => {
              localStorage.setItem("user",JSON.stringify(data.user))
              console.log(data.user)
              recipesStore.logIn(data.user)
              router.push("/recipes")
            })
            .catch(err => {
              console.log(err)
            })
          }

          const loginWithGoogle = () => {
          const provider = new GoogleAuthProvider()
          signInWithPopup(getAuth(),provider).then((data) => {
            console.log(data.user)
              localStorage.setItem("user",JSON.stringify(data.user))
              console.log(data.user)
              router.push("/recipes")
              
            })
            .catch(err => {
              console.log(err)
            })
          }

      return {
 login,
 email,
 password,
 loginWithGoogle
      };
    }
    };
  </script>