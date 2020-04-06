// add an if statement to check if the document is still loading
// ensures that document is loaded
if (document.readyState == 'loading') {
    // event activates when the page is done loading
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
// connect/activate our buttons when the dom content load is ready
function ready() {
var removeCartItemButtons = document.getElementsByClassName('remove-btn')

// our event listeners

for(var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    // listen for click remove to remove item
    button.addEventListener('click', removeCartItem) 
    }

    // supposed to manage the the item quantity in cart
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
   
    for(var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        // listen for input value change 
        input.addEventListener('change', quantityChanged) 

    //supposed to add items to the cart
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
  
    for(var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        // listen event for input value change 
        button.addEventListener('click', addToCartClicked) 
         }
    }

    document.getElementsByClassName('purchase-button')[0].addEventListener('click', purchaseClicked)
}
// our functions

// the purchase button
function purchaseClicked(event) {
    // window.confirm("Have you created an account with us?");
    if (confirm("Have you created an account with us?")) {
        window.alert('Thank you for your purhase!');
      } else {
        window.location.replace('http://alindabyamukama.github.io/Capstone-Project-No.5/UI/templates/account.html');
      }
    // alert('Thank you for your purchase!)
    var cartItems = document.getElementsByClassName('cart-items')[0]
    // continues to execute while what is inside () is true
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

// quantity input changes in cart
function quantityChanged(event) {
// debugging 
    // window.alert('change my input quantity in cart!')

    var input = event.target
    // check if input value is not a number and is not less than or equal to zero
    if(isNaN(input.value) ||  input.value <= 0){
        // set the lowest input value
        input.value = 1
    }    
    updateCartTotal()
}

// remove items from cart
function removeCartItem(event) { 
    // window.alert('remove me from cart!')

    var buttonClicked = event.target
    // the button is inside two parent elements
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

// add items to cart
function addToCartClicked(event) {
    // window.alert('add me to cart!')

    var button = event.target
    var shopItem = button.parentElement.parentElement
    // get the text inside the element
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    // get the source of the image / the url of the image
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    // console.log(title, price, image)
    // htis is the add item cart METHOD
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
// add items to cart
function addItemToCart(title, price, imageSrc) {
    // window.alert('add a row to end')
    // create a row for our cart items / new div
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    // add a row to cart items
    var cartItems = document.getElementsByClassName('cart-items')[0]

    // this is code to check if an items has already been added to cart
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Hey, this item is in your cart!')
            // exit function and stop executing code below it, bringing you back to start if add item function
            return 
        }
        
    }

    // add cart row to the very end of the cart items / use copied html (cart-row contents) to generate a cart row / using back ticks (``) so we can use our string on different lines
    var  cartRowContents = `
        <div class="cart-item cart-column">
        
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
                <input onchange="quantityChanged(event)" class="cart-quantity-input" type="number" value="1">
            <button onclick="removeCartItem(event)" class="btn remove-btn" type="button">REMOVE</button>
        </div>`
    // dollar sign and then curly braces toput varibales directly into our code 
    // anything insde of it will be a variable that will evaluate
    // we use innerhtml because we are using html tags inside here
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow) 
    // can remove added items
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItem)
    // total will update with each added item
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}


// update cart total function
function updateCartTotal() {
    // select first element in array as our cart item container
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    // only gets element inside of the object with the specified class
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    
    for (var i =0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        // get row price
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        // get row quantity
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        // get the price from price element, change string to number value with decimals, remove UGX from our string
        var price = parseFloat(priceElement.innerText.replace('UGX', ''))
        // get quantity from our quantity element
        var quantity = quantityElement.value
        // calculating total price, will do each iteration
        total = total + (price * quantity)
    }
    // we want total to round to two decimal places
    total = Math.round(total * 100) / 100
    // get cart-total-price element, set inner text of element to total
    document.getElementsByClassName('cart-total-price')[0].innerText = 'UGX' + total 
}
