export let showRecipe = [] // les recettes à affichées

/*affichage de la recette */
export const Article = () => {
    const main = document.querySelector('.section-cards')
    main.replaceChildren()
    showRecipe[0].forEach((recipe) => {// pour chaque recette 
        const newArcticle = document.createElement('article')
        newArcticle.classList.add("col", "section-cards", "mt-0", "mb-5")
        
        recipe.ingredients.map(e => {// pour que les unités correspondant à la maquette
            if (e.unit === "grammes") e.unit = "g"
            else if (e.unit === "cuillères à soupe") e.unit = "cuillères"
        })
        const newHtml = `
    <div class="card h-100  bg-opacity-10 border-0">
      <img class ="recipe-img" src ="./public/img/genericImg.svg" alt = "">
      <div class="recipe card-body">
        <div class="recipe-head d-flex justify-content-between mb-3">
          <div class="card-title">${recipe.name}</div>
            <div class="card-text text-small">
              <i class="far fa-clock"></i><strong> ${recipe.time} min</strong>
            </div>
          </div>
          <div class="d-flex flex-row">
          <div class="col-6 ingredients">
            <ul class="card-text text-small mb-0">${recipe.ingredients.map(e => {
              return `<li class = " ingredients ${e}" title="${e}" ><h4>${e.ingredient}</h4><span> ${e.quantity ? ' :' : ''} ${e.quantity ? e.quantity : ' '} ${e.unit ? e.unit : ' '} </span> </li>`
              }).join("")}
            </ul>
          </div>
          <p class="col-6 card-text text-small">${recipe.description}</p>
        </div>
      </div>
    </div>`;
        newArcticle.innerHTML = newHtml
        main.appendChild(newArcticle)// ajout de la nouvelle recette au main
    })
    if (showRecipe[0].length === 0) {//si aucune recette, un message est affiché
        const newArcticle = document.createElement('article')
        const newHtml = `<p class ="no-result">Aucune recette ne correspond à votre critère de recherche.</p>`
        newArcticle.innerHTML = newHtml
        main.appendChild(newArcticle)// ajout de la nouvelle recette au main
    }

}