"use strict"

const { Pool } = require('pg');
const pool = new Pool({
  user: 'tix',
  host: '127.0.0.1',
  database: 'projet_web',
  password: 'tix.31',
  port: 5432,
});


async function getProducts(limit = null) {
  const client = await pool.connect();

  try {
    let query = 'SELECT * FROM product';
    if (limit) {
      query += ' LIMIT ' + limit;
    }

    const result = await client.query(query);
    console.log("result rows ",(Array.isArray(result.rows)));
    return result.rows;
  } finally {
    client.release();
  }
}

async function ajouter( Name, ID, Catégorie, Type, Likes, URL, Matériel, Marque, Etat, Prix, res) {

  return new Promise((resolve, reject) => {
    const query = {
      name: 'check-credentials',
      text: 'INSERT INTO product (product_id, price, main_img, name, likes, category, type, material, brand, condition, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      values: [ID, Prix, URL, Name, Likes, Catégorie, Type, Matériel, Marque, Etat, 'Sale'],
    };

    pool.query(query, (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données', err);
        reject(err); // Rejeter la promesse en cas d'erreur
      } else {
        console.log('Données du formulaire insérées avec succès');
        resolve(true); // Résoudre la promesse avec une valeur indiquant le succès de l'opération
      }
    });
  });
}


async function modifier(ID, S, M, L, XL, res) {

  return new Promise((resolve, reject) => {
    const query = {
      name: 'check-credentials',
      text: 'UPDATE product SET quantity_S=$2, quantity_M=$3, quantity_L=$4, quantity_XL=$5, WHERE product_id=$1',
      values: [ID, S, M, L, XL],
    };

    pool.query(query, (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données', err);
        reject(err); // Rejeter la promesse en cas d'erreur
      } else {
        console.log('Données du formulaire insérées avec succès');
        resolve(true); // Résoudre la promesse avec une valeur indiquant le succès de l'opération
      }
    });
  });
}


async function checkout(command_id, Nom, Prenom, Email, Address, Pays, Total) {

  return new Promise((resolve, reject) => {
    const query = {
      name: 'check-credentials',
      text: 'INSERT INTO command_checkout (id_cmd, surname, name, email, adress, country, total) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [command_id, Prenom, Nom, Email, Address, Pays, Total],
    };

    pool.query(query, (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données', err);
        reject(err); // Rejeter la promesse en cas d'erreur
      } else {
        console.log('Commande enregistré avec succès');
        resolve(true); // Résoudre la promesse avec une valeur indiquant le succès de l'opération
      }
    });
  });
}


  
async function checklogin(username, password) {

  try {
    const query = {
      name: 'check-credentials',
      text: 'SELECT * FROM gerant WHERE username=$1 AND password=$2',
      values: [username, password],
    };
    const res = await pool.query(query);
    return res.rows.length > 0;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function addToCart(productId, cart,res) {
  // Query the database for the product details
  try{
    let selectedSize = 'M';
    const query = {
      text: 'SELECT product_id, name, main_img, price FROM product WHERE product_id = $1',
      values: [productId]
    };
    const result = await pool.query(query);
    const product = result.rows[0];
    if (product) {
      // Add the product to the cart
      cart.push({
        productId: product.product_id,
        name: product.name,
        main_img: product.main_img,
        price: product.price,
        size: selectedSize,
        quantity: 1
      });

      // Send a response back to the client
      res.send({ message: 'Product added to cart successfully' });
      console.log(cart);
    } else {
      console.log("No product found with given id");
    }
  }catch (err) {
    console.error(err);
    res.send({ message: 'ERROR' });
    
  }
}

async function removeFromCart(index, cart, res) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    res.send({ message: 'Product removed from cart successfully' });
  } else {
    res.send({ message: 'Invalid index' });
  }
}



async function getProductDetails(productId){
  try{  
    const query = {
      text : 'SELECT * FROM product NATURAL JOIN stock where product_id = $1 ;',
      values:[productId]
    }
    const result = await pool.query(query);
    const product = result.rows[0];
    if(product){ return product;}
    else {
      console.log("No product found with given id");
    }

  }
  catch(err){
    console.error(err);
    res.send({ message: 'ERROR' });

  }
}

// Function to calculate the cart total
function calculateCartTotal(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const itemTotal = cart[i].price * cart[i].quantity;
    total += itemTotal;
  }
  return total.toFixed(2);
}



module.exports = {ajouter,checkout,modifier,calculateCartTotal,  getProductDetails, addToCart, checklogin ,getProducts, removeFromCart, pool};
