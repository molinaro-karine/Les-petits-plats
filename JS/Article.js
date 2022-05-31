export let showRecipe = [] // les recettes à affichées

/*affichage de la recette */
export const Article = () => {
    const main = document.querySelector('main')
    main.replaceChildren()
    showRecipe[0].forEach((recipe) => {// pour chaque recette 
        const newArcticle = document.createElement('article')
        
        recipe.ingredients.map(e => {// pour que les unités correspondant à la maquette
            if (e.unit === "grammes") e.unit = "g"
            else if (e.unit === "cuillères à soupe") e.unit = "cuillères"
        })
        const newHtml = `
    <img class ="recipe-img" src ="" alt = "">
    <div class = "recipe d-flex flex-column ">
        <div class = "recipe-head mb-3 d-flex justify-content-between align-items-center">
        <h3>${recipe.name}</h3>
            <div class = d-flex align-items-center>
                <i class="far fa-clock mr-1 d-flex align-items-center"></i>
                <h2>${recipe.time} min</h2>
            </div>
        </div >
        <div class = "d-flex justify-content-between align-items-start">
        <ul>${recipe.ingredients.map(e => {
            return `<li class = " ingredients ${e}" title="${e}" ><h4>${e.ingredient}</h4><span> ${e.quantity ? ' :' : ''} ${e.quantity ? e.quantity : ' '} ${e.unit ? e.unit : ' '} </span> </li>`
        }).join("")}
        </ul>
        <p>${recipe.description}</p>
    </div>
</div>
    `
        newArcticle.innerHTML = newHtml
        main.appendChild(newArcticle)// ajout de la nouvelle recette au main
    })
    if (showRecipe[0].length === 0) {//si aucune recette, un message est affiché
        const newArcticle = document.createElement('article')
        const newHtml = `<p class ="no-result">Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</p>`
        newArcticle.innerHTML = newHtml
        main.appendChild(newArcticle)// ajout de la nouvelle recette au main
    }

}