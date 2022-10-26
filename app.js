

function openSlideMenu(){
    document.getElementById('side-menu').style.width = '250px'
}

function closeSlideMenu(){
    document.getElementById('side-menu').style.width = '0'
}
let carts =document.querySelectorAll('.add-to-cart')


        // CARTITEMS FUNCTIONS
  let products = [
      {
          name: 'NIKE PHANTOM VNM',
          tag:  './phantom-gt-1-min.jpg',
          price: 120,
          inCart: 0
      },
        {
          name: 'PUMA NEW COLLECTION',
          tag: './pumaboot.jpg',
          price: 90,
          inCart: 0
      },
        {
          name: 'NEW BALANCE DEFIANCE LEATHER',
          tag: './balance.jpg',
          price: 140,
          inCart: 0
      },
        {
          name: 'ADIDAS ACE 17+',
          tag: './ace17.jpg',
          price: 200,
          inCart: 0
      },
      {
           name: 'FOOTBALL WATER BOTTLE CARRIER',
          tag: 'FOOTBALL WATER BOTTLE CARRIER',
          price: 10,
          inCart: 0
      },
            {
           name: 'ADIDAS PREDATOR EDGE',
          tag: 'ADIDAS PREDATOR EDGE',
          price: 250,
          inCart: 0
      },

  ]
    //LOOPING THROUGH THE PRODUCT

  for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', ()=>{
       cartNumbers(products[i])  
       totalcost(products[i])
    })
  }

  function onLoadCartNumbers(){
      let productNumbers = localStorage.getItem('cartNumbers')
      if(productNumbers) {
          document.querySelector('.cart-content span').textContent = productNumbers
      }
  }


  function cartNumbers(product) {
    
      let productNumbers = localStorage.getItem('cartNumbers')
    
      productNumbers = parseInt(productNumbers)
    
      if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1 )
        document.querySelector('.cart-content span').textContent = productNumbers + 1
      }else {
          localStorage.setItem('cartNumbers', 1)
          document.querySelector('.cart-content span').textContent = 1
      }
      setItems(product);
  }


   function setItems(product) {
   let cartItems = localStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems)
   

    if(cartItems != null){

        if( cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product 
            }
        }


        cartItems[product.tag].inCart += 1  
    }else {
         product.inCart = 1;

       cartItems = {
           [product.tag]: product
       }
        
    }

       localStorage.setItem('productsInCart', JSON.stringify(cartItems))
   }


   function totalcost(product) {
   
    let cartCost = localStorage.getItem('totalCost');

 
    console.log(typeof cartCost)

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost + product.price);
    }else {
        localStorage.setItem('totalCost', product.price);
    }

    
   }

   function displayCart() {
       let cartItems = localStorage.getItem('productsInCart');
       cartItems = JSON.parse(cartItems)
       
       let productContainer = document.querySelector('.products')
       let cartCost = localStorage.getItem('totalCost');

         
       if(cartItems && productContainer) {
           productContainer.innerHTML = '';
           Object.values(cartItems).map(item => {
               productContainer.innerHTML += `
                <div class="product">
                  <ion-icon name="close-circle"></ion-icon>
                   <img src="${item.tag}">
                   <span>${item.name}</span>
                   </div>
                   <div class="price">${item.price}</div>
                   <div class="quantity">
                    <ion-icon class= "increase" name="chevron-back-circle"></ion-icon>
                     <span>${item.inCart}</span>
                      <ion-icon class="decrease" name="chevron-forward-circle"></ion-icon>
                     <div class="total">
                      $${item.inCart * item.price}.00
                     </div>
                    
                  `
           })

           productContainer.innerHTML += `
            <div class= "basketTotalContainer">
                <h4 class="baskettotalTitle>"
                Basket Total
                </h4>
                <h4 class="basketTotal">
                 $${cartCost}.00 
                 </h4>
           `
       }
   }

   onLoadCartNumbers();
   displayCart();
 