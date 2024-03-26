import { menuArray } from "./data.js"

import { v4 as uuidv4 } from 'https://jspm.dev/uuid'


const menuItems = document.getElementById('menu-container')
const orderDisplay = document.getElementById('order-container')
const orderArray = []
const paymentModal = document.getElementById('modal-container')
const overlay = document.getElementById('overlay')
const paymentForm=document.getElementById('payment-form')
const payBtn=document.getElementById('pay-btn')



document.addEventListener('click', function (e) {
    if (e.target.id === 'add-item-btn-container' || e.target.id === 'add-item-btn') {


        addItemToOrder(e)
        renderOrder(orderArray)
    }
    
        const removeBtnArray = document.querySelectorAll('.remove-btn')
        removeItemFromOrder(removeBtnArray)
        
    
    if (e.target.id === 'complete-order-btn') {
        renderPaymentForm()
    }
    
    
})

function addItemToOrder(e) {
    for (let item of menuArray) {
        if (e.target.dataset.food === item.name) {
            orderArray.push({ name: item.name, price: item.price, uuid: uuidv4() })
        }
    }


}


function renderOrder(arr) {
    if (arr.length >0) {
        const orderHtml = arr.map(function (item) {


            return `
                
    
                <div class='order-inner-container'>
                    <h3 class='item-name'> ${item.name} </h3>
                    <span class='remove-btn' id='${item.uuid}'> remove </span>
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
                <p class='item-price-order'> $${getTotalPrice(arr)} </p>
            </div>
            <button id='complete-order-btn'> Complete order </button>
            `
    
       
    
    } else {
        orderDisplay.innerHTML =  ''
    }
    
    
}

function getTotalPrice(arr) {
    return arr.reduce(function (total, current) {
        return total + current.price
    }, 0)
}

function removeItemFromOrder(arr) {
    arr.forEach(function (item, index) {
        item.addEventListener('click', function () {
             orderArray.splice(index, 1)
             renderOrder(orderArray)
        })
    
    })
    
}

function renderPaymentForm() {
    paymentModal.style.display='flex'
    overlay.style.display='flex'
}

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    const payFormData = new FormData(paymentForm)
    const userName = payFormData.get('name')
    paymentModal.style.display='none'
    overlay.style.display='none'
    orderDisplay.innerHTML = `
        <div class='thank-you-container'>
            <h3> Thanks, ${userName}! Your order is on its way! </h3>
        </div>
    `
    
})

function renderMenu() {
    const menuHtml = menuArray.map(function (item) {
        return `
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
