<template>
<div class="container">
<h3><u>Register</u></h3>
  <div class="row">
    <label for="exampleFormControlInput1" class="form-label">Email Address</label>
  <input type="email"  class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="email" >
</div>
<div class="row">
  <label for="exampleFormControlInput1" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="********" v-model="password">
</div>
<br>
<div class="row">
      <button @click="register" class="btn btn-dark row sign-in-button" width="500px" height="300px">Register</button>
      <button @click="registerWithGoogle" class="btn btn-dark  row fs-6 sign-in-button" width="700px" height="300px">
        Signup With  <i class="fa fa-google" style="font-size:16px">
          </i>
        </button>
      </div>
</div>
  </template>

  <script>
    import { ref } from 'vue';
    import {getAuth,createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { useRouter } from 'vue-router';
import { useRecipeStore } from '@/stores/recipes';

    export default {
        setup() {
          const email = ref("")
          const password = ref("")
          const router = useRouter()
          const recipesStore = useRecipeStore()
          const register = () => {
            console.log(email.value)
            createUserWithEmailAndPassword(getAuth(),email.value,password.value)
            .then((data) => {
              localStorage.setItem("user",JSON.stringify(data.user))
              console.log(data.user)
              router.push("/recipes")
              recipesStore.logIn(data.user,router)
            })
            .catch(err => {
              console.log(err)
            })
          }

         const registerWithGoogle = () => {
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
 register,
 email,
 password,
 registerWithGoogle
      };
    }
    }
  </script>
  <style>
.sign-in-button{
  width: 400px;
  display: block;
  border:solid 2px white;
  margin-right: 20px;
}
input{
  width: 100%;
  display: block;
}
</style>