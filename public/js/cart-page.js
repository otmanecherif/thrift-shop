/* making header sticky */
const header = document.querySelector("header");
    window.addEventListener("scroll",function(){
        header.classList.toggle ("sticky", this.window.scrollY > 0);
        
})
    
const productPhotos = document.querySelectorAll('.img-thumbnail');
document.addEventListener('DOMContentLoaded', function() {
  
    productPhotos.forEach(function(photo) {
      photo.addEventListener('click', function() {
        let productId = photo.dataset.productId;
  
       
              window.location.href = '/sproduct?productId='+productId;
  });
});
}); 

document.addEventListener('DOMContentLoaded', function() {
    /* remove article from cart list */
    const removeButtons = document.querySelectorAll('.rmv-btn');
    function removeRow(rowElement) {
        rowElement.remove();
    }

    removeButtons.forEach((button, index) => {
        button.addEventListener('click', function(event) {
            const rowElement = event.target.closest('tr');
            const rowIndex = index; // Get the index of the button clicked

            fetch('/remove-from-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rowIndex }), // Pass the rowIndex to the server
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                location.reload(); // Refresh the page
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            removeRow(rowElement);
        });
    });
});
