<template>
<div class="container">
  <h3><u>Food Search</u></h3>
<div class="card justify-content-lg-center" style="width: 20rem;margin: 0 auto;">
  <img :src="recipesStore.recipe.strMealThumb" class="card-img-top" alt="..." height="200px">
  <div class="card-body">
    <h5 class="card-title">{{ recipesStore.recipe.strMeal }}</h5>
    <p class="card-text" style="font-size:xx-small;">{{recipesStore.recipe.strInstructions}} </p>
    <i class="fa fa-heart" style="color: red;cursor: pointer;" @click="deleteRecipe"  v-if="recipesStore.user_recipes_dict[recipesStore.recipe.idMeal]">Remove Recipe</i>
    <i class="fa fa-heart" style="color: black;cursor: pointer;" @click="saveRecipe" v-else >Save Recipe</i>  </div>
</div>
</div>

</template>
    <script>
    import { useRecipeStore } from "../stores/recipes" 
    import {useRoute} from "vue-router";


    export default {
    setup (){
    const recipesStore = useRecipeStore()

const route = useRoute();
recipesStore.getRecipe(route.params.id)
console.log("recipe",recipesStore.recipe)

const checkIfSaved = () => {
  return recipesStore.user_recipes_dict[recipesStore.recipe.idMeal]
}
const saveRecipe = () => {
  if (checkIfSaved()){
    alert("Hey calm down you already saved this recipe")
  }
  else{
    const body = recipesStore.recipe
     let newMeal = {"title":body.strMeal,"image":body.strMealThumb,"image_type":"src","user_email":JSON.parse(localStorage.getItem("user")).email,"recipe_id":body.idMeal}
     console.log(newMeal)
     recipesStore.addRecipe(newMeal)
  }
   }
 
   const deleteRecipe = () => {
    if (!checkIfSaved()){
    alert("Hey calm down you already deleted this recipe")
  }
  else{
    const body = recipesStore.recipe
     let deleteMeal = recipesStore.userRecipes.find(recipe => Number(recipe.recipe_id) === Number(body.idMeal))
     console.log(deleteMeal)
     recipesStore.deleteRecipe(deleteMeal)
  } 
   }

  return {recipesStore,deleteRecipe,saveRecipe}
    }
  }
    
    </script>
    <style>
  @media only screen and (min-width: 992px) {
    .container {
      min-width: 1000px;
      padding: 100px;
  
    }
   }
  </style>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   