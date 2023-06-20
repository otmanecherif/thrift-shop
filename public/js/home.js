

/* making header sticky */
const header = document.querySelector("header");
    window.addEventListener("scroll",function(){
        header.classList.toggle ("sticky", this.window.scrollY > 0);
        
})
    


/* event listeners to redirect to product details page  */



const productPhotos = document.querySelectorAll('.product-photo');
const product_thn = document.querySelectorAll('.img-thumbnail');

document.addEventListener('DOMContentLoaded', function() {
  
    productPhotos.forEach(function(photo) {
      photo.addEventListener('click', function() {
        let productId = photo.dataset.productId;
  
       
              window.location.href = '/sproduct?productId='+productId;
  });
});
});  


      


// Select all "add to cart" buttons
let addToCartButtons = document.querySelectorAll('.add-cart');
// Loop through each button
addToCartButtons.forEach(button => {
    // Add click event listener to each button
    button.addEventListener('click', function() {
        // Get product id from data attribute
        let productId = this.dataset.productId;

        fetch('/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});



