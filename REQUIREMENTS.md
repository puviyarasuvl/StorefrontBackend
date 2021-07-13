# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Create - [POST] /api/products - Admin access token required. productName, price, category must be passed via body. Only admin can add new products to DB

-   Index - [GET] /api/products - Returns all available products in DB

-   Show - [GET] /api/products/:id - Returns product details based on given id

-   Delete - [DELETE] /api/products - Admin access token required. productId must be passed via body. Only admin can delete a product from DB

-   Products by category - [GET] /api/products/:category. Returns products based on given category

#### Users

-   Create New user - [POST] /api/users - userId, firstName, lastName, password, userRole must be passed via body. userRole not need to be specified for creating customer accout. Default will be customer accout. To create an admin account userRole value needs to be specified as 'admin'. Return auth token after creating the new accout

-   Index - [GET] /api/users - Admin access token required. Only admin can view all available users

-   Show - [GET] /api/users/:user_id - Admin access token required. Only admin can query account details based on user id

-   Login - [POST] /api/users/login - userId, password must be passed via body. Returns auth token on successful authentication

#### Orders

-   Create - [POST] /api/orders - Access token required. Creates a new order for user. User details will be taken from auth token. User cannot have two open orders (carts)

-   Index - [GET] /api/orders - Admin access token required. Only admin can view all the available orders

-   Show - [GET] /api/orders/orderId - Access token required. Returns the order details for given order id

-   Update status - [PATCH] - /api/orders - Access token required. orderId, status must be passed via body. Allows user to complete the order

-   Add product - [POST] - /api/orders/addProduct - Access token required. orderId, productId, quantity must be passed via body. Allows user to add products in the open order (cart)

-   Current Order by user - [GET] /api/dashboard/cart - Access token required. Returns the current open order details and products in the order (basically items in the cart). User details will be taken from auth token

-   Completed Orders by user - [GET] /api/dashboard/orders - Access token required. Returns the completed orders for a user. User details will be taken from auth token

## Data Shapes

#### Product

-   id
-   name
-   price
-   [OPTIONAL] category

#### User

-   id
-   firstName
-   lastName
-   password

#### Orders

-   id
-   id of each product in the order
-   quantity of each product in the order
-   user_id
-   status of order (active or complete)

## Database Schema

#### Product

    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT4 NOT NULL,
    category VARCHAR(100)

#### User

    id VARCHAR(100) PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100),
    password VARCHAR(200),
    role VARCHAR(10)

#### Order

    Orders table

    id SERIAL PRIMARY KEY,
    userId VARCHAR(100) REFERENCES users(id),
    status VARCHAR(10),
    createdDate VARCHAR(50) NOT NULL

    Order Products table

    id SERIAL PRIMARY KEY,
    orderId INTEGER REFERENCES orders(id),
    productId INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1
