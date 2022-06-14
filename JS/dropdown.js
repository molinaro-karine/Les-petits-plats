// classe qui contrôle l'ouverture et la fermeture des boutons des filtres
class ControlFilters {
    constructor(){
       this.buttonIngredients = document.querySelector(".button-ingredients");
       this.buttonAppliances = document.querySelector(".button-appliances");
       this.buttonUtensils = document.querySelector(".button-utensils");
       this.containerIngredients = document.querySelector(".container-ingredients");
       this.containerAppliances = document.querySelector(".container-appliances");
       this.containerUtensils = document.querySelector(".container-utensils");
       this.dropdown =  this.dropdown.bind(this);
       this.closeDropdown = this.closeDropdown.bind(this);
       this.addButtonEventListener();
       window.addEventListener('click', this.closeDropdown);
    }
    addButtonEventListener() {
        this.buttonIngredients.addEventListener('click', this.dropdown);
        this.buttonAppliances.addEventListener('click', this.dropdown);
        this.buttonUtensils.addEventListener('click', this.dropdown);
    }
    dropdown(e){
       
    // identifie le bouton à dérouler
    // e.target.closest est important ici pour sélectionner l'élément du bouton et l'image et le nom
        e.stopPropagation();
        this.closeDropdown(e);// fermer les autres listes déroulantes
        if(e.target.closest('button').classList.contains('button-ingredients')){
            this.buttonIngredients.classList.add('hide');
            this.containerIngredients.classList.remove('hide');
        } else if(e.target.closest('button').classList.contains('button-appliances')){
            this.buttonAppliances.classList.add('hide');
            this.containerAppliances.classList.remove('hide');
        } else if(e.target.closest('button').classList.contains('button-utensils')){
            this.buttonUtensils.classList.add('hide');
            this.containerUtensils.classList.remove('hide');
        }  
    }
    closeDropdown(e){
        if (!e.target.classList.contains('input-button')) {
            this.buttonIngredients.classList.remove('hide');
            this.buttonUtensils.classList.remove('hide');
            this.buttonAppliances.classList.remove('hide');
            this.containerIngredients.classList.add('hide');
            this.containerUtensils.classList.add('hide');
            this.containerAppliances.classList.add('hide');
        }
    }
}
const controlFilters = new ControlFilters()