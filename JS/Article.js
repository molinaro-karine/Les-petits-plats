export const recettes = [] // les recettes à affichées

/*affichage de la recette */
export const Article = () => {
    const main = document.querySelector('main')
    main.replaceChildren()
    recettes[0].forEach((recipe) => {// pour chaque recette 
        const newArcticle = document.createElement('article')
        
        const newHtml = `
    <img class ="recipe-img" src ="" alt = "">
    <div class = "recipe d-flex flex-column ">
        <div class = "recipe-head mb-3 d-flex justify-content-between align-items-center">
        <h3>${recipe.nom}</h3>
            <div class = d-flex align-items-center>
                <i class="far fa-clock mr-1 d-flex align-items-center"></i>
                <h2>${recipe.temps} min</h2>
            </div>
        </div >
    </div>
    `
        newArcticle.innerHTML = newHtml
        main.appendChild(newArcticle)// ajout de la nouvelle recette au main
    })
  

}
