import { recipes } from "../data/recipes.js"
import { fastCheck, fastAlgorytm } from "./algo.js"
import { showRecipe, Article } from "./Article.js"
import { fillList } from "./dropdown.js"
import { clean } from "./clean.js"


/*evnt pour la rcherche à chaque nouveau caractère*/
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
    showRecipe[0] = [] // remise à zero des recettes 
    getMainInput()// récupère les mots clefs de l'input principal
    let sortingToken = false // aucun tri n'a été effectué
    let sortingValues = mainSearch[0]
    if (sortingValues[0]?.length > 2) {
        sortingToken = true//une recherche à été effectué
        let sortingPath = [ "description","name", "ingredients"]
        fastAlgorytm(recipes, sortingPath, sortingValues)
    }
    sortingValues = ingredientsSearch[0]// nouvelle valeurs de tri
    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["ingredients"]
        if (sortingToken === false) {
            fastAlgorytm(recipes, sortingPath, sortingValues)
            sortingToken = true
        } else fastCheck(sortingPath, sortingValues)

    }
    sortingValues = ustensilesSearch[0]

    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["ustensils"]
        if (sortingToken === false) {
            fastAlgorytm(recipes, sortingPath, sortingValues)
            sortingToken = true
        } else fastCheck(sortingPath, sortingValues)

    }
    sortingValues = appareilSearch[0]
    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["appliance"]
        if (sortingToken === false) {
            fastAlgorytm(recipes, sortingPath, sortingValues)
            sortingToken = true
        } else fastCheck(sortingPath, sortingValues)
    }
    if (sortingToken === false) {
        showRecipe[0] = recipes
    }
    Article()//on re-affiche les recettes
    fillList()// inscrit les tags dans les differentes listes
}
/*recupere les mots clefs du champ texte principal et les mets dans mainSearch*/
const getMainInput = () => {
    const textInput = document.querySelector(".main-search")
    mainSearch[0] = textInput.value.split(" ")
    clean(mainSearch[0])
  
}
/*recherche secondaire pour les tags*/
const createTagSearch = (e) => {
   
    tagSearch[0] = e.target.value.split(" ")
    clean(tagSearch[0])
    fillList()// inscrit les tags dans les differentes listes
}