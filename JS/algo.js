import { showRecipe, Article } from "./Article.js"

export const fastAlgorytm = (recipeArray, sortingPathArray, sortingValues) => { //algorythme de recherche avec des boucles for
  console.log( sortingValues ,'values',sortingPathArray,'path' );
    for (let s = 0; s < sortingPathArray.length; s++) {//pour tous les chemins , ingredients, ustenciles ,...
        for (let h = 0; h < sortingValues.length; h++) {//pour toutes les valeurs de l'input
            if (sortingValues[h].length > 0) {// si il y a une valeur a tester
                for (let i = 0; i < recipeArray.length; i++) {//pour toutes les recettes
                    if (sortingPathArray[s] === "ingredients") {
                        for (let a = 0; a < recipeArray[i].ingredients.length; a++) {//pour tous les ingredients
                            if (recipeArray[i].ingredients[a].ingredient.toLowerCase().includes(sortingValues[h].toLowerCase())) {//si l'ingredient est dans la recette
                                let bufferToken = false // ticket pour savoir si la recette a deja été touveé
                                for (let r = 0; r < showRecipe[0].length; r++) {//pour toutes les recette affichés
                                    if (showRecipe[0][r] === recipeArray[i]) bufferToken = true //la recette est deja présente
                                }
                                if (!bufferToken) {// si la recette n'est pas présente alors elle st testé est affichés
                                    showRecipe[0].push(recipeArray[i])//alors elle est ajouté a l'array showRecipe 
                                    let sortingPath = [sortingPathArray[s]]//on recupére le chemin
                                    fastCheck(sortingPath, sortingValues, recipeArray[i])//on confirme que les autres valeurs de tri sont présetes dans l'objet
                                    Article()// l'element est affiché
                                }
                            }
                        }
                    } else if (sortingPathArray[s] === "ustensils") {
                        for (let a = 0; a < recipeArray[i].ustensils.length; a++) {
                            if (recipeArray[i].ustensils[a].toLowerCase().includes(sortingValues[h].toLowerCase())) {
                                let bufferToken = false
                                for (let r = 0; r < showRecipe[0].length; r++) {
                                    if (showRecipe[0][r] === recipeArray[i]) bufferToken = true
                                }
                                if (!bufferToken) {
                                    showRecipe[0].push(recipeArray[i])
                                    let sortingPath = [sortingPathArray[s]]
                                    fastCheck(sortingPath, sortingValues, recipeArray[i])
                                    Article()
                                }
                            }
                        }
                    } else {
                        if (recipeArray[i][sortingPathArray[s]].toLowerCase().includes(sortingValues[h].toLowerCase())) {
                            let bufferToken = false
                            for (let r = 0; r < showRecipe[0].length; r++) {
                                if (showRecipe[0][r] === recipeArray[i]) bufferToken = true
                            }
                            if (!bufferToken) {
                                showRecipe[0].push(recipeArray[i])
                                let sortingPath = [sortingPathArray[s]]
                                fastCheck(sortingPath, sortingValues, recipeArray[i])
                                Article()
                            }
                        }
                    }
                }
            }
        }
    }
}
export const fastCheck = (sortingPathArray, sortingValues, recipeTarget) => {//algorythme de confirmation (autres champs de l'input) avec des boucles for
    console.log(recipeTarget , 'recipe' ,sortingValues, 'value',sortingPathArray );
    for (let i = 0; i < showRecipe[0].length; i++) {//pour toutes les recettes du buffer
        if (recipeTarget === undefined || recipeTarget === showRecipe[0][i]) {// permet le test de une ou de toutes les recettes
            let pathToken = 0 //ticket pour la verification
            for (let h = 0; h < sortingValues.length; h++) {//pour toutes les valeurs de l'input
                if (sortingValues[h].length > 0) {// si il y a une valeur a tester
                    for (let s = 0; s < sortingPathArray.length; s++) {//pour tous les chemins
                        if (sortingPathArray[s] === "ingredients") {
                            for (let a = 0; a < showRecipe[0][i].ingredients.length; a++) {
                                if (showRecipe[0][i].ingredients[a].ingredient.toLowerCase().includes(sortingValues[h].toLowerCase())) {
                                    pathToken++;
                                    a = showRecipe[0][i].ingredients.length // arret de la boucle pour eviter les doublons (lait de coco , noix de coco )
                                }
                            }
                        } else if (sortingPathArray[s] === "ustensils") {
                            for (let a = 0; a < showRecipe[0][i].ustensils.length; a++) {
                                if (showRecipe[0][i].ustensils[a].toLowerCase().includes(sortingValues[h].toLowerCase())) {
                                    pathToken++;
                                    a =showRecipe[0][i].ingredients.length
                                }
                            }
                        } else {
                            if (showRecipe[0][i][sortingPathArray[s]].toLowerCase().includes(sortingValues[h].toLowerCase())) {
                                pathToken++;
                               
                            }
                        }
                    }
                }
            }
            if (pathToken < sortingValues.length) {// si le ticket est plus petit que le nombre de valeur
                
                showRecipe[0].splice(i, 1)//on retire l'element
                i -= 1////////////////////// se recaler dans la liste !!!!!!
                Article()//re-affichage des élemnets
            }
        }
    }
}