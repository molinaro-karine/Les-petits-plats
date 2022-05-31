import { showRecipe, Article } from "./Article.js";
import { recipes } from "../data/recipes.js";
import {dropDownEventListeners} from "./dropdown.js"
import { SearchEventListener } from "./search.js";

const start = () => {
    showRecipe[0] = recipes
    Article()//affiche les recettes
    dropDownEventListeners()//initialise les eventListeners des dropDown menus 
    SearchEventListener()///initialise les eventListeners de la barre de recherche
}


/*lancement du programme à la fin du chargement de la page*/
const body = document.querySelector('body');
body.onload = start;