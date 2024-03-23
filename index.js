import { menuArray } from "./data.js"


const menuItems = document.getElementById('menu-container')
const orderDisplay = document.getElementById('order-container')

const orderArray = []

document.addEventListener('click', function(e){
    if(e.target.id==='add-item-btn-container' || e.target.id==='add-item-btn') {
         

        
        addItemToOrder(e)
        renderOrder()
    }
})

function addItemToOrder(e){
    for (let item of menuArray) {
        if (e.target.dataset.food === item.name ){
           orderArray.push({name: item.name, price: item.price})
        }
    }
    console.log(orderArray)

}

function renderOrder(){
    const orderHtml = orderArray.map(function(item) {
        
        return `
            

            <div class='order-inner-container'>
                <h3 class='item-name'> ${item.name} </h3>
                <span class='remove-btn'> remove </span>
                <p class='item-price-order'> $${item.price} </p>
            </div>

           
    
        `
       
        }).join('')



        orderDisplay.innerHTML = 
        `
        <h2 class='your-order'> Your Order </h2>
        ${orderHtml}
        <div class='total-price-container'>
            <h3> Total price </h3>
            <p class='item-price-order'> $${totalPrice(orderArray)} </p>
        </div>
        <button id='complete-order-btn'> Complete order </button>
        `

        function totalPrice(arr){
            return arr.reduce(function(total, current) {
                return total + current.price
            }, 0)
            } 
             
            
            
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

                    <div id='add-item-btn-container' data-food='${item.name}'>
                       <p id='add-item-btn' data-food='${item.name}'> + </p>
                    </div>



               </div>
        
        
        `


    }).join('')
    menuItems.innerHTML = menuHtml
}
renderMenu()
