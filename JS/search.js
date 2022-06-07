import { recipes } from "../data/recipes.js"
import { slowCheck, slowAlgorytm } from "./algo.js"
import { showRecipe, Article } from "./Article.js"
import { fillList } from "./dropdown.js"
import { clean } from "./clean.js"

/*evnt listener pour la rcherche a chaque nouveau caractére*/
export const SearchEventListener = () => {
    const textInputs = document.querySelectorAll(".form-control")
    textInputs.forEach((textInput) => {
        if (textInput.classList.contains("main-search")) textInput.addEventListener('keyup', search)
        if (!textInput.classList.contains("main-search")) textInput.addEventListener('keyup', createTagSearch)
    })

}

export let mainSearch = [[]]
export let ingredientsSearch = [[]]
export let appareilSearch = [[]]
export let ustensilesSearch = [[]]
export let tagSearch = [[]]
/*recherches*/
export const search = () => {
    showRecipe[0] = [] // remise a zero des recettes 
    getMainInput()// récupère les mots clefs de l'input principal
    let sortingToken = false // aucun tri n'a été effectué
    let sortingValues = mainSearch[0]
    if (sortingValues[0]?.length > 2) {
        sortingToken = true//une recherche a été effectué
        let sortingPath = [ "description","name", "ingredients"]// les chemins à rechercher
        slowAlgorytm(recipes, sortingPath, sortingValues)
    }
    sortingValues = ingredientsSearch[0]// nouvelle valeurs de tri
    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["ingredients"]
        if (sortingToken === false) {
            slowAlgorytm(recipes, sortingPath, sortingValues)
            sortingToken = true
        } else slowCheck(sortingPath, sortingValues)

    }
    sortingValues = ustensilesSearch[0]

    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["ustensils"]
        if (sortingToken === false) {
            slowAlgorytm(recipes, sortingPath, sortingValues)
            sortingToken = true
        } else slowCheck(sortingPath, sortingValues)

    }
    sortingValues = appareilSearch[0]
    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["appliance"]
        if (sortingToken === false) {
            slowAlgorytm(recipes, sortingPath, sortingValues)
            sortingToken = true
        } else slowCheck(sortingPath, sortingValues)
    }
    if (sortingToken === false) {
        showRecipe[0] = recipes
    }
    Article()//on ré-affiche les recettes
    fillList()// inscrit les tags dans les différentes listes
}
/*récupère les mots clefs du champ texte principal et les mets dans mainSearch*/
const getMainInput = () => {
    const textInput = document.querySelector(".main-search")
    mainSearch[0] = textInput.value.split(" ")
    clean(mainSearch[0])
    console.log(mainSearch[0]);
}
/*recherche secondaire pour les tags*/
const createTagSearch = (e) => {
    console.log(e,);
    tagSearch[0] = e.target.value.split(" ")
    clean(tagSearch[0])
    fillList()// inscrit les tags dans les differentes listes
}