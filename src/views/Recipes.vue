<template>
   
   <div class="container">
      
         <div class="input-group mb-3 row justify-content-lg-end input-container" style="margin: 0 auto;">
          <h3> Meal Search</h3>
            <form class="search-container" @submit.prevent="search">
    <input type="text" id="search-bar" placeholder="What can I help you with today?" :value="input" @input="event => input = event.target.value">
    <a v-on:click="search"><img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"></a>
  </form>
      </div>
       
       <!-- <router-link :to="{ name: 'Saved Recipes',params: { id: id }}"><p class="saved_recipes">Saved Recipes</p></router-link> -->
  <div class="row grid-container"  v-if="recipesStore.recipes">
       <div v-for="recipe in recipesStore.recipes" :key="recipe.id" class="grid-item card">
              <div class="card__image">
                 <img :src="recipe.strMealThumb" alt="Salad" />
              </div>
              <div class="card__info">
                 <div class="car__info--title">
                   <h3>{{ recipe.strMeal}}</h3>

                   <i class="fa fa-heart" style="color: red;cursor: pointer;" @click="deleteRecipe(recipe)"  v-if="recipesStore.user_recipes_dict[recipe.idMeal]">Remove Recipe</i>
                   <i class="fa fa-heart" style="color: black;cursor: pointer;" @click="saveRecipe(recipe)" v-else >Save Recipe</i>
                    <router-link :to="{ name: 'recipe', params: { id: recipe.idMeal }}"> See Recipe</router-link>
                 </div>
           </div>
        
      </div>
    </div>
   </div>

  </template>
  <script >
  import { ref,watchEffect } from "vue";
  import { useRecipeStore } from "../stores/recipes" 

  export default {
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

    setup (){
      const input = ref("")
    const recipesStore = useRecipeStore()

  recipesStore.getRecipes()
  recipesStore.getSavedRecipes(JSON.parse(localStorage.getItem("user")).email)
  console.log("hello",recipesStore.recipes)
  const search = () => {
   console.log(input.value)
   recipesStore.getRecipes(input.value)
  }
  const checkIfSaved = (body) => {
  return recipesStore.user_recipes_dict[body.idMeal]
}
  const saveRecipe = (body) => {
    if (checkIfSaved(body)){
      alert("Woah Chill bro you already saved this")
    }
    else{
    console.log("showing that recipe isnt saved",body)
    let newMeal = {"title":body.strMeal,"image":body.strMealThumb,"image_type":"src","user_email":JSON.parse(localStorage.getItem("user")).email,"recipe_id":body.idMeal}
    console.log(newMeal)
    recipesStore.addRecipe(newMeal)
    }
  }

  const deleteRecipe = (body) => {
    if (!checkIfSaved(body)){
      alert("Woah Buddy, This user isnt saved yet")
    }
    else{
    let deleteMeal = recipesStore.userRecipes.find(recipe => Number(recipe.recipe_id) === Number(body.idMeal))
    console.log(deleteMeal)
    recipesStore.deleteRecipe(deleteMeal)
    }
  }
  return {recipesStore,search,input,saveRecipe,deleteRecipe}
    }
  }
  </script>
  
  
  <style>
  @import url(https://fonts.googleapis.com/css?family=Open+Sans);
  
  body{
    background: #f2f2f2;
    font-family: 'Open Sans', sans-serif;
  }
  h3{
   text-align: center;

  }
  .container{
   padding: 70px;
   
   
  }
  .input-container{
   margin: 0 auto;
   padding: 50px;
  }
  input{
   display: block;
  }
  
  .search-container{
  display: block;
  margin: 0 auto;
}

input#search-bar{
  margin: 0 auto;
  width: 100%;
  height: 45px;
  padding: 0 20px;
  font-size: 1rem;
  border: 1px solid #D0CFCE;
  outline: none;
  &:focus{
    border: 1px solid #008ABF;
    transition: 0.35s ease;
    color: #008ABF;
    &::-webkit-input-placeholder{
      transition: opacity 0.45s ease; 
  	  opacity: 0;
     }
    &::-moz-placeholder {
      transition: opacity 0.45s ease; 
  	  opacity: 0;
     }
    &:-ms-placeholder {
     transition: opacity 0.45s ease; 
  	 opacity: 0;
     }    
   }
 }

.search-icon{
  position: relative;
  float: right;
  width: 75px;
  height: 75px;
  top: -62px;
  right: -15px;
  cursor: pointer;
}

  
  
  /*Resize the wrap to see the search bar change!*/
  .wrap{
    width: 100%;
    margin-left:50%;
    margin-top:1.5%;
    transform: translate(-50%, -50%);
  }
  .grid-container {
   width: 100%;
    display: grid;
    grid-template-columns: auto auto auto;
  }
  .grid-item {
    
  }
  .card {
     width: 295px;
     overflow: hidden;
     border-radius: 25px;
     border: 1px solid lavender;
     margin: 10px;
     box-shadow: 5px 5px 15px 5px rgba(230, 230, 250, 1);
  }
  
  .card__image {
     position: relative;
     height: 140px;
  }
  .card__image > img {
     max-width: 100%;
     border-bottom-right-radius: 30px;
     transform: rotate(10deg) translate(-15px, -55px);
     position: absolute;
     height: 200px;
     object-fit: cover;
     object-position: center;
  }
  
  .card__info {
     display: flex;
     align-items: flex-end;
     justify-content: space-between;
     padding: 0px 30px 20px 30px;
  }
  .card__info h3 {
     font-size: 18px;
     font-weight: 700;
  }
  .card__info p {
     font-size: 14px;
     font-weight: 600;
  }
  .card__info--price {
     text-align: right;
     color: orangered;
  }
  .rect2 {
     position: relative;
     bottom: 315px;
     right: 15px;
     width: 325px;
     height: 230px;
     border: 1px solid lavender;
     border-radius: 0 0px 80px 0;
     transform: rotate(10deg);
     object-fit: cover;
  }
  .checked {
     color: #ffd700;
  }
  
  ::-webkit-scrollbar {
     width: 8px;
  }
  
  ::-webkit-scrollbar-thumb {
     background: #cccccc;
     border-radius: 10px;
  }
  
  ::-webkit-scrollbar-track {
     -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
     border-radius: 10px;
  }
  .pointer{
  cursor:pointer
  }
  #search{
     height:2.3rem;
     
  }
  .saved_recipes{
  margin-left:2rem;
  }
  @media only screen and (max-width: 600px) {
  
    .grid-container {
      margin-left:5rem;
      grid-template-columns: auto ;
  
    }
    #search{
     width:15rem;
  }
  }
  @media only screen and (min-width: 600px) and (max-width: 992px) {
    .grid-container {
      grid-template-columns: auto auto auto;
  
    }
  }
  @media only screen and (min-width: 992px) {
    .input-container {
      min-width: 1000px;
  
    }
   }
  </style>
  