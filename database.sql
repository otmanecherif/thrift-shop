

CREATE TABLE IF NOT EXISTS "gerant" (id SERIAL PRIMARY KEY, username VARCHAR(100), password VARCHAR(100));
INSERT INTO gerant (username, password) VALUES ('tix', 'tix31');

CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    total_quantity INTEGER,
    price FLOAT,
    main_img CHAR[100],
    thumbnail1 CHAR[100] DEFAULT NULL,
    thumbnail2 CHAR[100] DEFAULT NULL,
    thumbnail3 CHAR[100] DEFAULT NULL,
    name CHAR[50],
    likes INTEGER DEFAULT 0,thumbnail1 CHAR[100] DEFAULT NULL,
    size CHAR[10],
    category CHAR[10],
    type CHAR[10],
    material CHAR[10],
    Brand CHAR[50],
    condition CHAR[10],
    Status CHAR[10]

  )
 

ALTER TABLE product ADD CONSTRAINT check_category CHECK (category IN ('woman', 'man', 'mix'));
ALTER TABLE product ADD CONSTRAINT check_status CHECK (status IN ('sale', 'out of stock'));

CREATE TABLE IF NOT EXISTS stock(
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    quantity_S INTEGER default 0,
    quantity_M INTEGER default 0,
    quantity_L INTEGER default 0,
    quantity_XL INTEGER default 0,
    FOREIGN KEY(product_id) REFERENCES product(product_id) 
);

CREATE TABLE IF NOT EXISTS cart(
    id_item SERIAL PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1, 
    FOREIGN KEY (product_id) REFERENCES product(product_id)
  );

  CREATE TABLE IF NOT EXISTS combos(
    combo_id SERIAL PRIMARY KEY,
    category CHAR[20],
    item1 INTEGER,
    item2 INTEGER,
    item3 INTEGER,
    FOREIGN KEY (item1) REFERENCES product(product_id),
    FOREIGN KEY (item2) REFERENCES product(product_id),
    FOREIGN KEY (item3) REFERENCES product(product_id)

  );

CREATE TABLE IF NOT EXISTS command_checkout(
    id_cmd SERIAL PRIMARY KEY,
    surname CHAR[20],
    name CHAR[20],
    email CHAR[30],
    adress CHAR[50],
    country CHAR[20],
    total INTEGER not null
);

INSERT INTO stock (product_id,quantity_S,quantity_M,quantity_L,quantity_XL) 
VALUES
(
    1112223,
    0,
    2,
    10,
    0
),
(   
    223445,
    3,
    10,
    0,
    0,

),
(
    236378,
    10,
    0,
    0,
    0
);

INSERT INTO product (product_id, price, main_img, thumbnail1, thumbnail2, thumbnail3, name, likes, category, type, material, brand, condition, status)
VALUES
(
    1112223,
    25.99,
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-1-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-2-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-3-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-4-E00923480_900x.jpg?v=1679865281',
    'fleural maxi dress',
    100,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),
(
    223445,
    29.99,
    'https://www.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-light-blue-floral-dress-1-E00924211.jpg?v=1681074345',
    'https://www.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-light-blue-floral-dress-2-E00924211.jpg?v=1681074345',    
    'https://www.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-light-blue-floral-dress-3-E00924211.jpg?v=1681074345',    
    'https://www.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-light-blue-floral-dress-4-E00924211.jpg?v=1681074345',   
    'light blue floral dress',
    120,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),
(
    236378,
    31.99,
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-1-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-2-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-3-E00922268_900x.jpg?v=1681592555',
    NULL,
    'Floral Print Light Pink & Green Pleated Maxi Dress',
    50,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
);
INSERT INTO product (product_id, price, main_img, thumbnail1, thumbnail2, thumbnail3, name, likes, category, type, material, Brand, condition, status)
VALUES
(
    1176223,
    25.99,
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-1-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-2-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-3-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-4-E00923480_900x.jpg?v=1679865281',
    'fleural maxi dress',
    100,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),

(
    111923,
    25.99,
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-1-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-2-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-3-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-4-E00923480_900x.jpg?v=1679865281',
    'fleural maxi dress',
    100,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),

(
    223,
    25.99,
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-1-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-2-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-3-E00923480_900x.jpg?v=1679865281',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-maxi-dress-4-E00923480_900x.jpg?v=1679865281',
    'fleural maxi dress',
    100,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),

(
    998689,
    31.99,
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-1-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-2-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-3-E00922268_900x.jpg?v=1681592555',
    NULL,
    'Floral Print Light Pink & Green Pleated Maxi Dress',
    50,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),

(
    4567,
    31.99,
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-1-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-2-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-3-E00922268_900x.jpg?v=1681592555',
    NULL,
    'Floral Print Light Pink & Green Pleated Maxi Dress',
    50,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),
(
    998,
    31.99,
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-1-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-2-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-3-E00922268_900x.jpg?v=1681592555',
    NULL,
    'Floral Print Light Pink & Green Pleated Maxi Dress',
    50,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),
(
    5667,
    31.99,
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-1-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-2-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-3-E00922268_900x.jpg?v=1681592555',
    NULL,
    'Floral Print Light Pink & Green Pleated Maxi Dress',
    50,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),
(
    9988,
    31.99,
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-1-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-2-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-3-E00922268_900x.jpg?v=1681592555',
    NULL,
    'Floral Print Light Pink & Green Pleated Maxi Dress',
    50,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),
(
    665,
    31.99,
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-1-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-2-E00922268_900x.jpg?v=1681592555',
    'https://shop.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-1970s-floral-print-light-pink-green-pleated-maxi-dress-3-E00922268_900x.jpg?v=1681592555',
    NULL,
    'Floral Print Light Pink & Green Pleated Maxi Dress',
    50,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
);

INSERT INTO product (product_id, price, main_img,  name, likes, category, type, material, brand, condition, status)
VALUES
(
    12223,
    25.99,
    'https://www.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-lurex-thread-pattern-evening-dress-1-E00924502_900x.jpg?v=1682630079',
    'fleural maxi dress',
    100,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),
(
    2234,
    29.99,
    'https://www.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-abstract-pattern-dress-1-E00936994_900x.jpg?v=1682888698',
   'light blue floral dress',
    120,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
),
(
    2378,
    31.99,
    'https://www.beyondretro.com/cdn/shop/products/beyond-retro-label-womens-floral-print-dress-1-E00924116.jpg?v=1682974945',
    'Floral Print Light Pink & Green Pleated Maxi Dress',
    50,
    'woman',
    'dress',
    'polyester',
    'No brand',
    'great',
    'Sale'
);