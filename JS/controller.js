import {recettes, Article } from "./Article.js";
import { recipes } from "../data/recipes.js";


const start = () => {
    recettes[0] = recipes
    Article()//affiche les recettes
  
}


/*lancement à la fin du chargement de la page*/
const body = document.querySelector('body');
body.onload = start;