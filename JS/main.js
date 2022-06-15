const containerTag = document.querySelector('.selected-filters');
//tableau de balises actives afin de garder une trace des filtres actifs (pour les futurs résultats affichés)
let ingredientsActiveTags = [];
let appliancesActiveTags = [];
let utensilsActiveTags = [];
// tous les filtres dans un tableau, alors chaque type de filtre sera dans un tableau séparé
let listOfIngredients = []
let listOfAppliances = []
let listOfUtensils = []



let listOfRecipes = [];

const recipeListContainer = document.querySelector('.cards-container');
// boucle à travers toutes les recettes (de recipes.js)
recipes.forEach(function(aRecipe){
    const newRecipeObject = new Recipe(aRecipe.name, aRecipe.time, aRecipe.description);

    // ajout d'un ingrédient à la recette
    aRecipe.ingredients.forEach((anIngredient) => {
        const anIngredientObject = new Ingredient(anIngredient.ingredient, anIngredient.quantity, anIngredient.unit);
        newRecipeObject.addIngredient(anIngredientObject);
    })
    // ajout de l'appareil à la recette
    const anApplianceObject = new Appliance(aRecipe.appliance);
    newRecipeObject.addAppliance(anApplianceObject);
    

    // ajout d'un ustensile à la recette
    aRecipe.ustensils.forEach((anUtensil) => {
        const anUtensilObject = new Utensil(anUtensil);
        newRecipeObject.addUtensil(anUtensilObject);
    })  
    // stocker les recettes
    recipeListContainer.appendChild(newRecipeObject.createRecipeCard());
    listOfRecipes.push(newRecipeObject)
})
let availableListOfRecipes = [...listOfRecipes];
// La fonction mettra à jour la liste des ingrédients, la liste des appareils et la liste des ustensiles à partir de la liste des recettes fournies
function getTheFilters(listOfRecipes) {
    // vider d'abord les tableaux précédents pour pouvoir pousser les valeurs disponibles
    listOfIngredients = []
    listOfAppliances = []
    listOfUtensils = []
   
    listOfRecipes.forEach(function(aRecipe){
        aRecipe.ingredients.forEach((anIngredient) => {
            if(!ingredientsActiveTags.includes(anIngredient.name)){
                listOfIngredients.push(anIngredient.name)
            }
        });
        listOfIngredients = [...new Set(listOfIngredients)];
    
        aRecipe.appliances.forEach((anAppliance) => {
            if(!appliancesActiveTags.includes(anAppliance.name)){
                listOfAppliances.push(anAppliance.name)
            }
        })
        listOfAppliances = [...new Set(listOfAppliances)];

        aRecipe.utensils.forEach((anUtensil) => {
            if(!utensilsActiveTags.includes(anUtensil.name)){
                listOfUtensils.push(anUtensil.name)
            }
        })
        listOfUtensils = [...new Set(listOfUtensils)];
    })
}
getTheFilters(listOfRecipes);  

function callAvailableFilters(listOfIngredients, listOfAppliances, listOfUtensils) {
    availableFilters(listOfIngredients,'ingredient');
    availableFilters(listOfAppliances,'appliance');
    availableFilters(listOfUtensils,'utensil');
}
callAvailableFilters(listOfIngredients, listOfAppliances, listOfUtensils);

//effacer les filtres de résultats
function clearFiltersResults(filterContainer) {
    filterContainer.innerHTML = ""
}

