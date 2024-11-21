import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios  from 'axios'

export const useRecipeStore = defineStore('recipeStore',{
  state: () => ({
    
        recipes:[],
        recipe:{},
        userRecipes:[],
        user_recipes_dict:{},
        user:{}
}),
actions: {
    
    getRecipes(search=null){
        if (!search){
            search = "mac and cheese"
        }
        search = search.replaceAll(" ","+")
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => {
            this.recipes = res.data.meals ? res.data.meals : res.data
    })
        .catch(err => console.log(err.data))
},
getRecipe(id){
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => {
        this.recipe = res.data.meals ? res.data.meals[0] : res.data[0]
        console.log(res.data.meals[0])
})
    .catch(err => console.log(err.data))

},
getSavedRecipes(email){
    console.log("hello")
    axios.get(`http://foodsearchbe-env-3.eba-ehtjqss8.us-east-2.elasticbeanstalk.com/recipes/${email}`)
    .then(res => {
        this.userRecipes = res.data
        console.log(this.userRecipes)
        let obj = {}
        res.data.map(recipe => obj[recipe.recipe_id] = true)
        this.user_recipes_dict = obj
        console.log(this.user_recipes_dict)
})
    .catch(err => console.log(err))

},
addRecipe(body){
    console.log(body)
    axios.post(`http://foodsearchbe-env-3.eba-ehtjqss8.us-east-2.elasticbeanstalk.com/recipes`,body)
    .then(res => {
        this.user_recipes_dict[res.data.recipe_id] = true
        this.userRecipes = [...this.userRecipes,res.data]
        // this.userRecipes = [...this.userRecipes,res.]
        console.log(res.data)
})
    .catch(err => console.log(err))
    console.log(body)
//     axios.post(`http://localhost:5000/recipe-app-21ce3/us-central1/api/savedRecipes`,body)
//     .then(res => {
//         this.recipe = res.data
//         console.log(res.data)
// })
//     .catch(err => console.log(err.data))

},
logIn(user,router){
    this.user = user

},
deleteRecipe(body){
    console.log("delete recipe",body)
    this.userRecipes = this.userRecipes.filter(recipe => recipe !== body)
    axios.delete(`http://foodsearchbe-env-3.eba-ehtjqss8.us-east-2.elasticbeanstalk.com/recipes/${body.id}`)
    .then(res => {
        console.log(res.data)
        
        this.user_recipes_dict = {...this.user_recipes_dict,[body.recipe_id]:false}
        
})
    .catch(err => console.log(err))
    console.log(body)
},


}
})
