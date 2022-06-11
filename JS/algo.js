import { showRecipe, Article } from "./Article.js"

/*Algorythme de recherche te verifications identiques avec des boucles forEach*/
export const slowAlgorytm = (recipeArray, sortingPathArray, sortingValues) => {
    sortingPathArray.forEach(s => {
        sortingValues.forEach(h => { // TODO : Comprendre cette ligne
            if (h.length > 0) {
                recipeArray.forEach(i => {
                    if (s === "ingredients") {
                        i.ingredients.forEach(a => {
                            if (a.ingredient.toLowerCase().includes(h.toLowerCase())) {
                                let bufferToken = false
                                showRecipe[0].forEach(recipe => {
                                    if (recipe === i) bufferToken = true
                                })
                                if (!bufferToken) {
                                    showRecipe[0].push(i)
                                    let sortingPath = [s]
                                    slowCheck(sortingPath, sortingValues,i)
                                    Article()
                                }
                            }
                        })
                    } else if (s === "ustensils") {
                        i.ustensils.forEach(a => {
                            if (a.toLowerCase().includes(h.toLowerCase())) {
                                let bufferToken = false
                                showRecipe[0].forEach(recipe => {
                                    if (recipe === i) bufferToken = true
                                })
                                if (!bufferToken) {
                                    showRecipe[0].push(i)
                                    let sortingPath = [s]
                                    slowCheck(sortingPath, sortingValues,i)
                                    Article()
                                }
                            }
                        })
                    } else {
                        if (i[s].toLowerCase().includes(h.toLowerCase())) {
                            let bufferToken = false
                            showRecipe[0].forEach(recipe => {
                                if (recipe === i) bufferToken = true
                            })
                            if (!bufferToken) {
                                showRecipe[0].push(i)
                                let sortingPath = [s]
                                slowCheck(sortingPath, sortingValues,i)
                                Article()
                            }
                        }
                    }
                })
            }
        })
    })
}

export const slowCheck = (sortingPathArray, sortingValues,recipeTarget) => {
    for (let i = 0; i < showRecipe[0].length; i++) {
        if (recipeTarget === undefined || recipeTarget === showRecipe[0][i]) {
             let pathToken = 0 // for multiple path => mainSearch
            sortingValues.forEach(h => {
                if (h.length > 0) {
                    let bufferPathToken = pathToken//ticket de protection contre l'ajout de repetitions
                    sortingPathArray.forEach(s => {
                        if (s === "ingredients") {
                            showRecipe[0][i].ingredients.forEach(a => {
                                if (a.ingredient.toLowerCase().includes(h.toLowerCase())) {
                                    pathToken = bufferPathToken + 1//protection contre l'ajout de repetitions 
                                     
                                }
                            })
                        } else if (s === "ustensils") {
                            showRecipe[0][i].ustensils.forEach(a => {
                                if (a.toLowerCase().includes(h.toLowerCase())) {
                                    pathToken = bufferPathToken + 1
                                    
                                }
                            })
                        } else {
                            if (showRecipe[0][i][s].toLowerCase().includes(h.toLowerCase())) {
                                pathToken++;
                            }
                        }
                    })
                }
            })
            if (pathToken < sortingValues.length) {// si le ticket est plus petit que le nombre de valeur
                showRecipe[0].splice(i, 1)//on retire l'élément
                i -= 1// se recaler dans la liste 
                Article()//ré-affichage des élements
            }
        }
    }
}