// crée les éléments affichés dans les filtres (les choix disponibles)
function availableFilters(list, typeOfFilter) {
    let filterContainer;
    let tagColor;
    let activeTags;
    let callFilterByType;
    if(typeOfFilter === "ingredient") {
        filterContainer = document.querySelector('.choices-wrapper-ingredients');
        tagColor = "tag-ingredients";
        activeTags = ingredientsActiveTags;
        callFilterByType = filterByIngredients
    } else if (typeOfFilter === "appliance"){
        filterContainer = document.querySelector('.choices-wrapper-appliances');
        tagColor = "tag-appliances";
        activeTags = appliancesActiveTags;
        callFilterByType = filterByAppliances
    } else if (typeOfFilter === "utensil"){
        filterContainer = document.querySelector('.choices-wrapper-utensils');
        tagColor = "tag-utensils";
        activeTags = utensilsActiveTags;
        callFilterByType = filterByUtensils
    }
    clearFiltersResults(filterContainer)

    // Parcourez la liste des choix pour les créer et les afficher
    list.forEach(choice => {
        const p = document.createElement('p');
        p.classList.add('cursorPointer')
        p.textContent = choice;
        filterContainer.appendChild(p);
        // Au clic d'un choix, créer les balises
        p.addEventListener('click', (e) =>{
            const buttonTag = document.createElement('button');
            buttonTag.classList.add('tags', tagColor)
    
            const pTag = document.createElement('p');
            pTag.textContent = choice;

            const imgTag = document.createElement('img');
            imgTag.setAttribute('src', './public/img/delete.svg');
            imgTag.setAttribute('alt', 'clik to delete filter');
            imgTag.classList.add('cursorPointer')

            containerTag.appendChild(buttonTag);
            buttonTag.appendChild(pTag);
            buttonTag.appendChild(imgTag);
            // permet de suivre et de stocker les balises actives en fonction de leur type de filtre
            activeTags.push(choice);
            // appelle la fonction pour mettre à jour les recettes disponibles
            callFilterByType(choice)
            displayAvailableRecipes()
            // sélectionnez le bouton d'entrée pour effacer les champs d'entrée après avoir sélectionné un tag (pour permettre une nouvelle recherche sans rien)
            document.querySelectorAll('.input-button').forEach((oneInputField) =>{
                oneInputField.value=""
            });
            
            imgTag.addEventListener('click', (e)=>{
                buttonTag.remove();
                // supprime la balise cliquée du tableau de balises actives associées par la méthode splice
                activeTags.splice(activeTags.indexOf(choice),1);
                // recalcule les résultats lors de la suppression d'une balise
                updateResultsWithoutATag();
                displayAvailableRecipes()
            })
        })
    })
}
// fonction pour recalculer les résultats lors de la suppression d'une balise
function updateResultsWithoutATag(){
    availableListOfRecipes = [...listOfRecipes];
    ingredientsActiveTags.forEach((tag) => {
        filterByIngredients(tag)
    })
    appliancesActiveTags.forEach((tag) => {
        filterByAppliances(tag)
    })
    utensilsActiveTags.forEach((tag) => {
        filterByUtensils(tag)
    })
}

// filtre les choix dans la liste déroulante des filtres 
const filterInputIngredients = document.querySelector('.input-button-ingredients');
filterInputIngredients.addEventListener("keyup", (e)=> {
    if(e.target.value.length>2){ 
        //plus de 2 caractères donc minimum 3
        // filtrer dans la liste des ingrédients les ingrédients qui incluent la recherche
        const filterIngredients = listOfIngredients.filter((filterIngredient) =>{
            return filterIngredient.toLowerCase().includes(e.target.value.toLowerCase())
        })
        availableFilters(filterIngredients, "ingredient")
    } else { 
        availableFilters(listOfIngredients, "ingredient")
    }
});

const filterInputAppliances = document.querySelector('.input-button-appliances');
filterInputAppliances.addEventListener("keyup", (e)=> {
    if(e.target.value.length>2){
        
        const filterAppliances = listOfAppliances.filter((filterAppliance) =>{
            return filterAppliance.toLowerCase().includes(e.target.value.toLowerCase());
        })
        availableFilters(filterAppliances, "appliance")
    }
});

const filterInputUtensil = document.querySelector('.input-button-utensils');
filterInputUtensil.addEventListener("keyup", (e)=> {
    if(e.target.value.length>2){
        const filterUtensils = listOfUtensils.filter((filterUtensil) =>{
            return filterUtensil.toLowerCase().includes(e.target.value.toLowerCase());
        })
        availableFilters(filterUtensils, "utensil")
    }
});

// filtre les recettes parmi les choix sélectionnés dans la liste déroulante des filtres
function filterByIngredients(choice){
    availableListOfRecipes = availableListOfRecipes.filter(recipe =>{
        return recipe.ingredients.some(ingredient => {
            return ingredient.name ===choice;
        })
    })
}

function filterByAppliances(choice){
    availableListOfRecipes = availableListOfRecipes.filter(recipe =>{
        return recipe.appliances.some(appliance => {
            return appliance.name ===choice;
        })
    })
}

function filterByUtensils(choice){
    availableListOfRecipes = availableListOfRecipes.filter(recipe =>{
        return recipe.utensils.some(utensil => {
            return utensil.name ===choice;
        })
    })
}

// fonction d'affichage des résultats des fiches recettes en fonction des filtres
function displayAvailableRecipes(){
    // supprime toutes les cartes avant le nouveau résultat
    recipeListContainer.innerHTML=""
    if(availableListOfRecipes.length<1){
        const p = document.createElement('p');
        p.textContent = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc."
        recipeListContainer.appendChild(p);

    } else {
        // s'il y a des filtres disponibles = donne la nouvelle recette disponible
        availableListOfRecipes.forEach((recipe)=>{
            recipeListContainer.appendChild(recipe.createRecipeCard())
        })
        getTheFilters(availableListOfRecipes); //mise à jour de la liste des filtres
        callAvailableFilters(listOfIngredients, listOfAppliances, listOfUtensils);// ajout des choix de gauche dans la liste déroulante après l'exécution de la recherche
    }
}
