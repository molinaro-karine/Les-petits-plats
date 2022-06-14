//  classe pour une recette
class Recipe {
    constructor (name, time, description){
        this.name = name;
        this.time = time;
        this.description = description;
        this.ingredients = [];
        this.appliances = [];
        this.utensils = [];
    }
    addIngredient(ingredient){
        this.ingredients.push(ingredient)
    }
    addAppliance(appliance){
        this.appliances.push(appliance)
    }
    addUtensil(utensil){
        this.utensils.push(utensil)
    }
   // Méthode pour créer des fiches de recettes html
    createRecipeCard(){
        const recipeCard = document.createElement('a');
        recipeCard.setAttribute('href', '#');
        
        const article = document.createElement('article');
        article.classList.add('card');
        
        const cardImage = document.createElement('div');
        cardImage.classList.add('card-image');
        
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info');
        
        const h2 = document.createElement('h2');
        h2.classList.add('card-title');
        h2.textContent=this.name;
        
        const icon = document.createElement('img');
        icon.classList.add('time-icon');
        icon.setAttribute('src', "./public/img/time.svg");
        icon.setAttribute('alt', "");
        
        const cardTime = document.createElement('p');
        cardTime.classList.add('card-time','card-text');
        cardTime.textContent=`${this.time} min`;
        
        const  cardDescription= document.createElement('div');
        cardDescription.classList.add('card-description');
        
        const cardIngredients = document.createElement('ul');
        cardIngredients.classList.add('card-ingredients','card-text');
        // créer une liste d'ingrédients et l'ajouter à l'ul
        this.ingredients.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('card-ingredients-item');
            const span = document.createElement('span');
            span.classList.add('bold');
            span.textContent=item.name + ': ';
            li.appendChild(span);
            // si la quantité existe, affichez-la
            if (item.quantity) {
                const unit = item.unit == 'grammes'? 'g': item.unit.toLowerCase() == 'litres'? 'L': item.unit // const avec condition: si = grammes, remplacé par 'g' etc.. sinon garder l'unité telle quelle
                const quantity = document.createTextNode(item.quantity + unit); // ici unit est la const et non pas item.unit
                li.appendChild(quantity);
            } 
            cardIngredients.appendChild(li);
        })
  
        const cardInstructions = document.createElement('p');
        cardInstructions.classList.add('card-instructions','card-text');
        cardInstructions.textContent=`${this.description.substr(0, 181)} ...`;
  
        cardDescription.appendChild(cardIngredients);
        cardDescription.appendChild(cardInstructions);
  
        cardInfo.appendChild(h2);
        cardInfo.appendChild(icon);
        cardInfo.appendChild(cardTime);
        
        cardBody.appendChild(cardInfo);
        cardBody.appendChild(cardDescription);
  
        article.appendChild(cardImage);
        article.appendChild(cardBody);
        recipeCard.appendChild(article);
        return recipeCard
    }
  } 
  class Ingredient {
      constructor (name, quantity, unit = "") {
          this.name = name;
          this.quantity = quantity;
          this.unit = unit;
      }
  }
  class Utensil {
      constructor (name) {
          this.name = name;
      }
  }
  
  class Appliance {
      constructor (name){
          this.name = name;
      }
  } 
  