import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios  from 'axios'

export const useRecipeStore = defineStore('recipeStore',{
  state: () => ({
    
        recipes:[],
        recipe:{},
        userRecipes:[],
        user_recipes_dict:{}
}),
actions: {
    getRecipes(){
        axios.get('https://api.spoonacular.com/recipes/complexSearch?query=bacon&maxFat=25&number=20&apiKey=e8bdd0a88cb74532a82c0427fb822da2&includeNutrition=true')
        .then(res => {
            this.recipes = res.data.results
            console.log(res.data.results)
    })
        .catch(err => console.log(err.data))
},
getRecipe(id){
    axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&number=20&apiKey=e8bdd0a88cb74532a82c0427fb822da2&includeNutrition=true`)
    .then(res => {
        this.recipe = res.data
        console.log(res.data)
})
    .catch(err => console.log(err.data))

}
}
})
