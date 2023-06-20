// Récupérer le formulaire d'ajout de produit
const addProductForm = document.getElementById('add-product-form');

// Ajouter un écouteur d'événement pour soumettre le formulaire
addProductForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les valeurs des champs du formulaire
    const productName = addProductForm.elements['name'].value;
    const productPrice = addProductForm.elements['price'].value;

    // Effectuer des vérifications et validation des données si nécessaire

    // Ajouter le nouvel article à la liste des articles
    const productItem = document.createElement('li');
    productItem.textContent = `${productName} - ${productPrice}€`;

    const productList = document.getElementById('product-list');
    productList.appendChild(productItem);

    // Réinitialiser le formulaire après l'ajout de l'article
    addProductForm.reset();
});
