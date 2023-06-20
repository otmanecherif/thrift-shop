"use strict"
let cart = [];
let cartTotal = 0;

var express = require('express');
let alert = require('alert');

const { calculateCartTotal, removeFromCart, getProductDetails, addToCart, checklogin, getProducts, ajouter, modifier, checkout, pool } = require('./model');


var app = express();
app.use(express.static('public'));
app.set('view engine','ejs');

// parse form arguments in POST requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


const cookieSession = require('cookie-session');
const { Console } = require('console');
app.use(cookieSession({
secret: 'mot-de-passe-du-cookie',
}));

/**** Routes pour voir les pages du site ****/

function is_authenticated (req, res, next){
  if(req.session.id != undefined){
    next();
  }else{
    res.status(401).send('Authentification Required! You need to log in first.');
  }
}

app.get('/', async (req, res) => {
  const client = await pool.connect();

  try {
      const products = await getProducts(4);
      res.render('home.ejs', { products });
  } catch (err) {
      res.status(500).send('An error occurred while fetching products');
  } finally {
      client.release();
  }
});


app.get('/sproduct', async (req, res) => {
  try {
    console.log("product id : ",req.query.productId);
    const productId = parseInt(req.query.productId); 
    //console.log(productId);
    let productDetails = await getProductDetails(productId);
    //console.log("product detail:",productDetails);
    let suggestions = await getProducts(4);
    res.render('sproduct.ejs', {product:productDetails, products: suggestions });
  } catch (err) {
    
    res.status(500).send('An error occurred while fetching product details');
  }
});



app.get('/cart-page', async (req, res) => {
  console.log("cart-page ",cart);
  console.log("item 0", cart[0]);

  cartTotal = calculateCartTotal(cart);
  // Render the cart page with the cart data
  res.render('cart-page.ejs', { cart: cart , cartTotal: cartTotal});
});

app.get('/home', async (req, res) => {
  const client = await pool.connect();

  try {

      const products = await getProducts(4);
      res.render('home.ejs', { products });

  } catch (err) {

      res.status(500).send('An error occurred while fetching products');

  } finally {

      client.release();
  }
});



app.get('/shop-page', async (req, res) => {

  const page = parseInt(req.query.page) || 1;


  // Define the page size (number of items per page)
  const pageSize = 12;


  let allProducts = await getProducts();
  //console.log(allProducts);
  // Calculate the start and end indices for the requested page
  let startIndex = (page - 1) * pageSize;
  let endIndex = startIndex + pageSize;

  if (Array.isArray(allProducts)) {
    
    const products = allProducts.slice(startIndex, endIndex);
  
    // Send the paginated data
    res.render('shop-page.ejs',{
      products : products,
      currentPage: page,
      totalPages: Math.ceil(allProducts.length / pageSize),
    });

  } else {
    // allProducts is not an array
    res.status(500).json({ error: 'Invalid data format' });
  }

});



app.get('/gerant', (req, res) => {
  res.render('login.ejs');
});

app.get('/add',is_authenticated, (req, res) => {
  res.render('add.ejs');
});

app.get('/edit',is_authenticated, (req, res) => {
  res.render('edit.ejs');
});

app.get('/commands', (req, res) => {
  // Retrieve commands from the database
  pool.query('SELECT * FROM command_checkout', (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des commandes depuis la base de données', err);
      res.status(500).send('Erreur lors de la récupération des commandes');
    } else {
      // Render the commands view and pass the retrieved commands to it
      res.render('commands', { commands: result.rows });
    }
  });
});

//les posts 


app.post('/login', async (req, res) => {

  const { username, password } = req.body;

  const isAuthenticated = await checklogin(username, password);

  if (isAuthenticated) {
    req.session.id = 1;
    req.session.name = req.body.username;
    res.render('admin.ejs');
  } else {
    alert("Mot de Passe incorrect");
    res.render('gerant.ejs');
  }

});

app.post('/add', is_authenticated, async (req, res) => {

  const { Name, ID, Catégorie, Type,  URL, Matériel, S, M, L, XL, Marque, Etat, Prix} = req.body;
  var Likes = 0;
  try {
    const added = await ajouter(Name, ID, Catégorie, Type, Likes, URL, Matériel, S, M, L, XL, Marque, Etat, Prix);
    if (added) {
      console.log("Article ajouté avec succès");
      alert("Article ajouté avec succès");
      res.render('admin.ejs');
    } else {
      console.log("Erreur");
      alert("Erreur");
      res.render('add.ejs');
    }
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'article :", err);
    alert("Erreur");
    res.render('add.ejs');
  }
});


app.post('/check-out', async (req, res) => {

  const { Nom, Prenom, Email, Address, Pays} = req.body;
  var Total = 0;
  var command_id = 0;
  try {
    const added = await checkout(command_id, Nom, Prenom, Email, Address, Pays, Total);
    if (added) {
      console.log("Article ajouté avec succès");
      alert("Article ajouté avec succès");
      res.render('admin.ejs');
    } else {
      console.log("Erreur");
      alert("Erreur");
      res.render('add.ejs');
    }
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'article :", err);
    alert("Erreur");
    res.render('add.ejs');
  }
});


app.post('/edit', is_authenticated, async (req, res) => {


  try {
    const added = await modifier(ID, S, M, L, XL, res);
    if (added) {
      console.log("Stock ajouté avec succès");
      alert("Stock ajouté avec succès");
      res.render('admin.ejs');
    } else {
      console.log("Erreur");
      alert("Erreur");
      res.render('add.ejs');
    }
  } catch (err) {
    console.error("Erreur lors de l'ajout de stock :", err);
    alert("Erreur");
    res.render('add.ejs');
  }
});


app.post('/add-to-cart', async function(req, res) {

  
  const productId = req.body.productId;
  console.log(productId);
  await addToCart(productId, cart ,res);
  //console.log(cart);
  
});

app.post('/remove-from-cart', async (req, res) => {

  let index = req.body.rowIndex;
  await removeFromCart(index, cart ,res);
  //console.log("cart after remove", cart);
  res.sendStatus(200);
  
});

app.post('/login', async (req, res) => {

  const { username, password } = req.body;

  const isAuthenticated = await checklogin(username, password);

  if (isAuthenticated) {
    req.session.id = 1;
    req.session.name = req.body.username;
    res.redirect('/yes');
  } else {
    res.sendFile(__dirname + '/login.html');
  }

});



app.listen(3000, () => console.log('listening on http://localhost:3000'));

