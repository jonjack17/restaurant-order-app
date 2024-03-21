import { menuArray } from "./data.js"


const menuItems = document.getElementById('menu-container')
const orderDisplay = document.getElementById('order-container')

const orderArray = []

document.addEventListener('click', function(e){
    if(e.target.id==='add-item-btn-container' || e.target.id==='add-item-btn') {
        
        
        addItemToOrder()
        renderOrder()
    }
})

function renderOrder(){

}




function renderMenu(){
    const menuHtml = menuArray.map(function (item) {
     return   `
               <div class='food-item-container'>
                    <div class='food-emoji-container'>
                        <p class='food-emoji'> ${item.emoji} </p>
                    </div>

                    <div class='food-desc-price-container'>
                        <h3 class='item-name'> ${item.name} </h3>
                        <h4 class='item-ingredients'> ${item.ingredients.join(' // ')} </h4>
                        <p class='item-price'> $${item.price} </p>

                    </div>

                    <div id='add-item-btn-container'>
                       <p id='add-item-btn'> + </p>
                    </div>



               </div>
        
        
        `


    }).join('')
    menuItems.innerHTML = menuHtml
}
renderMenu()
