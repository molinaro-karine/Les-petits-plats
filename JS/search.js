// fonction de recherche avec la méthode filter
const inputSearchBar = document.querySelector('#search-input')
inputSearchBar.addEventListener('keyup', (e)=>{
    const searchValue = e.target.value.toLowerCase().trim();
    if(searchValue.length>2){
        availableListOfRecipes = listOfRecipes.filter((oneRecipe)=>{
            //include ... OR ...
            return (oneRecipe.name.toLowerCase().includes(searchValue) || oneRecipe.description.toLowerCase().includes(searchValue)
            || oneRecipe.ingredients.some((oneIngredient)=> oneIngredient.name.toLowerCase().includes(searchValue))) 
        })
        removeTags(); // whenever there is a new seach starting
        displayAvailableRecipes();
    } else if (searchValue.length<1) {
        restart()
    }
})

// fonction qui permet de relancer une nouvelle recherche sans paramètres (pas de tags, affiche la liste complète des recettes)
function restart(){
    removeTags()
    availableListOfRecipes = [...listOfRecipes];
    displayAvailableRecipes()
}
function removeTags(){
    containerTag.innerHTML="";
    ingredientsActiveTags = [];
    appliancesActiveTags = [];
    utensilsActiveTags = [];
}


