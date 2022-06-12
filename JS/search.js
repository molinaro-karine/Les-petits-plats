// algorithme avec méthode for

// fonction de recherche avec la méthode .filter, en réutilisant displayAvailableRecipes() du main.js
const inputSearchBar = document.querySelector('#search-input')
inputSearchBar.addEventListener('keyup', (e)=>{
    const searchValue = e.target.value.toLowerCase().trim();
    if(searchValue.length>2){
        availableListOfRecipes = [];
        for(const oneRecipe of listOfRecipes){
            if(oneRecipe.name.toLowerCase().includes(searchValue) || oneRecipe.description.toLowerCase().includes(searchValue)
            || oneRecipe.ingredients.some((oneIngredient)=> oneIngredient.name.toLowerCase().includes(searchValue))) {
                availableListOfRecipes.push(oneRecipe)
            }
        }
        removeTags(); // chaque fois qu'une nouvelle recherche commence
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
